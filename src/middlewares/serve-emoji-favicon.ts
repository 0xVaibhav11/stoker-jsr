import type { MiddlewareHandler } from "@hono/hono";

/**
 * Creates a middleware handler that serves an emoji as a favicon.
 *
 * @param {string} emoji - The emoji to be used as the favicon.
 * @returns {MiddlewareHandler} A middleware handler function.
 */
const serveEmojiFavicon = (emoji: string): MiddlewareHandler => {
  // deno-lint-ignore require-await
  return async (c, next) => {
    // Check if the request is for the favicon
    if (c.req.path === "/favicon.ico") {
      // Set the content type to SVG
      c.header("Content-Type", "image/svg+xml");
      // Return an SVG containing the emoji as the favicon
      return c.body(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" x="-0.1em" font-size="90">${emoji}</text></svg>`
      );
    }
    // If not a favicon request, continue to the next middleware
    return next();
  };
};

export default serveEmojiFavicon;
