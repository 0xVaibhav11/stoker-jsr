/**
 * This module exports various schemas and schema creation functions used in the OpenAPI specification.
 * These schemas are used for validating and describing different parts of the API, such as error responses,
 * message objects, and various parameter types.
 *
 * @module openapi/schemas
 */

// Schema for creating standardized error responses
export { default as createErrorSchema } from "./create-error-schema.ts";

// Schema for creating message objects with customizable example messages
export { default as createMessageObjectSchema } from "./create-message-object.ts";

// Schema for validating and describing numeric ID parameters in API routes
export { default as IdParamsSchema } from "./id-params.ts";

// Schema for validating and describing UUID parameters in API routes
export { default as IdUUIDParamsSchema } from "./id-uuid-params.ts";

// Schema for validating and describing slug parameters in API routes
export { default as SlugParamsSchema } from "./slug-params.ts";
