"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function SessionSync() {
  const { status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const prevStatus = useRef(status);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      update();
      prevPathname.current = pathname;
    }
  }, [pathname, update]);
  useEffect(() => {
    if (prevStatus.current !== status) {
      router.refresh();
    }
    prevStatus.current = status;
  }, [status, router]);

  return null;
}
