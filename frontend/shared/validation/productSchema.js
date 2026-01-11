import { z } from "https://cdn.jsdelivr.net/npm/zod@3.23.8/+esm";
export const productSchema = z.object({
  name: z.string().min(1, "Název produktu je povinný"),
  price: z
    .number({ invalid_type_error: "Cena musí být číslo" })
    .min(0, "Cena musí být ≥ 0"),
  description: z.string().optional(),
  available: z.union([z.boolean(), z.literal(0), z.literal(1)]),
  categoryId: z
    .number({ invalid_type_error: "Kategorie musí být číslo" })
    .min(1, "Kategorie je povinná"),
});
