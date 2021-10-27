import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import createEmotionCache from "./createEmotionCache";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cssLinksFromAssets = (assets, entrypoint) => {
  return (
    assets[entrypoint]?.css
      ?.map((asset) => `<link rel="stylesheet" href="${asset}">`)
      .join("") ?? ""
  );
};

const jsScriptTagsFromAssets = (assets, entrypoint, extra = "") => {
  return (
    assets[entrypoint]?.js
      ?.map((asset) => `<script src="${asset}"${extra}></script>`)
      .join("") ?? ""
  );
};

export const renderApp = () => {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const markup = renderToString(
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  );

  const emotionChunks = extractCriticalToChunks(markup);
  const css = constructStyleTagsFromChunks(emotionChunks);

  const html =
    // prettier-ignore
    `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500">
      ${cssLinksFromAssets(assets, 'client')}
      ${css}
  </head>
  <body>
      <div id="root">${markup}</div>
      ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
  </body>
</html>`;

  return { html };
};

const server = express();

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", (_, res) => {
    const { html } = renderApp();
    res.send(html);
  });

export default server;
