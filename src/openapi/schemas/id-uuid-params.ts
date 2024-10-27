import { z } from "@hono/zod-openapi";

/**
 * Schema for validating and describing UUID parameters in API routes.
 * This schema ensures that 'id' parameters are properly formatted as UUIDs
 * and documented in OpenAPI specifications.
 */
const IdUUIDParamsSchema: z.ZodObject<{
  id: z.ZodString;
}> = z.object({
  // Define the 'id' field as a UUID string
  id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: "id", // Name of the parameter
        in: "path", // Specify that this parameter is in the path
      },
      required: ["id"], // Mark 'id' as a required parameter
      example: "4651e634-a530-4484-9b09-9616a28f35e3", // Provide an example UUID for documentation
    }),
});

// Export the schema for use in route definitions
export default IdUUIDParamsSchema;
