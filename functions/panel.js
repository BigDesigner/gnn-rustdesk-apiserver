export async function onRequest(context) {
  const env = context.env || {};
  const target = env.CONSOLE_URL || env.console_url;
  if (target) {
    return Response.redirect(target.trim(), 302);
  }
  return Response.redirect("/console", 302);
}
