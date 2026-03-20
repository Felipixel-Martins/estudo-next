import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <section className="w-full max-w-xl rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
          Erro 404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">
          Pagina nao encontrada
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          A rota que voce tentou acessar nao existe neste projeto.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Voltar para a pagina inicial
        </Link>
      </section>
    </main>
  );
}
