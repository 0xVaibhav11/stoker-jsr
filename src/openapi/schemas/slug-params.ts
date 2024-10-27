import { z } from "@hono/zod-openapi";

/**
 * Regular expression to validate slug format: alphanumeric, underscores, and dashes
 * This regex ensures that the slug contains only valid characters
 */
const slugReg = /^[\w-]+$/;

/**
 * Error message to be displayed when the slug format is invalid
 */
const SLUG_ERROR_MESSAGE =
  "Slug can only contain letters, numbers, dashes, and underscores";

/**
 * Zod schema for validating slug parameters
 * This schema is used to validate and parse slug inputs in API routes
 */
const SlugParamsSchema: z.ZodObject<{
  slug: z.ZodString;
}> = z.object({
  /**
   * The slug field
   * @description A string that represents a URL-friendly version of a string, typically used in URLs
   */
  slug: z
    .string()
    .regex(slugReg, SLUG_ERROR_MESSAGE)
    .openapi({
      param: {
        name: "slug",
        in: "path",
      },
      required: ["slug"],
      example: "my-cool-article",
    }),
});

/**
 * Export the SlugParamsSchema for use in other parts of the application
 * This can be imported and used for validating slug parameters in API routes
 */
export default SlugParamsSchema;
