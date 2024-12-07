"use client";

import React, { useState } from "react";
import SignUpForm from "../_components/SignUpForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import VerifyForm from "../_components/VerifyForm";

const Page = () => {
  const [next, setNext] = useState(false);

  return (
    <Card className="w-96 h-[550px] px-5 py-8">
      <CardTitle>{!next ? "Signup" : "Verify"}</CardTitle>
      <CardContent className="w-full p-0 py-10">
        {!next ? <SignUpForm setNext={setNext} /> : <VerifyForm />}
      </CardContent>
    </Card>
  );
};

export default Page;
