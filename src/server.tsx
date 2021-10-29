import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouterContext } from "react-router";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import createEmotionCache from "./createEmotionCache";

// eslint-disable-next-line @typescript-eslint/no-var-requires
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

export const renderApp = (
  req: express.Request,
  res: express.Response
): void => {
  const emotionCache = createEmotionCache();
  const emotionServer = createEmotionServer(emotionCache);

  const routerContext: StaticRouterContext = {};

  const rootHtml = renderToString(
    <CacheProvider value={emotionCache}>
      <StaticRouter context={routerContext} location={req.url}>
        <App />
      </StaticRouter>
    </CacheProvider>
  );

  if (routerContext.url) {
    res.redirect(routerContext.url);
    return;
  }

  const emotionChunks = emotionServer.extractCriticalToChunks(rootHtml);
  const styleTags = emotionServer.constructStyleTagsFromChunks(emotionChunks);

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
      ${styleTags}
  </head>
  <body>
      <div id="root">${rootHtml}</div>
      ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
  </body>
</html>`;

  res.send(html);
};

const server = express();

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", renderApp);

export default server;
