import { CacheProvider } from "@emotion/react";
import React from "react";
import { hydrate } from "react-dom";
import App from "./App";
import createEmotionCache from "./createEmotionCache";

const cache = createEmotionCache();

hydrate(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
