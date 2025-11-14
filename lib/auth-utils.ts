import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getSupabaseClient } from "./supabase";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
};

// creates jwt token with user payload and expiration
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// validates and decodes jwt token to extract user data
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  };
};

// securely hashes password using bcrypt with salt
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// compares plain password with hashed password for verification
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
};

// generates unique identifier using timestamp and random string
export function generateId(): string {
  return `${Date.now()};-${Math.random().toString(36).substring(2, 15)};`;
};

// exchanges oauth authorization code for user session
export async function exchangeCodeForSession(code: string) {
  const supabase = getSupabaseClient();
  return await supabase.auth.exchangeCodeForSession(code);
};

// retrieves currently active user session from supabase
export async function getCurrentSession() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();
  return {
    session: data.session,
    error
  };;
};

// signs out user and clears their session
export async function signOut() {
  const supabase = getSupabaseClient();
  return await supabase.auth.signOut();
};

// authenticates user using email and password credentials
export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabaseClient();
  return await supabase.auth.signInWithPassword({ email, password });
};

// creates new user account with email and password
export async function signUpWithEmail(email: string, password: string) {
  const supabase = getSupabaseClient();
  return await supabase.auth.signUp({ email, password });
};