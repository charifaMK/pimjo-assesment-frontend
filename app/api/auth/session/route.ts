import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth-utils";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // get the authentication token from the request header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const token = authHeader.substring(7);

    // verify this token is legit and hasn't been tampered with
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // find the user's session and grab their info from our database
    const sessionWithUser = await prisma.session.findFirst({
      where: {
        token: token,
        userId: payload.userId,
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          }
        }
      }
    });

    if (!sessionWithUser) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: sessionWithUser.user,
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
};