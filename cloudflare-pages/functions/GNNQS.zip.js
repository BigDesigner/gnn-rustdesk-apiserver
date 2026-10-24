export async function onRequest(context) {
  const env = context.env || {};
  const target = env.DOWNLOAD_URL || env.download_url;
  if (target) {
    return Response.redirect(target.trim(), 302);
  }
  return Response.redirect("/download", 302);
}
