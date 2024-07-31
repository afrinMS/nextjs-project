import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserRequestBody {
  name: string;
  email: string;
  phone: number;
}

export const POST = async (req: NextRequest) => {
  const { name, email, phone }: UserRequestBody = await req.json();
  try {
    const newUser = await prisma.user.create({ data: { name, email, phone } });
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
};
