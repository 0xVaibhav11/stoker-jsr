# @vbhv11/stoker 🔥

> This repo is a fork of [stoker](https://github.com/w3cj/stoker) by
> [@w3cj](https://github.com/w3cj) with the goal of implementing utilities for
> Deno 🦕 and publishing to JSR

_stoke the flame 🤙🔥_

[![JSR](https://jsr.io/badges/@vbhv11/stoker)](https://jsr.io/@vbhv11/stoker)
[![GitHub last commit](https://img.shields.io/github/last-commit/0xVaibhav11/stoker-jsr)](https://github.com/0xVaibhav11/stoker-jsr/commits/main)

## Install

```bash
deno add jsr:@vbhv11/stoker
```
or

```json
{
  "imports": {
    "@vbhv11/stoker": "jsr:@vbhv11/stoker",
    //or for smaller imports
    "stoker": "jsr:@vbhv11/stoker"
  }
}
```

> Utilities for [hono](https://www.npmjs.com/package/hono) and
>[@hono/zod-openapi](https://www.npmjs.com/package/@hono/zod-openapi)

## Utilities

### stoker/http-status-codes

HTTP status code constants. Provides individual typed / documented exports. Use
anywhere you need a status code instead of hard coding raw numbers.

> Sourced from
> [http-status-codes](https://www.npmjs.com/package/http-status-codes) | RFC1945
> (HTTP/1.0), RFC2616 (HTTP/1.1), RFC2518 (WebDAV), RFC6585 (Additional HTTP
> Status Codes), and RFC7538 (Permanent Redirect).

> Why not use the `http-status-codes` package directly? `http-status-codes`
> exports enums which do not work well with the `@hono/zod-openapi` type system
> and the built in `StatusCode` type from `hono/utils/http-status`.

#### Example Usage

```ts
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@vbhv11/stoker/http-status-codes";

const app = new OpenAPIHono();

app.notFound((c) => {
  return c.json({
    message: `Not Found - ${c.req.path}`,
  }, HttpStatusCodes.NOT_FOUND);
});

app.onError((err, c) => {
  return c.json(
    {
      message: err.message,
    },
    HttpStatusCodes.INTERNAL_SERVER_ERROR,
  );
});

app.openapi(
  createRoute({
    path: "/",
    tags: ["Index"],
    description: "Index route",
    method: "get",
    responses: {
      [HttpStatusCodes.OK]: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Index route",
      },
    },
  }),
  (c) => {
    return c.json({ message: "Hello World" }, HttpStatusCodes.OK);
  },
);

export default app;
```

### @vbhv11/stoker/http-status-phrases

HTTP status phrase constants.

#### Example Usage

```ts
import * as HttpStatusPhrases from "@vbhv11/stoker/http-status-phrases";

console.log(HttpStatusPhrases.NOT_FOUND); // Not Found
```

## Middlewares

### @vbhv11/stoker/middlewares/not-found

A default 404 handler.

- Responds with JSON object
  - Message property includes not found path
- Sets status code to 404

#### Example Usage

```ts
import { Hono } from "hono";
import notFound from "@vbhv11/stoker/middlewares/not-found";

const app = new Hono();

app.notFound(notFound);

export default app;
```

### @vbhv11/stoker/middlewares/on-error

A default error handler.

- Responds with JSON object
  - Message property includes error message
  - Stack trace included when NODE_ENV !== "production"
- Sets status code to existing status code if already set OR 500

#### Example Usage

```ts
import { Hono } from "hono";
import onError from "@vbhv11/stoker/middlewares/on-error";

const app = new Hono();

app.onError(onError);

export default app;
```

### @vbhv11/stoker/middlewares/serve-emoji-favicon

Serve an svg emoji as a favicon from `/favicon.ico`

#### Example Usage

```ts
import { Hono } from "hono";
import serveEmojiFavicon from "@vbhv11/stoker/middlewares/serve-emoji-favicon";

const app = new Hono();

app.use(serveEmojiFavicon("🔥"));

export default app;
```

## Open API

### Default Hook

A default error hook you can include in your OpenAPIHono instance. Includes the
`success` status and `ZodError`

#### Example Usage

```ts
import { OpenAPIHono } from "@hono/zod-openapi";
import defaultHook from "@vbhv11/stoker/openapi/default-hook";

/*
Any validation errors will respond with status code 422 and body:
{
  success: false,
  error: {}, // Full Zod Error
}
*/
const app = new OpenAPIHono({
  defaultHook,
});

export default app;
```

### Helpers

#### @vbhv11/stoker/openapi/helpers/json-content

Create a content / schema description with a type of `application/json`

##### Example Usage

```ts
import { z } from "@hono/zod-openapi";
import jsonContent from "@vbhv11/stoker/openapi/helpers/json-content";

const schema = z.object({
  message: z.string(),
});

/*
* Equivalent to:
{
  content: {
    "application/json": {
      schema,
    },
  },
  description: "Retrieve the user",
}
*/
const response = jsonContent(
  schema,
  "Retrieve the message",
);
```

#### @vbhv11/stoker/openapi/helpers/json-content-required

Useful for json body schema validators.

Create a content / schema description with a type of `application/json` and
required set to `true`

##### Example Usage

```ts
import { z } from "@hono/zod-openapi";
import jsonContentRequired from "@vbhv11/stoker/openapi/helpers/json-content-required";

const schema = z.object({
  message: z.string(),
});

/*
* Equivalent to:
{
  content: {
    "application/json": {
      schema,
    },
  },
  description: "Retrieve the user",
  required: true
}
*/
const response = jsonContentRequired(
  schema,
  "Retrieve the message",
);
```

#### @vbhv11/stoker/openapi/helpers/json-content-one-of

> Peer dependency of `@asteasolutions/zod-to-openapi`

> WARNING: Not recommended right now, type hints from @hono/zod-openapi are not
> correct when using this helper. If you don't absolutely need `oneOf` in your
> specification, use zod `or` (anyOf) instead.

Create a json content / schema description where the schema can be
[oneOf](https://swagger.io/docs/specification/v3_0/data-models/oneof-anyof-allof-not/#oneof)
multiple schemas. Useful when you have multiple possible validation response
schemas.

##### Example Usage

```ts
import { z } from "@hono/zod-openapi";
import jsonContentOneOf from "@vbhv11/stoker/openapi/helpers/json-content-one-of";
import createErrorSchema from "@vbhv11/stoker/openapi/schemas/create-error-schema";
import IdParamsSchema from "@vbhv11/stoker/openapi/schemas/id-params";

const bodySchema = z.object({
  name: z.string(),
});

/*
* Equivalent to:
{
  content: {
    "application/json": {
      schema: {
        oneOf: SchemaObject[]
      },
    },
  },
  description: "Invalid Id params or Invalid Body"
}
*/
const result = jsonContentOneOf(
  [createErrorSchema(IdParamsSchema), createErrorSchema(bodySchema)],
  "Invalid Id params or Invalid Body",
);
```

#### @vbhv11/stoker/openapi/helpers/one-of

> Peer dependency of `@asteasolutions/zod-to-openapi`

Used internally by `@vbhv11/stoker/openapi/helpers/json-content-one-of` but exported
here in case you need to access the generated schemas for other use cases.

```ts
import { z } from "@hono/zod-openapi";
import oneOf from "@vbhv11/stoker/openapi/helpers/one-of";
import createErrorSchema from "@vbhv11/stoker/openapi/schemas/create-error-schema";
import IdParamsSchema from "@vbhv11/stoker/openapi/schemas/id-params";

const bodySchema = z.object({
  name: z.string(),
});

/*
 * Returns: SchemaObject[]
 */
const result = oneOf([
  createErrorSchema(IdParamsSchema),
  createErrorSchema(bodySchema),
]);
```

### Schemas

Commonly used zod schemas for use when creating routes with `@hono/zod-openapi`

#### @vbhv11/stoker/openapi/schemas/id-params

Validate `id` in path params as a number.

##### Example Usage

```ts
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@vbhv11/stoker/http-status-codes";
import jsonContent from "@vbhv11/stoker/openapi/helpers/json-content";
import IdParamsSchema from "@vbhv11/stoker/openapi/schemas/id-params";

const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: "get",
    path: "/users/{id}",
    request: {
      params: IdParamsSchema,
    },
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.object({
          id: z.number(),
        }),
        "Retrieve the user",
      ),
    },
  }),
  (c) => {
    // id is a valid number
    const { id } = c.req.valid("param");
    return c.json({
      id,
    }, HttpStatusCodes.OK);
  },
);

export default app;
```

#### @vbhv11/stoker/openapi/schemas/slug-params

Validate `slug` in path params as a slug.

##### Example Usage

```ts
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@vbhv11/stoker/http-status-codes";
import jsonContent from "@vbhv11/stoker/openapi/helpers/json-content";
import SlugParamsSchema from "@vbhv11/stoker/openapi/schemas/slug-params";

const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: "get",
    path: "/posts/{slug}",
    request: {
      params: SlugParamsSchema,
    },
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.object({
          slug: z.string(),
        }),
        "Retrieve the post",
      ),
    },
  }),
  (c) => {
    // slug is a valid slug
    const { slug } = c.req.valid("param");
    return c.json({
      slug,
    }, HttpStatusCodes.OK);
  },
);

export default app;
```

#### @vbhv11/stoker/openapi/schemas/id-uuid-params

Validate `id` in path params as a uuid.

##### Example Usage

```ts
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@vbhv11/stoker/http-status-codes";
import jsonContent from "@vbhv11/stoker/openapi/helpers/json-content";
import IdUUIDParamsSchema from "@vbhv11/stoker/openapi/schemas/id-uuid-params";

const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: "get",
    path: "/users/{id}",
    request: {
      params: IdUUIDParamsSchema,
    },
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.object({
          id: z.uuid(),
        }),
        "Retrieve the user",
      ),
    },
  }),
  (c) => {
    // id is a valid uuid
    const { id } = c.req.valid("param");
    return c.json({
      id,
    }, HttpStatusCodes.OK);
  },
);

export default app;
```

#### @vbhv11/stoker/openapi/schemas/create-message-object

Create an object schema with a message string property. Useful for error
messages.

##### Example Usage

```ts
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@vbhv11/stoker/http-status-codes";
import * as HttpStatusPhrases from "@vbhv11/stoker/http-status-phrases";
import jsonContent from "@vbhv11/stoker/openapi/helpers/json-content";
import createMessageObjectSchema from "@vbhv11/stoker/openapi/schemas/create-message-object";
import IdParamsSchema from "@vbhv11/stoker/openapi/schemas/id-params";

const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: "get",
    path: "/some-thing-that-might-not-be-found",
    responses: {
      [HttpStatusCodes.NOT_FOUND]: jsonContent(
        createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND),
        HttpStatusPhrases.NOT_FOUND,
      ),
    },
  }),
  (c) => {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  },
);

export default app;
```

#### @vbhv11/stoker/openapi/schemas/create-error-schema

Create an example error schema with zod error / validation messages based on
given schema.

##### Example Usage

```ts
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@vbhv11/stoker/http-status-codes";
import jsonContent from "@vbhv11/stoker/openapi/helpers/json-content";
import createErrorSchema from "@vbhv11/stoker/openapi/schemas/create-error-schema";

const TaskSchema = z.object({
  name: z.string(),
  completed: z.boolean().default(false),
});

export const createTask = createRoute({
  method: "post",
  path: "/task",
  request: {
    body: jsonContent(TaskSchema, "The Task"),
  },
  responses: {
    // ... OK response here
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      // Creates example schema with validation messages for name / completed
      createErrorSchema(TaskSchema),
      "Invalid task",
    ),
  },
});
```

## Credits

Thanks to [@w3cj](https://github.com/w3cj) for the original implementation of
these utilities.

<!-- Badges -->
