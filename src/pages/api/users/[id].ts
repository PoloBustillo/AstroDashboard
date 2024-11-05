import type { APIRoute } from "astro";
import { getStore } from "@netlify/blobs";
import fs from "node:fs";
function base64ToArrayBuffer(data: string) {
  var binaryLen = data.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    var ascii = data.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}
export const GET: APIRoute = async ({ params, request }) => {
  const construction = await getStore({
    name: "my-store",
    siteID: "a909c73d-1dce-4ce5-9aa4-b08b5ad02a2c",
    token: "nfp_mjDFQ4Sorg33ddU5VNcDJ6nwiFKG9hMN8d4c",
  });
  try {
    const data = fs.readFileSync(
      "C:/Users/leopo/OneDrive/Escritorio/astroDashboard/src/pages/api/users/821004807292.pdf",
      "utf8",
    );
    var arrBuffer = base64ToArrayBuffer(data);
    const blob = new Blob([data], {
      type: "application/pdf",
    });
    console.log(blob);
    await construction.set("pdf3", blob);
    await construction.delete("pdf");
    await construction.delete("pdf2");
    return new Response("PDF loaded");
  } catch (error) {
    console.log(error);

    return new Response("PDF failed");
  }

  // data:application/pdf;base64,btoa(unescape(encodeURIComponent(evt.target.result)))

  // method1Workind(evt);
  // method2(evt);
};
