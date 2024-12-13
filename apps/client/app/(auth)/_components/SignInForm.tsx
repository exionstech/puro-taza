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
import { SignInFormSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignInForm = ({ setNext }: SignInFormProps) => {
  const router = useRouter();

  const { loading, login } = useAuth();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInFormSchema>) => {
    console.log(data);
    try {
      const response = await login(data);

      if (response.success) {
        toast.success(response.message);
        console.log(response);
        setNext(true);
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
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="tel" {...field} placeholder="Phone"  className="h-12 text-xl rounded-xl"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full text-2xl py-6 flex items-center rounded-xl"
          disabled={loading}
        >
          <h1 className="text-2xl">Login</h1>
        </Button>
        <div className="flex w-full gap-4 items-center justify-center">
          <div className="h-[1px] w-1/2 bg-[#1E1D1D]"/>
          <h1 className="text-xl">or</h1>
          <div className="h-[1px] w-1/2 bg-[#1E1D1D]"/>
        </div>
        <Button
        variant={"outline"}
        className="w-full py-6 flex items-center"
        disabled={loading}
        >
          <h1 className="text-xl">Sign in with Google</h1>
        </Button>
      </form>
      <div className="mt-5 flex gap-3">
        <h1>New to Puro Taja?</h1>
      <Link href={"/sign-up"} className="border-b-2 border-violet text-violet font-medium">
          Create Account
      </Link>
      </div>
    </Form>
  );
};

export default SignInForm;
