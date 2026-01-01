import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageview } from "./analytics";

export default function RouteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/dashboard")) return;
    pageview(location.pathname + location.search);
  }, [location]);

  return null;
}
