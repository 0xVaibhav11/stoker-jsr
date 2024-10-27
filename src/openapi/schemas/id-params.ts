import { z } from "@hono/zod-openapi";

/**
 * Schema for validating and describing ID parameters in API routes.
 * This schema is used to ensure that 'id' parameters are properly formatted
 * and documented in OpenAPI specifications.
 */
const IdParamsSchema: z.ZodObject<{
  id: z.ZodNumber;
}> = z.object({
  // Define the 'id' field as a coerced number
  id: z.coerce.number().openapi({
    param: {
      name: "id", // Name of the parameter
      in: "path", // Specify that this parameter is in the path
    },
    required: ["id"], // Mark 'id' as a required parameter
    example: 42, // Provide an example value for documentation
  }),
});

// Export the schema for use in route definitions
export default IdParamsSchema;
