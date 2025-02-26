import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { authOptions } from "@/lib/nextAuth";

const handler = NextAuth(authOptions as NextAuthOptions);

export { handler as GET, handler as POST };