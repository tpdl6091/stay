import SearchBar from "@/components/SearchBar";
import StayCard from "@/components/StayCard";
import { stays } from "@/lib/stays";

export default function Home() {
  return (
    <main>
      <section className="bg-gradient-to-br from-rose-500 via-rose-400 to-orange-300 px-6 py-24 text-center text-white">
        <h1 className="text-4xl font-extrabold md:text-5xl">어디로 떠나시나요?</h1>
        <p className="mt-3 mb-10 text-lg text-white/90">SEISTAY에서 나에게 꼭 맞는 숙소를 찾아보세요.</p>
        <div className="mx-auto max-w-4xl">
          <SearchBar />
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <h2 className="mb-6 text-2xl font-bold">인기 숙소</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stays.slice(0, 4).map((s) => (
            <StayCard key={s.id} stay={s} />
          ))}
        </div>
      </section>
    </main>
  );
}
