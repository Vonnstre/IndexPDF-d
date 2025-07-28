export async function onRequest({ request }) {
  const host = request.headers.get('host') || "";

  if (!host.startsWith('d.modlynx.xyz')) {
    return new Response(
      `Access denied: Rajasthan sitemap does not belong to ${host}`,
      { status: 403 }
    );
  }

  const originUrl = new URL(request.url);
  originUrl.hostname = "modlynx.xyz";

  const res = await fetch(originUrl.toString());
  let xml = await res.text();

  xml = xml.replace(/https:\/\/modlynx\.xyz\//g, 'https://d.modlynx.xyz/');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
