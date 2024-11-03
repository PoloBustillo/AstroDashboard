import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";

export const onRequest = defineMiddleware(async (context, next) => {
  let session = await getSession(context.request);
  console.log("MIDDLEWARE", session);
  if (context.url.pathname.includes("sign-in") && session) {
    return context.redirect("/");
  }

  return next();
});
