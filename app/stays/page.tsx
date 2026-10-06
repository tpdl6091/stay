import SearchBar from "@/components/SearchBar";
import StayCard from "@/components/StayCard";
import { one, stays } from "@/lib/stays";

type SP = { [key: string]: string | string[] | undefined };

export default async function StaysPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const destination = one(sp.destination).trim();
  const checkin = one(sp.checkin);
  const checkout = one(sp.checkout);
  const guests = one(sp.guests);
  const type = one(sp.type);
  const maxPrice = Number(one(sp.maxPrice)) || 0;
  const sort = one(sp.sort);

  let list = stays.filter(
    (s) =>
      (!destination || s.city.includes(destination) || s.name.includes(destination)) &&
      (!guests || s.maxGuests >= Number(guests)) &&
      (!type || s.type === type) &&
      (!maxPrice || s.price <= maxPrice),
  );
  if (sort === "price") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

  const q = new URLSearchParams();
  if (checkin) q.set("checkin", checkin);
  if (checkout) q.set("checkout", checkout);
  if (guests) q.set("guests", guests);
  const query = q.size ? `?${q}` : "";

  const sel = "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900";
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-8">
      <div className="mb-6 rounded-3xl bg-rose-50 p-3">
        <SearchBar defaults={{ destination, checkin, checkout, guests }} />
      </div>

      <form className="mb-8 flex flex-wrap items-center gap-3">
        <input type="hidden" name="destination" value={destination} />
        <input type="hidden" name="checkin" value={checkin} />
        <input type="hidden" name="checkout" value={checkout} />
        <input type="hidden" name="guests" value={guests} />
        <select name="type" defaultValue={type} className={sel}>
          <option value="">전체 유형</option>
          {["호텔", "펜션", "리조트", "게스트하우스"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select name="maxPrice" defaultValue={maxPrice ? String(maxPrice) : ""} className={sel}>
          <option value="">가격 무제한</option>
          <option value="100000">10만원 이하</option>
          <option value="200000">20만원 이하</option>
          <option value="300000">30만원 이하</option>
        </select>
        <select name="sort" defaultValue={sort} className={sel}>
          <option value="">추천순</option>
          <option value="price">낮은 가격순</option>
          <option value="rating">평점 높은순</option>
        </select>
        <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white">필터 적용</button>
      </form>

      <p className="mb-4 text-sm text-gray-500">숙소 {list.length}개</p>
      {list.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s) => (
            <StayCard key={s.id} stay={s} query={query} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-gray-500">조건에 맞는 숙소가 없습니다.</p>
      )}
    </main>
  );
}
