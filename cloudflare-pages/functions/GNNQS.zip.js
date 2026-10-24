export async function onRequest(context) {
  const target = context.env.DOWNLOAD_URL;
  if (target) {
    return Response.redirect(target, 302);
  }
  return new Response("DOWNLOAD_URL ortam degiskeni bulunamadi.", { status: 500 });
}
