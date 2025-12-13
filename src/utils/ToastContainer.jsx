import { ToastContainer as Container } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastContainer() {
  return <Container position="top-center" autoClose={1500} theme="colored" />;
}
