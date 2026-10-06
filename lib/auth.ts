// 데모용 인증: 계정과 로그인 상태를 브라우저 localStorage에 저장한다.
// 서버가 없으므로 실제 서비스용 보안 수준이 아니다.

export type User = { name: string; email: string };
type StoredUser = User & { passwordHash: string };

const USERS_KEY = "seistay.users";
const SESSION_KEY = "seistay.session";
const EVENT = "seistay-auth";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function hash(password: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function getUser(): User | null {
  return read<User | null>(SESSION_KEY, null);
}

export async function signUp(name: string, email: string, password: string) {
  const users = read<StoredUser[]>(USERS_KEY, []);
  const key = email.trim().toLowerCase();
  if (users.some((u) => u.email === key)) throw new Error("이미 가입된 이메일입니다.");
  users.push({ name: name.trim(), email: key, passwordHash: await hash(password) });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function signIn(email: string, password: string) {
  const users = read<StoredUser[]>(USERS_KEY, []);
  const key = email.trim().toLowerCase();
  const found = users.find((u) => u.email === key);
  if (!found || found.passwordHash !== (await hash(password))) {
    throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name: found.name, email: found.email }));
  window.dispatchEvent(new Event(EVENT));
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(EVENT));
}

export function onAuthChange(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
