import type { Context } from "@netlify/functions";

export default async (request: Request, _context: Context) => {
  const allowedOrigin = process.env.URL;
  const origin = request.headers.get("Origin");

  if (!allowedOrigin || origin !== allowedOrigin) {
    return new Response("Forbidden", { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing required 'url' query parameter", {
      status: 400,
    });
  }

  try {
    new URL(targetUrl);
  } catch {
    return new Response("Invalid URL", { status: 400 });
  }

  const response = await fetch(targetUrl, {
    headers: {
      "User-Agent": request.headers.get("User-Agent") || "",
      Accept: request.headers.get("Accept") || "*/*",
    },
  });

  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", allowedOrigin);
  headers.set("Access-Control-Allow-Methods", "GET");
  headers.set("Access-Control-Allow-Headers", "*");

  return new Response(response.body, {
    status: response.status,
    headers,
  });
};

export const config = {
  method: "GET",
};
