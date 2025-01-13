import { Login } from "@/components/Login";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 dark:bg-neutral-950">
      <div className="w-full max-w-sm">
        <Login />
      </div>
    </div>
  );
}
