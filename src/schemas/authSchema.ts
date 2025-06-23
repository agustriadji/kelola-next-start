import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, "Name is required"),
  password: z.string().min(8, "Password must be 8 character of greater"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
