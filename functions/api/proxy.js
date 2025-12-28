/**
 * Cloudflare Pages Function to proxy API requests securely.
 * To use this:
 * 1. Add your API_KEY as an environment variable in Cloudflare Pages dashboard.
 * 2. Frontend request: fetch('/api/proxy?endpoint=https://api.openai.com/v1/...')
 * 
 * Note: specific allowed domains should be configured to prevent abuse.
 */

export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const targetEndpoint = url.searchParams.get('endpoint');

    if (!targetEndpoint) {
        return new Response('Missing endpoint parameter', { status: 400 });
    }

    // Security: Whitelist allowed domains to prevent open proxy abuse
    const ALLOWED_DOMAINS = ['api.openai.com', 'api.anthropic.com', 'generativelanguage.googleapis.com'];
    const targetUrl = new URL(targetEndpoint);

    if (!ALLOWED_DOMAINS.includes(targetUrl.hostname)) {
        return new Response('Domain not allowed', { status: 403 });
    }

    // Determine which key to use based on domain or param
    let apiKey = '';
    if (targetUrl.hostname.includes('openai')) apiKey = env.OPENAI_API_KEY;
    else if (targetUrl.hostname.includes('anthropic')) apiKey = env.ANTHROPIC_API_KEY;
    else if (targetUrl.hostname.includes('googleapis')) apiKey = env.GEMINI_API_KEY;

    // Clone the original request but override headers
    const newRequest = new Request(targetEndpoint, {
        method: request.method,
        headers: new Headers(request.headers),
        body: request.body
    });

    // Inject API Key
    if (apiKey) {
        newRequest.headers.set('Authorization', `Bearer ${apiKey}`);
        // For Google Gemini, it might use query param ?key=... handling that:
        if (targetUrl.hostname.includes('googleapis')) {
            // Gemini often uses ?key= in URL, so we might need to reconstruct URL
            const newUrlWithKey = new URL(targetEndpoint);
            newUrlWithKey.searchParams.set('key', apiKey);
            return fetch(newUrlWithKey.toString(), {
                method: request.method,
                headers: request.headers,
                body: request.body
            });
        }
    }

    const response = await fetch(newRequest);

    return response;
}
