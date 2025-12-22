import React from "react";
import ReatDOM from "react-dom/client";
import App from "./App";
import AppProviders from "./providers/AppProviders";
import "./i18n/i18n";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReatDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <Toaster position="top-right" />
      <App />
    </AppProviders>
  </React.StrictMode>
);