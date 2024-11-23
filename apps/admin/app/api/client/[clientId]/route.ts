import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

function corsResponse(response: NextResponse) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export async function OPTIONS() {
  return corsResponse(
    new NextResponse(null, {
      status: 204,
    })
  );
}

export async function GET({ params }: { params: { clientId: string } }) {
  const users = await prisma.client.findUnique({
    where: {
      id: params.clientId,
    },
  });

  if (!users) {
    return corsResponse(
      NextResponse.json({ message: "User not found", status: 404 })
    );
  }

  return corsResponse(NextResponse.json({ users: users }));
}

export async function POST({
  params,
  data,
}: {
  params: { clientId: string };
  data: any;
}) {
  const users = await prisma.client.update({
    where: {
      id: params.clientId,
    },
    data: data,
  });

  if (!users) {
    return corsResponse(
      NextResponse.json({ message: "User not found", status: 404 })
    );
  }

  return corsResponse(NextResponse.json({ users: users }));
}
