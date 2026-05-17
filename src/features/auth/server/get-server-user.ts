import { cookies } from "next/headers";

import { currentUserApi } from "../api/current-user-api";
import { ApiError } from "@/src/lib/api/api-error";

export async function getServerUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // TODO: we need to add a generic message for success or error casee
  // TODO: this function working in SSR
  if (!token) return null;

  try {
    const res = await  currentUserApi.execute(undefined, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    return {
      success: true,
      user: res,
    };
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
