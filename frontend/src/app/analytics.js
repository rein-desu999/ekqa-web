export const GA_MEASUREMENT_ID = "G-X81R8X2WYJ"; // replace

export function pageview(path) {
  if (!window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
}
