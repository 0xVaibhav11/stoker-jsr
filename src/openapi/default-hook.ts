import type { Hook } from "@hono/zod-openapi";

import { UNPROCESSABLE_ENTITY } from "../http-status-codes.ts";

/**
 * Default hook for handling OpenAPI validation errors.
 * This hook is used to standardize the error response format when request validation fails.
 *
 * @param result - The result of the OpenAPI validation
 * @param c - The context object from Hono
 * @returns A JSON response with error details if validation fails, otherwise undefined
 */
// deno-lint-ignore no-explicit-any
const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    // If validation fails, return a JSON response with error details
    return c.json(
      {
        success: result.success, // Boolean indicating validation success (false in this case)
        error: result.error, // Error details from the validation result
      },
      UNPROCESSABLE_ENTITY // HTTP status code for unprocessable entity
    );
  }
  // If validation succeeds, the hook doesn't modify the response
};

export default defaultHook;
