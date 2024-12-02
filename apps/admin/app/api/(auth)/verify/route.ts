import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/server/otp-service";
import { prisma } from "@/lib/prisma";

interface VerificationCredentials {
  clientId: string;
  otp: string;
}

// CORS configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*", // Specify your allowed origin or use '*' for all
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle OPTIONS preflight request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  try {
    // Handle CORS for the POST request
    const origin = req.headers.get("origin") || "";
    const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

    // Basic origin check
    if (allowedOrigin !== "*" && origin !== allowedOrigin) {
      return NextResponse.json(
        { error: "Origin not allowed", success: false },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        }
      );
    }

    const body: VerificationCredentials = await req.json();

    if (!body.otp) {
      return NextResponse.json(
        { error: "Missing required field: otp", success: false },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (!body.clientId) {
      return NextResponse.json(
        { error: "Missing required field: client id", success: false },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const isVerified = await verifyOtp(body.clientId, body.otp);

    if (isVerified) {
      const client = await prisma.client.findUnique({
        where: { id: body.clientId },
      });

      return NextResponse.json(
        { client: client, success: true },
        {
          status: 200,
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(
      { error: "User not verified", success: false },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred", success: false },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
