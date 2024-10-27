/**
 * This module exports helper functions for working with OpenAPI specifications.
 * These functions assist in creating JSON content responses and handling multiple schemas.
 *
 * @module openapi/helpers
 */

/**
 * Creates a standard JSON content response object for OpenAPI specification.
 */
export { default as jsonContent } from "./json-content.ts";

/**
 * Creates a JSON content response with a oneOf schema for multiple possible schemas.
 */
export { default as jsonContentOneOf } from "./json-content-one-of.ts";

/**
 * Creates a JSON content response with a required schema.
 */
export { default as jsonContentRequired } from "./json-content-required.ts";

/**
 * Generates an array of OpenAPI schema objects from an array of Zod schemas.
 * Useful for creating a 'oneOf' schema in OpenAPI specifications.
 */
export { default as oneOf } from "./one-of.ts";
