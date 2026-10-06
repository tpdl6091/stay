import Link from "next/link";
import { notFound } from "next/navigation";
import BookingBox from "@/components/BookingBox";
import { getStay, one, won } from "@/lib/stays";

type SP = { [key: string]: string | string[] | undefined };

export default async function StayDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SP>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const stay = getStay(id);
  if (!stay) notFound();

  const initial = {
    checkin: one(sp.checkin),
    checkout: one(sp.checkout),
    guests: one(sp.guests) || "2",
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <Link href="/stays" className="text-sm text-gray-500 hover:text-rose-500">← 목록으로</Link>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/stay-${stay.id}/1600/900`}
        alt={stay.name}
        className={`mt-5 h-80 w-full rounded-3xl bg-gradient-to-br object-cover md:h-[28rem] ${stay.gradient}`}
      />
      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_360px]">
        <div>
          <h1 className="text-3xl font-bold">{stay.name}</h1>
          <p className="mt-2 text-gray-500">{stay.city} · {stay.type} · 최대 {stay.maxGuests}인</p>
          <p className="mt-1 text-sm">★ {stay.rating} <span className="text-gray-500">(후기 {stay.reviews}개)</span></p>
          <p className="mt-3 font-semibold">{won(stay.price)} <span className="font-normal text-gray-500">/ 1박</span></p>
          <hr className="my-8 border-gray-200" />
          <h2 className="mb-3 text-xl font-semibold">숙소 설명</h2>
          <p className="leading-relaxed text-gray-700">{stay.description}</p>
          <h2 className="mt-10 mb-4 text-xl font-semibold">편의시설</h2>
          <ul className="flex flex-wrap gap-2">
            {stay.amenities.map((a) => (
              <li key={a} className="rounded-full border border-gray-300 px-4 py-1.5 text-sm">{a}</li>
            ))}
          </ul>
        </div>
        <BookingBox id={stay.id} price={stay.price} maxGuests={stay.maxGuests} initial={initial} />
      </div>
    </main>
  );
}
