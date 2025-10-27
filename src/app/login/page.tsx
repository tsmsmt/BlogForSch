import type { Metadata } from "next";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

import LoginButton from "./login-button";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to TSMSMT",
};

const LoginPage = async () => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-content w-full flex-col items-center justify-center p-4">
      <div className="text-2xl font-semibold">Log in</div>
      <p className="text-muted-foreground">to continue to TSMSMT</p>
      <LoginButton />
    </div>
  );
};

export default LoginPage;
