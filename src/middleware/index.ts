import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  console.log(context.url.pathname);
  console.log("Request received");

  next();
});
