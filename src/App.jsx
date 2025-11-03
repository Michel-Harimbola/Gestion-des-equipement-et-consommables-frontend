import AppRoutes from './routes/AppRoutes';
import GlobalLoader from "./components/shared/GlobalLoader";
import ToastContainer from "./utils/ToastContainer";

export default function App() {
  return (
    <>
      <GlobalLoader />
      <ToastContainer />
      <AppRoutes />
    </>
  );
}
