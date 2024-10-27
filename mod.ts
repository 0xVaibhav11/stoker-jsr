/**
 * Main module exports
 *
 * This module re-exports various components of the application for easy access.
 * It provides a centralized point for importing middleware functions and OpenAPI utilities.
 *
 * @module @vbhv11/stoker
 */

/**
 * Export all middleware functions
 *
 * This includes:
 * - notFound: Middleware for handling 404 Not Found errors
 * - onError: Middleware for handling general errors
 * - serveEmojiFavicon: Middleware for serving an emoji favicon
 *
 * @see {@link ./src/middlewares/mod.ts}
 */
export * as middlewares from "./src/middlewares/mod.ts";

/**
 * Export all OpenAPI-related utilities and schemas
 *
 * This includes helpers for creating OpenAPI specifications, such as:
 * - Schema definitions for common API parameters and objects
 * - Utility functions for working with JSON content
 * - Helper functions like `oneOf` for creating schemas with multiple possible types
 *
 * @see {@link ./src/openapi/mod.ts}
 */
export * as openapi from "./src/openapi/mod.ts";
