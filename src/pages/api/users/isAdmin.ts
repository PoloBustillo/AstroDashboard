import type { APIRoute } from "astro";
import { db, eq, User } from "astro:db";

export const GET: APIRoute = async ({ params, request }) => {
  const queryData = new URL(request.url);
  const email = queryData.searchParams.get("email");

  if (email == null) {
    return new Response(
      JSON.stringify({
        error: "Email query param is not found",
      }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const users = await db.select().from(User).where(eq(User.email, email));
  if (users.length === 0) {
    return new Response(
      JSON.stringify({
        error: "User not found",
      }),
      {
        status: 404,
        statusText: "Not Found",
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  if (users[0].role !== "admin") {
    return new Response(
      JSON.stringify({
        error: "User is not admin",
      }),
      {
        status: 403,
        statusText: "Forbidden",
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  return new Response(
    JSON.stringify({
      ...users[0],
    }),
    {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" },
    },
  );
};
