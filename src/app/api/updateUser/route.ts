import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import redis from "@/lib/redis";

const prisma = new PrismaClient();
const CACHE_KEY = "users_cache";

export const PATCH = async (req: NextRequest) => {
  try {
    const { id, name, email, phone } = await req.json();
    if (!id || (!name && !phone && !email)) {
      return NextResponse.json(
        {
          error:
            "User ID and at least one of name, phone or email are required",
        },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(email && { email }),
      },
    });

    const cachedUsers = await redis.get(CACHE_KEY);
    if (cachedUsers) {
      await redis.del(CACHE_KEY);
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
};
