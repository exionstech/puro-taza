"use client";

import React, { useState } from "react";
import SignInForm from "../_components/SignInForm";
import VerifyForm from "../_components/VerifyForm";
import Image from "next/image";

const SignInClientPage = () => {
  const [next, setNext] = useState(false);

  return (
    <section className="w-full max-w-screen-2xl h-screen overflow-y-hidden mx-auto px-5 md:px-14 flex items-center justify-center">
      <div className="md:w-[50%] w-full h-full flex items-center justify-center md:px-10">
        <div className="w-full px-5">
          <h1 className="text-3xl font-bold">{!next ? "Login" : "Verify"}</h1>
          <div className="w-full py-10">
            {!next ? <SignInForm setNext={setNext} /> : <VerifyForm />}
          </div>
        </div>
      </div>
      <div className="w-[50%] hidden md:flex items-center justify-center">
        <Image
          src={"/auth/auth.png"}
          alt={"sign-in"}
          width={800}
          height={800}
          className="object-cover h-full w-full shrink-0"
        />
      </div>
    </section>
  );
};

export default SignInClientPage;
