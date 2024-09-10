"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../db";

export async function loginAction(
  email: string,
  password: string
): Promise<{ data?: any; error?: string }> {
  console.log(email);

  if (email && password) {
    const user = await prisma.user.findFirst({
      where: {
        email: email.toString(),
        password: password.toString(),
      },
    });

    if (!user) {
      console.log("User not found");
      return { error: "User not found" };
    }

    redirect("/dashboard");
  }
  console.log("Invalid data");

  return { error: "Invalid data" };
}
