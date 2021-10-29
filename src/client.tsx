import { CacheProvider } from "@emotion/react";
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import createEmotionCache from "./createEmotionCache";

const cache = createEmotionCache();

hydrate(
  <CacheProvider value={cache}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CacheProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
