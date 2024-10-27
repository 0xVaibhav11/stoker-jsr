import { z } from "@hono/zod-openapi";

/**
 * Creates a Zod schema for a message object.
 * This schema is used to validate and structure message objects in the API.
 *
 * @param {string} exampleMessage - An optional example message to be used in the OpenAPI specification.
 * @returns {z.ZodObject} A Zod object schema representing the message structure.
 */
const createMessageObjectSchema = (
  exampleMessage: string = "Hello World"
): z.ZodObject<{
  message: z.ZodString;
}> => {
  return z
    .object({
      // Define the message field as a string
      message: z.string(),
    })
    .openapi({
      // Provide an example for the OpenAPI specification
      example: {
        message: exampleMessage,
      },
    });
};

export default createMessageObjectSchema;
