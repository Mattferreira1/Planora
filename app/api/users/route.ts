import { prisma } from "@/utils/database/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      return NextResponse.json(
        {
          message: "No users found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json({
      users,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Failed to fetch users",
        error: e,
      },
      { status: 500 },
    );
  }
}
