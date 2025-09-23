import { z } from 'zod';

declare const categorySchema: z.ZodObject<{
    name: z.ZodString;
    color: z.ZodCustomStringFormat<"hex">;
}, z.core.$strip>;
type CreateCategoryInput = z.infer<typeof categorySchema>;

export { type CreateCategoryInput, categorySchema };
