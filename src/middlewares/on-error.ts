import type { ErrorHandler } from "@hono/hono";
import type { StatusCode } from "@hono/hono/utils/http-status";

import { INTERNAL_SERVER_ERROR, OK } from "../http-status-codes.ts";

/**
 * Custom error handler for the application.
 * This function processes errors and returns a JSON response with appropriate status code.
 *
 * @param err - The error object caught by the middleware
 * @param c - The context object from Hono
 * @returns A JSON response containing error details
 */
const onError: ErrorHandler = (err, c) => {
  // Determine the appropriate status code
  const currentStatus =
    "status" in err ? err.status : c.newResponse(null).status;
  const statusCode =
    currentStatus !== OK
      ? (currentStatus as StatusCode)
      : INTERNAL_SERVER_ERROR;

  // Construct and return the error response
  return c.json(
    {
      message: err.message,
      // Include stack trace only if not in production environment
      stack: Deno.env.get("DENO_DEPLOYMENT_ID") ? undefined : err.stack,
    },
    statusCode
  );
};

export default onError;
