export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return new Response("Missing url", { status: 400 });

    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();

    const get = (re: RegExp) => {
      const m = html.match(re);
      return m?.[1]?.trim();
    };

    // prefer og:* then twitter:* then <title>
    const title =
      get(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
      get(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']+)["']/i) ||
      get(/<title>([^<]+)<\/title>/i) ||
      "";

    const description =
      get(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
      get(/<meta\s+name=["']twitter:description["']\s+content=["']([^"']+)["']/i) ||
      "";

    const image =
      get(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
      get(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i) ||
      "";

    return Response.json({ title, description, image });
  } catch (e: any) {
    return new Response(e?.message ?? "error", { status: 500 });
  }
}
