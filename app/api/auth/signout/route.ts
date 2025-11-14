import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth-utils";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // extract authentication token from request header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // perform basic token validation for logout operation
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    prisma.session.deleteMany({
      where: {
        token: token,
        userId: payload.userId
      }
    }).catch(error => {
      // log cleanup error without interrupting logout flow
      console.warn("Session cleanup warning:", error);
    });

    // respond immediately while cleanup continues in background
    return NextResponse.json({ success: true, message: "Signed out successfully" });
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};