"use client";

import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import SignInForm from "../_components/SignInForm";
import VerifyForm from "../_components/VerifyForm";

const Page = () => {
  const [next, setNext] = useState(false);

  return (
    <Card className="w-96 h-[550px] px-5 py-8">
      <CardTitle>{!next ? "Signin" : "Verify"}</CardTitle>
      <CardContent className="w-full p-0 py-10">
        {!next ? <SignInForm setNext={setNext} /> : <VerifyForm />}
      </CardContent>
    </Card>
  );
};

export default Page;
