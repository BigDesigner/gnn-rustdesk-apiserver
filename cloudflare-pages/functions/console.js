export async function onRequest(context) {
  const env = context.env || {};
  const target = env.CONSOLE_URL || env.console_url;
  if (target) {
    return Response.redirect(target.trim(), 302);
  }
  const keys = Object.keys(env).join(", ");
  return new Response(`CONSOLE_URL ortam degiskeni bulunamadi. Cloudflare Pages uzerinde algilanan degiskenler: [${keys}]. Lutfen Settings > Environment variables bolumunde Production alanina kaydedildiginden ve yeni bir Deploy yapildigindan emin olun.`, {
    status: 500,
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
