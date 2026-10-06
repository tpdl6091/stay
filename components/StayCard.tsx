import Link from "next/link";
import { Stay, won } from "@/lib/stays";

export default function StayCard({ stay, query = "" }: { stay: Stay; query?: string }) {
  return (
    <Link href={`/stays/${stay.id}${query}`} className="group block">
      <div className="relative overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://picsum.photos/seed/stay-${stay.id}/800/600`}
          alt={stay.name}
          loading="lazy"
          className={`h-64 w-full bg-gradient-to-br object-cover transition duration-300 group-hover:scale-105 ${stay.gradient}`}
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
          {stay.type}
        </span>
      </div>
      <div className="mt-3 flex justify-between gap-2">
        <h3 className="font-semibold">{stay.name}</h3>
        <span className="shrink-0 text-sm">★ {stay.rating}</span>
      </div>
      <p className="text-sm text-gray-500">{stay.city} · 최대 {stay.maxGuests}인</p>
      <p className="mt-1 text-sm"><b>{won(stay.price)}</b> <span className="text-gray-500">/ 1박</span></p>
    </Link>
  );
}
