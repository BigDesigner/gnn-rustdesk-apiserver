export async function onRequest(context) {
  const url = context.env.DOWNLOAD_URL;
  if (!url) {
    return new Response(
      "DOWNLOAD_URL tanımlanmamış. Lütfen Cloudflare Pages > Settings > Environment variables alanından Production için DOWNLOAD_URL ekleyin.",
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }
  return Response.redirect(url.trim(), 302);
}
