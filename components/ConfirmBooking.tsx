"use client";

import Link from "next/link";
import { useState } from "react";

export default function ConfirmBooking() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div role="status" className="rounded-2xl bg-green-50 p-6 text-center">
        <p className="text-xl font-bold text-green-700">예약이 완료되었습니다</p>
        <Link href="/" className="mt-4 inline-block text-sm text-gray-700 underline">홈으로 돌아가기</Link>
      </div>
    );
  }
  return (
    <button
      onClick={() => setDone(true)}
      className="w-full rounded-xl bg-rose-500 py-3 font-semibold text-white hover:bg-rose-600"
    >
      예약 확정하기
    </button>
  );
}
