"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FormInput } from "./form-input";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";

const SignUpForm = ({ setNext }: SignInFormProps) => {
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const router = useRouter();

  const { loading, register, verify } = useAuth();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
    console.log(data);
    try {
      const response = await register(data);

      if (response.success) {
        toast.success(response.message);
        setNext(true);
        console.log(response);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" {...field} placeholder="Full Name" className="h-12 rounded-xl"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center border rounded-xl h-12">
                  <div className="px-4 flex gap-2">
                    <Image
                      src="/auth/indian-flag.svg"
                      alt="India"
                      width={20}
                      height={20}
                    />
                    <h1 className="text-muted-foreground">+91</h1>
                  </div>
                  <FormInput
                    type="tel"
                    {...field}
                    placeholder="Phone"
                    className="flex-1 h-full focus:outline-none"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" {...field} placeholder="Email Address" className="h-12 rounded-xl"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row items-start justify-between w-full gap-2">
          <Checkbox onClick={() => setCheckbox(!checkbox)} className="" />
          <p className="text-sm text-muted-foreground">
            I agree to Purotaja&apos;s Terms of Service, Privacy Policy and
            Content Policies
          </p>
        </div>
        <Button
          type="submit"
          className="w-full text-xl py-6 flex items-center justify-center rounded-xl"
          disabled={loading}
        >
          Create Account
        </Button>
        <div className="flex w-full gap-4 items-center justify-center mb-4">
          <div className="h-[1px] w-1/2 bg-[#1E1D1D]" />
          <h1 className="text-xl">or</h1>
          <div className="h-[1px] w-1/2 bg-[#1E1D1D]" />
        </div>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 mt-10 h-full"
          disabled={loading}
        >
          <FcGoogle className="w-20 h-20 flex shrink-0" />
          <span className="text-xl">Sign in with Google</span>
        </Button>
      </form>
      <Separator className="mt-10" />
      <div className="mt-5 flex gap-3">
        <h1>New to Puro Taja?</h1>
        <Link
          href="/sign-in"
          className="border-b-2 border-violet text-violet font-medium"
        >
          Login
        </Link>
      </div>
    </Form>
  );
};

export default SignUpForm;
