import React from "react";
import SignUpForm from "../_components/sign-up/SignUpForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const Page = () => {
  return (
    <Card className="w-96 h-[550px] px-5 py-8">
      <CardTitle>Signup</CardTitle>
      <CardContent className="w-full p-0 py-10">
        <SignUpForm />
      </CardContent>
    </Card>
  );
};

export default Page;
