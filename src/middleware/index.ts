import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";

export const onRequest = defineMiddleware(async (context, next) => {
  let session = await getSession(context.request);

  if (context.url.pathname.includes("sign-in") && session) {
    let redirectUrl = context.url.searchParams.get("next") || "/";
    return context.redirect(redirectUrl);
  }

  if (context.url.pathname.includes("sign-up") && session) {
    return context.redirect("/");
  }

  if (context.url.pathname.includes("protected") && session == null) {
    return context.redirect("/auth/sign-in?next=/protected/recursos");
  }
  return next();
});
