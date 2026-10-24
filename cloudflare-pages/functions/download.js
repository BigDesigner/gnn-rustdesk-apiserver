export async function onRequest(context) {
  const env = context.env || {};
  const target = env.DOWNLOAD_URL || env.download_url;
  if (target) {
    return Response.redirect(target.trim(), 302);
  }
  const keys = Object.keys(env).join(", ");
  return new Response(`DOWNLOAD_URL ortam degiskeni bulunamadi. Cloudflare Pages uzerinde yuklu degisken anahtarlari: [${keys}]. Lutfen Settings > Environment variables bolumunde Production alanina eklendiginden emin olun.`, {
    status: 500,
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
