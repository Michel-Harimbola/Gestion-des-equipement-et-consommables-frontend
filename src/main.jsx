import React from "react";
import ReatDOM from "react-dom/client";
import App from "./App";
import AppProviders from "./providers/AppProviders";
import "./index.css";

ReatDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);