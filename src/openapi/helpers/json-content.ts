import type { ZodSchema } from "./types.ts";

/**
 * Represents the structure of a JSON content response
 * in the OpenAPI specification.
 */
type JsonContentReturn = {
  content: {
    "application/json": {
      schema: ZodSchema;
    };
  };
  description: string;
};

/**
 * Creates a JSON content response object for OpenAPI specification.
 *
 * @param {T} schema - The Zod schema representing the structure of the JSON content
 * @param {string} description - A description of the JSON content
 * @returns {JsonContentReturn} An object representing the JSON content response
 */
const jsonContent = <T extends ZodSchema>(
  schema: T,
  description: string
): JsonContentReturn => {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  };
};

export default jsonContent;
