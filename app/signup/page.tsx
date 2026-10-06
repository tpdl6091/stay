import { SignupForm } from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">회원가입</h1>
      <SignupForm />
    </main>
  );
}
