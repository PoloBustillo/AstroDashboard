import { put } from "@vercel/blob";
import type { APIRoute } from "astro";
import fs from "node:fs";

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const data = fs.readFileSync("src/pages/api/users/test.jpg");

    const blob = await put("folder/file.jpg", data, {
      access: "public",
      token: import.meta.env.BLOB_READ_WRITE_TOKEN,
    });
    return new Response("PDF loaded" + JSON.stringify(blob));
  } catch (error) {
    console.log(error);
    return new Response("PDF failed");
  }
};
