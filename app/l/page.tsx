"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LIndex() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/l/saas/");
  }, [router]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#070b14] text-slate-300">
      <p className="text-sm">Redirigiendo…</p>
    </div>
  );
}
