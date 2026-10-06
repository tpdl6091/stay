export type Stay = {
  id: string;
  name: string;
  city: string;
  type: "호텔" | "펜션" | "리조트" | "게스트하우스";
  price: number;
  rating: number;
  reviews: number;
  maxGuests: number;
  amenities: string[];
  description: string;
  gradient: string;
};

export const stays: Stay[] = [
  {
    id: "1",
    name: "해운대 오션뷰 호텔",
    city: "부산",
    type: "호텔",
    price: 180000,
    rating: 4.8,
    reviews: 342,
    maxGuests: 3,
    amenities: ["와이파이", "조식", "수영장", "주차"],
    description: "해운대 해변이 한눈에 보이는 객실에서 여유로운 휴식을 즐겨보세요.",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    id: "2",
    name: "제주 돌담 펜션",
    city: "제주",
    type: "펜션",
    price: 120000,
    rating: 4.7,
    reviews: 158,
    maxGuests: 6,
    amenities: ["와이파이", "바비큐", "주차", "주방"],
    description: "제주 전통 돌담과 정원이 어우러진 독채 펜션입니다.",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    id: "3",
    name: "강남 시티 호텔",
    city: "서울",
    type: "호텔",
    price: 210000,
    rating: 4.6,
    reviews: 521,
    maxGuests: 2,
    amenities: ["와이파이", "조식", "피트니스", "주차"],
    description: "강남역 도보 5분, 비즈니스와 관광 모두에 편리한 위치입니다.",
    gradient: "from-slate-500 to-slate-800",
  },
  {
    id: "4",
    name: "경주 한옥 스테이",
    city: "경주",
    type: "게스트하우스",
    price: 95000,
    rating: 4.9,
    reviews: 207,
    maxGuests: 4,
    amenities: ["와이파이", "조식", "온돌"],
    description: "고즈넉한 한옥에서 전통의 멋과 따뜻한 온돌을 경험하세요.",
    gradient: "from-amber-400 to-orange-600",
  },
  {
    id: "5",
    name: "강릉 바다 리조트",
    city: "강릉",
    type: "리조트",
    price: 260000,
    rating: 4.7,
    reviews: 389,
    maxGuests: 5,
    amenities: ["와이파이", "수영장", "스파", "주차", "조식"],
    description: "동해 바다를 품은 프리미엄 리조트, 가족 여행에 안성맞춤입니다.",
    gradient: "from-cyan-400 to-indigo-600",
  },
  {
    id: "6",
    name: "서울 홍대 게스트하우스",
    city: "서울",
    type: "게스트하우스",
    price: 55000,
    rating: 4.3,
    reviews: 640,
    maxGuests: 2,
    amenities: ["와이파이", "공용주방"],
    description: "홍대 거리 중심의 합리적인 가격, 감각적인 공간입니다.",
    gradient: "from-pink-400 to-rose-600",
  },
  {
    id: "7",
    name: "여수 밤바다 호텔",
    city: "여수",
    type: "호텔",
    price: 140000,
    rating: 4.5,
    reviews: 176,
    maxGuests: 3,
    amenities: ["와이파이", "조식", "주차"],
    description: "여수 밤바다 야경이 펼쳐지는 객실을 만나보세요.",
    gradient: "from-violet-400 to-purple-700",
  },
  {
    id: "8",
    name: "제주 애월 리조트",
    city: "제주",
    type: "리조트",
    price: 320000,
    rating: 4.9,
    reviews: 298,
    maxGuests: 6,
    amenities: ["와이파이", "수영장", "스파", "주차", "바비큐"],
    description: "애월 해안도로 앞 프라이빗 풀빌라 리조트입니다.",
    gradient: "from-lime-400 to-green-700",
  },
];

export const getStay = (id: string) => stays.find((s) => s.id === id);
export const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;
export const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export function nightsBetween(checkin?: string, checkout?: string) {
  if (!checkin || !checkout) return 1;
  const d = (new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000;
  return Number.isFinite(d) && d >= 1 ? Math.round(d) : 1;
}
