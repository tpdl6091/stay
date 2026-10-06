"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getUser } from "@/lib/auth";
import { nightsBetween, won } from "@/lib/stays";

export default function BookingBox({
  id,
  price,
  maxGuests,
  initial,
}: {
  id: string;
  price: number;
  maxGuests: number;
  initial: { checkin: string; checkout: string; guests: string };
}) {
  const router = useRouter();
  const [checkin, setCheckin] = useState(initial.checkin);
  const [checkout, setCheckout] = useState(initial.checkout);
  const [guests, setGuests] = useState(Math.min(Number(initial.guests) || 2, maxGuests));

  const nights = nightsBetween(checkin, checkout);
  const q = new URLSearchParams({ id, guests: String(guests) });
  if (checkin) q.set("checkin", checkin);
  if (checkout) q.set("checkout", checkout);

  function reserve() {
    router.push(getUser() ? `/booking?${q}` : "/login?reason=booking");
  }

  const label = "flex flex-col gap-1 text-xs font-semibold text-gray-500";
  const input = "rounded-xl border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900";

  return (
    <aside className="h-fit rounded-3xl border border-gray-200 p-7 shadow-lg md:sticky md:top-24">
      <p className="text-2xl font-bold">
        {won(price)} <span className="text-base font-normal text-gray-500">/ 1박</span>
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <label className={label}>
          체크인
          <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={input} />
        </label>
        <label className={label}>
          체크아웃
          <input type="date" value={checkout} min={checkin} onChange={(e) => setCheckout(e.target.value)} className={input} />
        </label>
        <label className={`${label} col-span-2`}>
          인원 (최대 {maxGuests}명)
          <input
            type="number"
            min={1}
            max={maxGuests}
            value={guests}
            onChange={(e) => setGuests(Math.max(1, Math.min(maxGuests, Number(e.target.value) || 1)))}
            className={input}
          />
        </label>
      </div>
      <div className="mt-5 space-y-1 border-t border-gray-200 pt-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>{won(price)} × {nights}박</span>
          <span>{won(price * nights)}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-gray-900">
          <span>총 가격</span>
          <span>{won(price * nights)}</span>
        </div>
      </div>
      <button
        onClick={reserve}
        className="mt-6 block w-full rounded-2xl bg-rose-500 py-3.5 text-center font-semibold text-white hover:bg-rose-600"
      >
        예약하기
      </button>
    </aside>
  );
}
