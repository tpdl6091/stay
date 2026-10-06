import { LoginForm } from "@/components/AuthForm";
import { one } from "@/lib/stays";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const notice = one(sp.reason) === "booking" ? "예약하려면 로그인이 필요합니다." : undefined;
  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">로그인</h1>
      <LoginForm notice={notice} />
    </main>
  );
}
