"use server";

import { cookies } from "next/headers";

import { loginApi } from "../api/login-api";
import { ApiError } from "@/src/lib/api/api-error";

export async function loginAction(data: { email: string; password: string }) {
  try {
    const result = await loginApi.execute(data);
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
