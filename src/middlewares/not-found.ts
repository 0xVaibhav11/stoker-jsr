// Import the NotFoundHandler type from Hono
import type { NotFoundHandler } from "@hono/hono";

// Import HTTP status code and message for "Not Found"
import { NOT_FOUND } from "../http-status-codes.ts";
import { NOT_FOUND as NOT_FOUND_MESSAGE } from "../http-status-phrases.ts";

/**
 * Middleware function to handle "Not Found" errors.
 *
 * This function is triggered when no other route matches the requested path.
 * It returns a JSON response with a "Not Found" message and the requested path.
 */
const notFound: NotFoundHandler = (c) => {
  // Return a JSON response with a "Not Found" message and the requested path
  return c.json(
    {
      message: `${NOT_FOUND_MESSAGE} - ${c.req.path}`,
    },
    NOT_FOUND,
  );
};

// Export the notFound middleware as the default export
export default notFound;
