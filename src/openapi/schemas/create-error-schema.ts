import { z } from "@hono/zod-openapi";

import type { ZodSchema } from "../helpers/types.ts";

/**
 * Creates a Zod schema for error responses.
 * This schema is used to validate and structure error responses in the API.
 *
 * @template T - Extends ZodSchema
 * @param {T} schema - The input schema to create an error schema for
 * @returns {z.ZodObject} A Zod object schema representing the error structure
 */
const createErrorSchema = <T extends ZodSchema>(
  schema: T
): z.ZodObject<{
  success: z.ZodBoolean;
  error: z.ZodObject<{
    issues: z.ZodArray<
      z.ZodObject<{
        code: z.ZodString;
        path: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        message: z.ZodOptional<z.ZodString>;
      }>
    >;
    name: z.ZodString;
  }>;
}> => {
  // Generate a sample error by attempting to parse an empty object or array
  const { error } = schema.safeParse(
    schema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray ? [] : {}
  );

  return z.object({
    // Indicates whether the operation was successful (always false for errors)
    success: z.boolean().openapi({
      example: false,
    }),
    // Detailed error information
    error: z
      .object({
        // Array of issues encountered during validation
        issues: z.array(
          z.object({
            code: z.string(), // Error code
            path: z.array(z.union([z.string(), z.number()])), // Path to the error in the input
            message: z.string().optional(), // Optional error message
          })
        ),
        name: z.string(), // Name of the error
      })
      .openapi({
        example: error, // Provide a sample error based on the input schema
      }),
  });
};

export default createErrorSchema;
