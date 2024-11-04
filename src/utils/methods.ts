export const res = (
  body: string,
  {
    status,
    statusText,
    headers,
  }: { status?: number; statusText?: string; headers?: Headers },
) => new Response(body, { status, statusText, headers });
