import type { ZodSchema } from "./types.ts";

import oneOf from "./one-of.ts";

/**
 * Represents the structure of a JSON content response
 * with a oneOf schema for multiple possible schemas.
 */
interface JsonContentResponse {
  content: {
    "application/json": {
      schema: {
        oneOf: ReturnType<typeof oneOf>;
      };
    };
  };
  description: string;
}

/**
 * Creates a JSON content response with a oneOf schema.
 *
 * @param schemas - An array of Zod schemas representing possible response structures.
 * @param description - A description of the response.
 * @returns A JsonContentResponse object with the oneOf schema and description.
 */
const jsonContentOneOf = <T extends ZodSchema>(
  schemas: T[],
  description: string
): JsonContentResponse => {
  return {
    content: {
      "application/json": {
        schema: {
          oneOf: oneOf(schemas),
        },
      },
    },
    description,
  };
};

export default jsonContentOneOf;
