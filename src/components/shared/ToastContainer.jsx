import React from "react";
import { ToastContainer as Container } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastContainer() {
  return <Container position="top-right" autoClose={3000} theme="colored" />;
}
