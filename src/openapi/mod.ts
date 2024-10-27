/**
 * OpenAPI Module
 *
 * This module serves as the main entry point for OpenAPI-related functionality.
 * It exports various components and utilities used for API documentation and validation.
 *
 * @module openapi
 */

/** Export the default hook for OpenAPI validation */
export * from "./default-hook.ts";

/** Export helper functions and utilities for OpenAPI operations */
export * from "./helpers/mod.ts";

/** Export schemas used for request/response validation and API documentation */
export * from "./schemas/mod.ts";
