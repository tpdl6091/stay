export default function SearchBar({
  defaults = {},
}: {
  defaults?: { destination?: string; checkin?: string; checkout?: string; guests?: string };
}) {
  const field = "flex flex-col gap-1 px-4 py-2 text-left";
  const label = "text-xs font-semibold text-gray-500";
  const input = "bg-transparent text-sm outline-none";
  return (
    <form
      action="/stays"
      className="grid w-full gap-2 rounded-3xl bg-white p-3 text-gray-900 shadow-xl md:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto] md:items-center md:rounded-full"
    >
      <label className={field}>
        <span className={label}>여행지</span>
        <input name="destination" defaultValue={defaults.destination} placeholder="도시 또는 숙소명" className={input} />
      </label>
      <label className={`${field} md:border-l`}>
        <span className={label}>체크인</span>
        <input type="date" name="checkin" defaultValue={defaults.checkin} className={input} />
      </label>
      <label className={`${field} md:border-l`}>
        <span className={label}>체크아웃</span>
        <input type="date" name="checkout" defaultValue={defaults.checkout} className={input} />
      </label>
      <label className={`${field} md:border-l`}>
        <span className={label}>인원</span>
        <input type="number" name="guests" min={1} max={10} defaultValue={defaults.guests || "2"} className={input} />
      </label>
      <button className="rounded-full bg-rose-500 px-8 py-3 font-semibold text-white hover:bg-rose-600">
        검색
      </button>
    </form>
  );
}
