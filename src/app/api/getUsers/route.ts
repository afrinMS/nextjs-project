import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import redis from "../../../lib/redis";
const prisma = new PrismaClient();

const CACHE_KEY = "users_cache";

export const GET = async () => {
  try {
    // Try to get cached data
    const cachedUsers = await redis.get(CACHE_KEY);
    if (cachedUsers) {
      return NextResponse.json(JSON.parse(cachedUsers), { status: 200 });
    }

    // If no cache, fetch from database
    const users = await prisma.user.findMany();

    // Cache the data with an expiry time (e.g., 60 seconds)
    await redis.set(CACHE_KEY, JSON.stringify(users), "EX", 60);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error); // Log any errors
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client
  }
};
