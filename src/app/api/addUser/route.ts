import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import redis from "../../../lib/redis";
const prisma = new PrismaClient();
const CACHE_KEY = "users_cache";

interface UserRequestBody {
  name: string;
  email: string;
  phone: string;
}

export const POST = async (req: NextRequest) => {
  const { name, email, phone }: UserRequestBody = await req.json();
  try {
    const newUser = await prisma.user.create({ data: { name, email, phone } });
    const cachedUsers = await redis.get(CACHE_KEY);
    if (cachedUsers) {
      await redis.del(CACHE_KEY);
    }
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
};
