import type { APIRoute } from "astro";

const usernames = ["Sarah", "Chris", "Yan", "Elian"];
export const GET: APIRoute = ({ params, request }) => {
  const id = params.email as string;

  console.log(request.url);

  return new Response(
    JSON.stringify({
      name: "ID",
    }),
  );
};
