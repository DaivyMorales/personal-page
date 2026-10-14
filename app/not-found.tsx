import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <main className="column">
        <h1 className="m-0 text-sm/[20.5px] font-[550]">
          Not found <span className="font-[450] text-muted">· 404</span>
        </h1>
        <p className="mt-5">
          There is nothing at this address. <em>Perhaps</em> it moved.
        </p>
        <Link href="/" className="u">Back home</Link>
      </main>
    </div>
  );
}
