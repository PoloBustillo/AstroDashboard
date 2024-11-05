import type { APIRoute } from "astro";
import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export const GET: APIRoute = async ({ params, request }) => {
  const construction = await getStore({
    name: "my-store",
    siteID: "a909c73d-1dce-4ce5-9aa4-b08b5ad02a2c",
    token: "nfp_mjDFQ4Sorg33ddU5VNcDJ6nwiFKG9hMN8d4c",
  });
  await construction.set("nails", "For general carpentry");

  return new Response("Nail blobs set for Construction and Beauty stores");
};
