import { z } from "zod";

export const userSchema = z.object({
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

export const orderItemSchema = z.object({
  id: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  userData: userSchema,
  orderData: z
    .array(orderItemSchema)
    .min(1, "Objednávka musí obsahovat alespoň 1 položku"),
});
