import Image from "next/image";
import { notFound } from "next/navigation";

async function getGithubUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 300 },
  });

  console.log(response)

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Nao foi possivel carregar os dados do usuario no GitHub.");
  }

  const data = await response.json();

  console.log(data);

  return data

}

export async function generateMetadata({ params }) {
  const { username } = await params;

  return {
    title: `Usuario ${username}`,
    description: `Dados publicos do GitHub para o usuario ${username}`,
  };
}

export default async function UserPage({ params }) {
  const { username } = await params;
  const user = await getGithubUser(username);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12">
      <section className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
          GitHub
        </p>

        <div className="mt-6 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
          <Image
            src={user.avatar_url}
            alt={`Avatar de ${user.login}`}
            width={112}
            height={112}
            className="rounded-full ring-4 ring-slate-100"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-slate-900">
              Pagina do {user.login}
            </h1>
            <p className="mt-2 text-base text-slate-600">
              {user.name || "Nome nao informado"}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {user.bio || "Este usuario nao possui bio publica."}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-500">Repositorios</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {user.public_repos}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-500">Seguidores</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {user.followers}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-500">Seguindo</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {user.following}
            </p>
          </div>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Ver perfil no GitHub
        </a>
      </section>
    </main>
  );
}
