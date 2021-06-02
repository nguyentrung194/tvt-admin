import React, { useState } from "react";
import { ToastProvider } from "react-toast-notifications";
import App from "./App";
import { useAuth } from "./hooks/use-auth";
import CartContextProvider from "./contexts/cart-context";
import { Loader } from "./layouts/loader";

export const AppStore = () => {
  const { state } = useAuth();

  if (state.initializing) {
    return <Loader />;
  }
  return (
    <ToastProvider autoDismissTimeout={3000} placement="bottom-left">
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ToastProvider>
  );
};
