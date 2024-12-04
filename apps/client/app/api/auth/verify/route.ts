import { DEFAULT_ROUTE } from "@/routes";
import axios from "axios";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const data: { otp: string; token: string } = await req.json();
  
  try {
    const response = await axios.post<LoginReturnType>(
      `${process.env.NEXT_PUBLIC_API_URL as String}/verify`,
      data
    );

    const { success } = response.data;

    if (success) {
      if (!data.token) {
        throw new Error("Token not found");
      }

      if (data.token) {
        req.cookies.set("token", data.token);
        const redirectUrl = req.nextUrl.searchParams.get("redirectUrl");

        return NextResponse.json(
          {
            data: response.data,
            redirectUrl: redirectUrl || DEFAULT_ROUTE,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "An error occurred" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
