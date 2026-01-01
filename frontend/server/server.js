require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminUser = require("./models/AdminUser");

const NewsletterSubscriber = require("./models/NewsletterSubscriber");
const User = require("./models/User");
const isStrongPassword = (pw) => {
  // at least 8 chars, at least 1 upper, 1 lower, 1 number, 1 special
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pw);
};

const app = express();

app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Mongo connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

function requireAdmin(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (!process.env.ADMIN_API_KEY || key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}
function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

function requireAdminRole(req, res, next) {
  // Admin token uses payload: { sub, email, role }
  if (!req.user?.role || (req.user.role !== "admin" && req.user.role !== "owner")) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}

// email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE) === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// newsletter endpoint
app.post("/api/newsletter", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Valid email is required." });
    }

    // save to DB (dedupe)
    let doc;
    try {
      doc = await NewsletterSubscriber.create({ email });
    } catch (e) {
      // duplicate key -> already subscribed
      if (String(e?.code) === "11000") {
        return res.status(200).json({ message: "Already subscribed." });
      }
      throw e;
    }

    // notify you by email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: (process.env.ADMIN_NOTIFY_EMAILS || process.env.ADMIN_NOTIFY_EMAIL || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      subject: "New newsletter signup",
      text: `New newsletter signup: ${doc.email}\nDate: ${new Date(doc.createdAt).toISOString()}`,
    });

    return res.status(201).json({ message: "Subscribed!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// Create first admin user (run once, then you can delete/disable later)
app.post("/api/admin/setup", async (req, res) => {
  try {
    const { email, password, role } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password required." });

    const existing = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
    if (existing) return res.status(200).json({ message: "Admin already exists." });

    console.log("FOUND EXISTING?", !!existing, "EMAIL:", String(email).toLowerCase().trim());
    console.log("PASS LEN:", String(password || "").length);
    const passwordHash = await bcrypt.hash(String(password), 10);
    await AdminUser.create({
      email: String(email).toLowerCase().trim(),
      passwordHash,
      role: role === "owner" ? "owner" : "admin",
    });

    res.status(201).json({ message: "Admin created." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// Admin login
app.post("/api/admin/login", async (req, res) => {
  try {
    console.log("LOGIN ATTEMPT:", req.body);
    const { email, password } = req.body || {};
    const user = await AdminUser.findOne({ email: String(email || "").toLowerCase().trim() });

    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const ok = await bcrypt.compare(String(password || ""), user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials." });

    const token = signToken(user);
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

app.get("/api/admin/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// ADMIN: list subscribers (newest first)
app.get("/api/admin/subscribers", requireAuth, requireAdminRole, async (req, res) => {
  try {
    const list = await NewsletterSubscriber.find({})
      .sort({ createdAt: -1 })
      .select("email createdAt");
    res.json({ subscribers: list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// ADMIN: delete subscriber by id
app.delete("/api/admin/subscribers/:id", requireAuth, requireAdminRole, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await NewsletterSubscriber.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Subscriber not found." });

    return res.json({ message: "Subscriber deleted." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// PUBLIC: unsubscribe by email
app.post("/api/newsletter/unsubscribe", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Valid email is required." });
    }

    const result = await NewsletterSubscriber.deleteOne({ email });

    if (result.deletedCount === 0) {
      // don't leak too much info, but this is fine for your own testing
      return res.status(200).json({ message: "If you were subscribed, you are now removed." });
    }

    return res.status(200).json({ message: "You’ve been unsubscribed." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// PUBLIC: user registration
app.post("/api/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, subscribeNewsletter } = req.body;

    const cleanEmail = String(email || "").trim().toLowerCase();
    const fn = String(firstName || "").trim();
    const ln = String(lastName || "").trim();
    const pw = String(password || "");

    if (!fn || !ln) return res.status(400).json({ message: "First and last name are required." });
    if (!cleanEmail || !cleanEmail.includes("@"))
      return res.status(400).json({ message: "Valid email is required." });

    if (!isStrongPassword(pw)) {
      return res.status(400).json({
        message:
          "Password must be 8+ characters and include uppercase, lowercase, number, and special character.",
      });
    }

    const existing = await User.findOne({ email: cleanEmail });
    if (existing) return res.status(409).json({ message: "Email is already registered." });

    const passwordHash = await bcrypt.hash(pw, 10);

    const user = await User.create({
      firstName: fn,
      lastName: ln,
      email: cleanEmail,
      passwordHash,
    });

    // Optional newsletter opt-in (uses your existing NewsletterSubscriber model)
    if (subscribeNewsletter) {
      try {
        await NewsletterSubscriber.create({ email: cleanEmail });
      } catch (e) {
        // ignore duplicate errors etc.
      }
    }

    // Auto-login: create a USER token (separate from admin token)
    const token = jwt.sign(
      { userId: user._id, email: user.email, type: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Account created.",
      token,
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// PUBLIC: user login
app.post("/api/auth/login", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password." });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      { userId: user._id, email: user.email, type: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Logged in.",
      token,
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

const PasswordReset = require("./models/PasswordReset");

// send reset code
app.post("/api/auth/password/forgot", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Valid email is required." });
    }

    const user = await User.findOne({ email });

    // Always respond the same to prevent account discovery
    const safeResponse = () =>
      res.status(200).json({ message: "If the email exists, a code was sent." });

    if (!user) return safeResponse();

    const code = String(Math.floor(100000 + Math.random() * 900000)); // 6 digits
    const codeHash = await bcrypt.hash(code, 10);

    // Invalidate old unused codes for this email
    await PasswordReset.updateMany({ email, usedAt: null }, { $set: { usedAt: new Date() } });

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await PasswordReset.create({ email, codeHash, expiresAt });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your password reset code",
      text: `Your one-time password reset code is: ${code}\n\nIt expires in 10 minutes.`,
    });

    return safeResponse();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// reset password using code
app.post("/api/auth/password/reset", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const code = String(req.body?.code || "").trim();
    const newPassword = String(req.body?.newPassword || "");

    if (!email || !email.includes("@")) return res.status(400).json({ message: "Valid email is required." });
    if (!code || code.length !== 6) return res.status(400).json({ message: "Valid 6-digit code is required." });

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be 8+ characters and include uppercase, lowercase, number, and special character.",
      });
    }

    const reset = await PasswordReset.findOne({
      email,
      usedAt: null,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (!reset) return res.status(400).json({ message: "Invalid or expired code." });

    const ok = await bcrypt.compare(code, reset.codeHash);
    if (!ok) return res.status(400).json({ message: "Invalid or expired code." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid request." });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    reset.usedAt = new Date();
    await reset.save();

    return res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
