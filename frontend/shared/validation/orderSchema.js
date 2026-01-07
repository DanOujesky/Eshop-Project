import { z } from "https://cdn.jsdelivr.net/npm/zod@3.23.8/+esm";

export const orderSchema = z.object({
  first_name: z
    .string()
    .min(2, "Jméno musí mít alespoň 2 znaky")
    .max(50, "Jméno je příliš dlouhé")
    .regex(/^[A-Za-zÀ-ž\s-]+$/, "Jméno obsahuje neplatné znaky"),

  last_name: z
    .string()
    .min(2, "Příjmení musí mít alespoň 2 znaky")
    .max(50, "Příjmení je příliš dlouhé")
    .regex(/^[A-Za-zÀ-ž\s-]+$/, "Příjmení obsahuje neplatné znaky"),

  email: z
    .string()
    .email("Neplatný formát e-mailu")
    .max(100, "E-mail je příliš dlouhý"),
});
