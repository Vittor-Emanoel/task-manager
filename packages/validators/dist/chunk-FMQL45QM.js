// src/category.ts
import { z } from "zod";
var categorySchema = z.object({
  name: z.string().min(2),
  color: z.hex()
});

export {
  categorySchema
};
