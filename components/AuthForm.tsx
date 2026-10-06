"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn, signUp } from "@/lib/auth";

const input = "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-rose-500";
const primary = "w-full rounded-xl bg-rose-500 py-3 text-center font-semibold text-white hover:bg-rose-600 disabled:opacity-60";
const secondary = "block w-full rounded-xl border border-gray-300 py-3 text-center text-sm font-semibold hover:bg-gray-50";

export function LoginForm({ notice }: { notice?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await signIn(String(form.get("email")), String(form.get("password")));
    } catch (err) {
      setLoading(false);
      return setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    }
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {notice && <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">{notice}</p>}
      <input name="email" type="email" required placeholder="이메일" className={input} />
      <input name="password" type="password" required placeholder="비밀번호" className={input} />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className={primary}>{loading ? "로그인 중..." : "로그인"}</button>
      <Link href="/signup" className={secondary}>회원가입</Link>
    </form>
  );
}

export function SignupForm() {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    if (form.get("password") !== form.get("confirm")) {
      return setError("비밀번호가 일치하지 않습니다.");
    }
    setLoading(true);
    try {
      await signUp(String(form.get("name")), String(form.get("email")), String(form.get("password")));
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다.");
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div role="status" className="space-y-4 text-center">
        <p className="rounded-xl bg-green-50 px-4 py-4 text-sm text-green-700">
          회원가입이 완료되었습니다. 이제 로그인할 수 있습니다.
        </p>
        <Link href="/login" className={`${primary} block`}>로그인하러 가기</Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" required placeholder="이름" className={input} />
      <input name="email" type="email" required placeholder="이메일" className={input} />
      <input name="password" type="password" required minLength={6} placeholder="비밀번호 (6자 이상)" className={input} />
      <input name="confirm" type="password" required placeholder="비밀번호 확인" className={input} />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className={primary}>{loading ? "처리 중..." : "회원가입"}</button>
      <Link href="/login" className={secondary}>이미 계정이 있어요 · 로그인</Link>
    </form>
  );
}
