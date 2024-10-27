import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

import type { ZodSchema } from "./types.ts";

/**
 * Generates an array of OpenAPI schema objects from an array of Zod schemas.
 * This function is useful for creating a 'oneOf' schema in OpenAPI specifications.
 *
 * @param {T[]} schemas - An array of Zod schemas to be converted to OpenAPI schemas.
 * @returns {object[]} An array of OpenAPI schema objects.
 */
const oneOf = <T extends ZodSchema>(schemas: T[]): object[] => {
  // Create a new OpenAPI registry
  const registry = new OpenAPIRegistry();

  // Register each schema with a unique string index
  schemas.forEach((schema, index) => {
    registry.register(index.toString(), schema);
  });

  // Generate OpenAPI components from the registry
  const generator = new OpenApiGeneratorV3(registry.definitions);
  const components = generator.generateComponents();

  // Extract and return the schema objects from the generated components
  // If no schemas are generated, return an empty array
  return components.components?.schemas
    ? Object.values(components.components!.schemas!)
    : [];
};

export default oneOf;
