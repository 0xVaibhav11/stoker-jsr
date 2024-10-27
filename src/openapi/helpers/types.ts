import type { z } from "@hono/zod-openapi";

export type ZodSchema =
  // deno-lint-ignore ban-ts-comment
  // @ts-expect-error
  z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;
