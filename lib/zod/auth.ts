import * as z from "zod";

export const schemaRegister = z
  .object({
    firstName: z.string().min(3, "Must be at least 3 characters"),
    lastName: z.string().min(3, "Must be at least 3 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });
export type SchemaRegister = z.infer<typeof schemaRegister>;

export const schemaLogin = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});
export type SchemaLogin = z.infer<typeof schemaLogin>;
