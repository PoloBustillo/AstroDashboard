import { put } from "@vercel/blob";
import type { APIRoute } from "astro";
import fs from "node:fs";

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const data = fs.readFileSync(
      "C:/Users/leopo/OneDrive/Escritorio/astroDashboard/src/pages/api/users/test.pdf",
    );
    console.log(data);

    const blob = await put("folder/file.pdf", data, {
      access: "public",
      token: import.meta.env.BLOB_READ_WRITE_TOKEN,
    });
    return new Response("PDF loaded" + JSON.stringify(blob));
  } catch (error) {
    console.log(error);
    return new Response("PDF failed");
  }

  // data:application/pdf;base64,btoa(unescape(encodeURIComponent(evt.target.result)))

  // method1Workind(evt);
  // method2(evt);
};
