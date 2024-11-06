import { actions } from "astro:actions";
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
    if (context.url.pathname.includes("usuarios"))
      return context.redirect("/auth/sign-in?next=/protected/usuarios");
    if (context.url.pathname.includes("recursos"))
      return context.redirect("/auth/sign-in?next=/protected/recursos");
    return context.redirect("/auth/sign-in");
  }

  if (
    context.url.pathname.includes("protected/usuarios") &&
    session != null &&
    session.user
  ) {
    const { data, error } = await actions.isAdmin(session.user.email as string);

    console.log("RES", data);
    data?.isAdmin ? next() : context.redirect("/No-Autorizado");
  }
  return next();
});
