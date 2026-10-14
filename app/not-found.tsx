import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-[1.7em] text-center">
      <h1 className="m-0 font-serif text-[min(28vw,30vh)] font-normal leading-none tracking-[-0.02em]">404</h1>
      <p className="m-0">
        There is nothing at this address. <Link href="/">Back home</Link>.
      </p>
    </main>
  );
}
