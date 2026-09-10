import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { authErrorMessage, ensureProfile, useAuth } from "@/lib/auth";
import { MODULE_CODE, MODULE_TITLE } from "@/lib/course-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    const value = search["redirect"];
    return typeof value === "string" ? { redirect: value } : {};
  },

  head: () => ({
    meta: [
      { title: "Entrar ou criar conta — MF1 Comunicação e Escuta Ativa" },
      {
        name: "description",
        content:
          "Acesso ao MOOC MF1 — Comunicação e Escuta Ativa na Formação: entre na sua conta ou registe-se para guardar o seu progresso.",
      },
      { property: "og:title", content: "Entrar no MOOC MF1 — Comunicação e Escuta Ativa" },
      {
        property: "og:description",
        content: "Entre ou crie conta para acompanhar o seu percurso no módulo MF1.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

type Mode = "entrar" | "criar" | "recuperar";

function safePath(value: string | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/blocos/1";
  if (value.startsWith("/auth")) return "/blocos/1";
  return value;
}

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading: sessionLoading } = useAuth();
  const [mode, setMode] = useState<Mode>("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const destination = safePath(redirect);

  useEffect(() => {
    if (user) navigate({ to: destination, replace: true });
  }, [user, destination, navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Introduza um endereço de email válido.");
      return;
    }

    if (mode === "recuperar") {
      setBusy(true);
      try {
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        // Mensagem neutra: não confirmamos nem negamos a existência da conta.
        setNotice(
          "Se existir uma conta com este email, foi enviado um link de recuperação. Verifique a sua caixa de correio.",
        );
      } finally {
        setBusy(false);
      }
      return;
    }

    if (password.length < 6) {
      setError("A password tem de ter, no mínimo, 6 caracteres.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "criar") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (signUpError) {
          setError(authErrorMessage(signUpError.message));
          return;
        }
        if (data.session?.user) {
          await ensureProfile(data.session.user);
          return; // o efeito acima encaminha para o percurso
        }
        setNotice(
          "Conta criada. Enviámos-lhe um email de confirmação — confirme o endereço e volte aqui para entrar.",
        );
        setMode("entrar");
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) {
          setError(authErrorMessage(signInError.message));
          return;
        }
        if (data.user) await ensureProfile(data.user);
      }
    } catch (err) {
      setError(err instanceof Error ? authErrorMessage(err.message) : "Ocorreu um erro inesperado.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <p className="eyebrow">{MODULE_CODE} · Formação de Formadores</p>
      <h1 className="mt-2 font-display text-3xl leading-tight">{MODULE_TITLE}</h1>
      <p className="mt-3 text-muted-foreground">
        Para percorrer os blocos e as atividades precisa de uma conta — é assim que o seu progresso
        e as suas respostas ficam guardados.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex rounded-lg border border-border p-1">
          {(["entrar", "criar"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError(null);
                setNotice(null);
              }}
              className={cn(
                "flex-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                mode === m
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m === "entrar" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="nome@exemplo.pt"
              required
            />
          </div>
          {mode !== "recuperar" ? (
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete={mode === "criar" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Indique o email da sua conta e enviaremos um link para definir uma nova password.
            </p>
          )}

          {mode === "entrar" ? (
            <div className="-mt-2 text-right">
              <button
                type="button"
                onClick={() => {
                  setMode("recuperar");
                  setError(null);
                  setNotice(null);
                }}
                className="text-xs font-medium text-primary underline-offset-4 hover:underline"
              >
                Esqueci-me da password
              </button>
            </div>
          ) : null}

          {mode === "recuperar" ? (
            <div className="-mt-2 text-right">
              <button
                type="button"
                onClick={() => {
                  setMode("entrar");
                  setError(null);
                  setNotice(null);
                }}
                className="text-xs font-medium text-primary underline-offset-4 hover:underline"
              >
                Voltar ao início de sessão
              </button>
            </div>
          ) : null}

          {error ? (
            <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
          {notice ? (
            <p className="rounded-lg bg-primary-soft px-3 py-2 text-sm text-foreground">{notice}</p>
          ) : null}

          <button
            type="submit"
            disabled={busy || sessionLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : mode === "criar" ? (
              <UserPlus className="size-4" />
            ) : (
              <LogIn className="size-4" />
            )}
            {mode === "criar"
              ? "Criar conta e começar"
              : mode === "recuperar"
                ? "Enviar link de recuperação"
                : "Entrar"}
          </button>
        </form>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        <Link to="/" className="font-medium text-primary underline-offset-4 hover:underline">
          Voltar à apresentação do módulo
        </Link>
      </p>
    </div>
  );
}
