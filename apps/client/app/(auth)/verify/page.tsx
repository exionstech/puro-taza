import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import VerifyForm from "../_components/VerifyForm";

const Page = () => {
  return (
    <Card className="w-96 h-[550px] px-5 py-8">
      <CardTitle>Verify</CardTitle>
      <CardContent className="w-full p-0 py-10">
        <VerifyForm />
      </CardContent>
    </Card>
  );
};

export default Page;
