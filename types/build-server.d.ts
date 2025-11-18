// Type declaration for dynamic build/server import
declare module '../build/server' {
  import type { ServerBuild } from '@remix-run/cloudflare';
  const serverBuild: ServerBuild;
  export default serverBuild;
}
