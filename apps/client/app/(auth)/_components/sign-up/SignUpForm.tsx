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

const SignUpForm = () => {
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
        console.log(response);
        router.push("/verify");
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
                <Input type="text" {...field} placeholder="Full Name" />
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
                <Input type="tel" {...field} placeholder="Phone" />
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
                <Input type="email" {...field} placeholder="Email Address" />
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
          className="w-full bg-[#735498]"
          disabled={!checkbox || loading}
        >
          Create Account
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
