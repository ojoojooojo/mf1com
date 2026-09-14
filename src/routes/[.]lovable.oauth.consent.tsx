import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type OAuthNamespace = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: Error | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: Error | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: Error | null }>;
};

type AuthorizationDetails = {
  client?: { name?: string } | null;
  redirect_url?: string;
  redirect_to?: string;
};

function oauth(): OAuthNamespace {
  return (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s["authorization_id"] === "string" ? s["authorization_id"] : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Falta o identificador de autorização.");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/mf1/auth", search: { redirect: next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="mx-auto max-w-md py-10">
      <h1 className="font-display text-2xl">Não foi possível carregar este pedido</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {String((error as Error)?.message ?? error)}
      </p>
    </main>
  ),
  head: () => ({
    meta: [
      { title: "Autorizar acesso — Gestão de Conflitos na Formação" },
      {
        name: "description",
        content: "Autorize ou recuse o acesso de uma aplicação externa à sua conta desta formação.",
      },
      { property: "og:title", content: "Autorizar acesso à sua conta" },
      { property: "og:description", content: "Confirmação de acesso de uma aplicação externa." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "uma aplicação externa";

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error: opError } = approve
      ? await oauth().approveAuthorization(authorization_id)
      : await oauth().denyAuthorization(authorization_id);
    if (opError) {
      setBusy(false);
      setError(opError.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("O servidor de autorização não devolveu um endereço de retorno.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="mx-auto max-w-md py-6">
      <p className="eyebrow flex items-center gap-2">
        <ShieldCheck className="size-4" /> Autorização de acesso
      </p>
      <h1 className="mt-2 font-display text-2xl leading-tight">Ligar {clientName} à sua conta</h1>
      <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">
        Ao autorizar, {clientName} passa a poder consultar, em seu nome, o seu percurso nesta
        formação (progresso, respostas aos quizzes e produções escritas). Pode recusar sem qualquer
        consequência.
      </p>
      {error ? (
        <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={() => decide(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : null}
          Autorizar
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => decide(false)}
          className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-accent disabled:opacity-60"
        >
          Recusar
        </button>
      </div>
    </main>
  );
}
