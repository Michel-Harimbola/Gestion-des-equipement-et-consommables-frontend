import React from 'react'
import AppRoutes from './routes/AppRoutes';
import GlobalLoader from "./components/shared/GlobalLoader";
import ToastContainer from "./components/shared/ToastContainer";

export default function App() {
  return (
    <>
      <GlobalLoader />
      <ToastContainer />
      <AppRoutes />
    </>
  );
}
