import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import redis from "@/lib/redis";

const prisma = new PrismaClient();
const CACHE_KEY = "users_cache";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: Number } }
) => {
  const { id } = params;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    const cachedUsers = await redis.get(CACHE_KEY);
    if (cachedUsers) {
      await redis.del(CACHE_KEY);
    }
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
};
