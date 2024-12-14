import { z } from "zod";

export const SignInFormSchema = z.object({
  phone: z
    .string()
    .min(10, {
      message: "Phone number is required",
    })
    .max(10),
});

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


export const addressSchema = z.object({
  houseNo: z.string().min(1, { message: "House number is required" }),
  street: z.string().min(2, { message: "Street must be at least 2 characters" }),
  district: z.string().min(2, { message: "District must be at least 2 characters" }),
  pinCode: z.string()
    .regex(/^\d{6}$/, { message: "Pin code must be 6 digits" })
});
