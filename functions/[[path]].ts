import type { ServerBuild } from '@remix-run/cloudflare';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

export const onRequest: PagesFunction = async (context) => {
  // Use dynamic import with computed string to avoid TypeScript static analysis
  const buildPath = '../build/server';
  let serverBuild: ServerBuild;
  
  try {
    serverBuild = (await import(/* @vite-ignore */ buildPath)) as unknown as ServerBuild;
  } catch (error) {
    // Fallback handling when build files are not available
    console.warn('Server build not found, this is expected during development:', error);
    return new Response('Server build not available', { status: 503 });
  }

  const handler = createPagesFunctionHandler({
    build: serverBuild,
  });

  return handler(context);
};
