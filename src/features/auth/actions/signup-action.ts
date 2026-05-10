"use server";

import { cookies } from "next/headers";

import { signupApi } from "../api/signup-api";
import { ApiError } from "@/src/lib/api/api-error";

export async function signupAction(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}) {
  try {
    const result = await signupApi.execute(data);
    const cookieStore = await cookies();
    cookieStore.set("token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        statusCode: error.statusCode,
      };
    }
    return { success: false, message: "Something went wrong" };
  }
}
