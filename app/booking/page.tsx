import Link from "next/link";
import { notFound } from "next/navigation";
import ConfirmBooking from "@/components/ConfirmBooking";
import { getStay, nightsBetween, one, won } from "@/lib/stays";

type SP = { [key: string]: string | string[] | undefined };

export default async function BookingPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const stay = getStay(one(sp.id));
  if (!stay) notFound();

  const checkin = one(sp.checkin);
  const checkout = one(sp.checkout);
  const guests = one(sp.guests) || "2";
  const nights = nightsBetween(checkin, checkout);
  const row = "flex justify-between py-2";

  return (
    <main className="mx-auto w-full max-w-xl px-6 py-10">
      <Link href={`/stays/${stay.id}`} className="text-sm text-gray-500 hover:text-rose-500">← 숙소로 돌아가기</Link>
      <h1 className="mt-4 mb-6 text-2xl font-bold">예약 확인</h1>
      <div className="mb-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 px-6 py-3">
        <div className={row}><span className="text-gray-500">숙소</span><b>{stay.name}</b></div>
        <div className={row}><span className="text-gray-500">위치</span><span>{stay.city}</span></div>
        <div className={row}><span className="text-gray-500">체크인</span><span>{checkin || "미선택"}</span></div>
        <div className={row}><span className="text-gray-500">체크아웃</span><span>{checkout || "미선택"}</span></div>
        <div className={row}><span className="text-gray-500">인원</span><span>{guests}명</span></div>
        <div className={row}><span className="text-gray-500">숙박</span><span>{nights}박</span></div>
        <div className={`${row} text-lg font-bold`}><span>총 결제금액</span><span>{won(stay.price * nights)}</span></div>
      </div>
      <ConfirmBooking />
    </main>
  );
}
