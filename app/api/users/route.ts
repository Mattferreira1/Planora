import { prisma } from "@/utils/database/client";
import { NextRequest, NextResponse } from "next/server";
import { ca } from "zod/locales";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      return NextResponse.json({
        message: "No users found",
        status: 404,
      });
    }
    return NextResponse.json({
      users,
      status: 200,
    });
  } catch (e) {
    return NextResponse.json({
      message: "Failed to fetch users",
      error: e,
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  const user = await request.json();
  console.log(user);
  try {
  } catch (e) {
    return NextResponse.json({
      message: "Falha ao criar usuário",
      error: e,
      status: 500,
    });
  }

  return NextResponse.json({
    message: "Usuário criado com sucesso",
    status: 201,
  });
}
