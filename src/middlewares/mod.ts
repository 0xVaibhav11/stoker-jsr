/**
 * Middleware exports
 *
 * This module exports various middleware functions used in the application.
 *
 * @module middlewares
 */

/** Middleware for handling 404 Not Found errors */
export { default as notFound } from "./not-found.ts";

/** Middleware for handling general errors */
export { default as onError } from "./on-error.ts";

/** Middleware for serving an emoji favicon */
export { default as serveEmojiFavicon } from "./serve-emoji-favicon.ts";
