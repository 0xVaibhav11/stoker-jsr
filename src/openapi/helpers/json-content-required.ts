import type { ZodSchema } from "./types.ts";

import jsonContent from "./json-content.ts";

/**
 * Creates a JSON content response with a required schema.
 *
 * This function extends the jsonContent function by adding a 'required' field
 * set to true, indicating that the schema is required in the OpenAPI specification.
 *
 * @param {T} schema - The Zod schema representing the structure of the JSON content
 * @param {string} description - A description of the JSON content
 * @returns {ReturnType<typeof jsonContent> & { required: true }} - An object representing the JSON content with the required field set to true
 */
const jsonContentRequired = <T extends ZodSchema>(
  schema: T,
  description: string
): ReturnType<typeof jsonContent> & { required: true } => {
  return {
    ...jsonContent(schema, description),
    required: true,
  };
};

export default jsonContentRequired;
