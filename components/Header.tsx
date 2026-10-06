"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, onAuthChange, signOut } from "@/lib/auth";

export default function Header() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const sync = () => setLoggedIn(!!getUser());
    sync();
    return onAuthChange(sync);
  }, []);

  function logout() {
    signOut();
    setLoggedIn(false);
    router.push("/");
    router.refresh();
  }

  const link = "hover:text-rose-500";
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 text-gray-900 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-rose-500">
          SEISTAY
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link href="/stays" className={link}>숙소찾기</Link>
          {loggedIn ? (
            <>
              <Link href="/my-bookings" className={link}>내 예약</Link>
              <Link href="/mypage" className={link}>마이페이지</Link>
              <button onClick={logout} className="rounded-full border border-gray-300 px-4 py-2 hover:bg-gray-50">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-gray-300 px-4 py-2 hover:bg-gray-50">로그인</Link>
              <Link href="/signup" className={link}>회원가입</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
