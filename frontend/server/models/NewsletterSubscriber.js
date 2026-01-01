const mongoose = require("mongoose");

const NewsletterSubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("NewsletterSubscriber", NewsletterSubscriberSchema);
