import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  try {
    const { userId, name, email } = await req.json();
    if (!userId || (!name && !email)) {
      return NextResponse.json(
        { error: "User ID and at least one of name or email are required" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
