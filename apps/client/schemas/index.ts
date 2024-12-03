import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number is required",
    })
    .max(10),
  email: z.string().email({
    message: "Invalid email",
  }),
});

export const VerifyFormSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP is required",
  }),
});
