import React from "react";
import { hydrate, render } from "react-dom";
import "./styles/reset.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./hooks/use-auth";
import { AppStore } from "./AppStore";

const root = document.getElementById("root") as any;

if (root.hasChildNodes()) {
  hydrate(
    <ProvideAuth>
      <BrowserRouter>
        <AppStore />
      </BrowserRouter>
    </ProvideAuth>,
    root
  );
} else {
  render(
    <ProvideAuth>
      <BrowserRouter>
        <AppStore />
      </BrowserRouter>
    </ProvideAuth>,
    root
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
