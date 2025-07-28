export async function onRequest({ request }) {
  const host = request.headers.get('host') || "";

  // Enforce correct subdomain
  if (!host.startsWith('d.modlynx.xyz')) {
    return new Response(
      `Access denied: Rajasthan sitemap does not belong to ${host}`,
      { status: 403 }
    );
  }

  // Fetch the original sitemap
  const res = await fetch(request);
  let xml = await res.text();

  // Replace all modlynx.xyz → d.modlynx.xyz
  xml = xml.replace(/https:\/\/modlynx\.xyz\//g, 'https://d.modlynx.xyz/');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
