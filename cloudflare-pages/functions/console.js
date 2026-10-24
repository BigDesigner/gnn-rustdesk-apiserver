export async function onRequest(context) {
  const target = context.env.CONSOLE_URL;
  if (target) {
    return Response.redirect(target, 302);
  }
  return new Response("CONSOLE_URL ortam degiskeni bulunamadi.", { status: 500 });
}
