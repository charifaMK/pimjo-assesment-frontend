import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateToken, comparePassword, generateId } from "@/lib/auth-utils";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    // validate required input fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    // locate user account by email address
    const foundUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!foundUser) {
      return NextResponse.json(
        { error: "INVALID_CREDENTIALS", message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // retrieve user account with password credentials
    const account = await prisma.account.findFirst({
      where: {
        userId: foundUser.id,
        providerId: "credential",
        password: { not: null }
      }
    });

    if (!account || !account.password) {
      return NextResponse.json(
        { error: "INVALID_CREDENTIALS", message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // authenticate user password against stored hash
    const isValidPassword = await comparePassword(password, account.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "INVALID_CREDENTIALS", message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // create authentication token for user session
    const token = generateToken({
      userId: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
    });

    // establish user session in database with expiration
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000);

    await prisma.session.create({
      data: {
        id: generateId(),
        token,
        userId: foundUser.id,
        expiresAt,
        ipAddress: request.headers.get("x-forwarded-for") || undefined,
        userAgent: request.headers.get("user-agent") || undefined,
      }
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        image: foundUser.image,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};