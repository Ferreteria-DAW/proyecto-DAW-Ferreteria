import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es requerido",
  }),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});