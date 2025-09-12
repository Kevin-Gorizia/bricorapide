import { z } from "zod";

// Schémas de validation Zod
export const bookingFormSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(
      /^[a-zA-ZÀ-ÿ\s-']+$/,
      "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes"
    ),

  email: z
    .string()
    .email("Veuillez entrer une adresse email valide")
    .max(100, "L'email ne peut pas dépasser 100 caractères"),

  telephone: z
    .string()
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      "Veuillez entrer un numéro de téléphone français valide"
    ),

  service: z.enum(["meuble", "douche", "cuisine"] as const, {
    errorMap: () => ({ message: "Veuillez sélectionner un service valide" }),
  }),

  surface: z
    .number()
    .min(0, "La surface ne peut pas être négative")
    .max(1000, "La surface ne peut pas dépasser 1000 m²")
    .optional(),

  distanceKm: z
    .number()
    .min(0, "La distance ne peut pas être négative")
    .max(200, "Nous n'intervenons pas au-delà de 200 km"),

  adresse: z
    .string()
    .min(10, "L'adresse doit contenir au moins 10 caractères")
    .max(200, "L'adresse ne peut pas dépasser 200 caractères"),

  description: z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional(),

  datePreferee: z.string().refine((date: string | number | Date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "La date ne peut pas être dans le passé"),
});

export const loginSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const registerSchema = z
  .object({
    nom: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne peut pas dépasser 50 caractères"),
    email: z.string().email("Veuillez entrer une adresse email valide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre"
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Les mots de passe ne correspondent pas",
      path: ["confirmPassword"],
    }
  );

// Types inférés des schémas
export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// Fonction utilitaire pour valider les données
export function validateBookingForm(
  data: unknown
):
  | { success: true; data: BookingFormData }
  | { success: false; errors: Record<string, string> } {
  const result = bookingFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  result.error.errors.forEach(
    (error: { path: (string | number)[]; message: string }) => {
      const path = error.path.join(".");
      errors[path] = error.message;
    }
  );

  return { success: false, errors };
}
