"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** En export estático no corre `redirect()` del servidor; esto funciona en Hostinger. */
export default function Home() {
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
