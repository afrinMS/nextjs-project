import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  const { userId } = await req.json();
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: Number(userId) },
    });
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error("Error in deleteing user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
