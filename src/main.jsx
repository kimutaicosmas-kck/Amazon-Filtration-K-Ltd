import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

function getBasename() {
  if (typeof window === "undefined") return undefined;
  const b = window.__AMAZON_API_BASE__;
  return typeof b === "string" && b.length > 0 ? b : undefined;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
