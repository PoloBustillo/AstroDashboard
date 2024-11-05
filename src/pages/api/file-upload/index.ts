import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params, request }) => {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  console.log(file);

  return new Response("OK", {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
