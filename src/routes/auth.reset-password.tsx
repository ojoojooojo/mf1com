import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { authErrorMessage } from "@/lib/auth";
import { MODULE_CODE, MODULE_TITLE } from "@/lib/course-data";

export const Route = createFileRoute("/auth/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Definir nova password — MF1 Comunicação e Escuta Ativa" },
      {
        name: "description",
        content: "Defina uma nova password para a sua conta do MOOC MF1.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function readUrlError(): string | null {
  if (typeof window === "undefined") return null;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const query = new URLSearchParams(window.location.search);
  const description =
    hash.get("error_description") ?? query.get("error_description") ?? hash.get("error") ?? query.get("error");
  return description ? authErrorMessage(description.replace(/\+/g, " ")) : null;
}

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const fromUrl = readUrlError();
    if (fromUrl) {
      setUrlError(fromUrl);
      return;
    }
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (session && event === "SIGNED_IN")) {
        setReady(true);
      }
    });
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => {
      navigate({ to: "/blocos/$blocoId", params: { blocoId: "1" }, replace: true });
    }, 1600);
    return () => clearTimeout(timer);
  }, [done, navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("A password tem de ter, no mínimo, 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("As duas passwords não coincidem.");
      return;
    }
    setBusy(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(authErrorMessage(updateError.message));
        return;
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? authErrorMessage(err.message) : "Ocorreu um erro inesperado.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <p className="eyebrow">{MODULE_CODE} · Formação de Formadores</p>
      <h1 className="mt-2 font-display text-3xl leading-tight">Definir nova password</h1>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        {urlError ? (
          <>
            <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              Este link de recuperação é inválido ou já expirou ({urlError}).
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              <Link to="/auth" className="font-medium text-primary underline-offset-4 hover:underline">
                Voltar e pedir um novo link de recuperação
              </Link>
            </p>
          </>
        ) : done ? (
          <p className="rounded-lg bg-primary-soft px-3 py-2 text-sm text-foreground">
            Password atualizada com sucesso. A encaminhar para o curso…
          </p>
        ) : !ready ? (
          <p className="text-sm text-muted-foreground">A validar o link de recuperação…</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nova-password" className="block text-sm font-medium">
                Nova password
              </label>
              <input
                id="nova-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmar-password" className="block text-sm font-medium">
                Repetir a nova password
              </label>
              <input
                id="confirmar-password"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Repita a password"
                required
              />
            </div>

            {error ? (
              <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : <KeyRound className="size-4" />}
              Guardar nova password
            </button>
          </form>
        )}
      </div>

      {!urlError && !done ? (
        <p className="mt-4 text-sm text-muted-foreground">
          <Link to="/auth" className="font-medium text-primary underline-offset-4 hover:underline">
            Voltar ao início de sessão
          </Link>
        </p>
      ) : null}
      <p className="mt-2 text-xs text-muted-foreground">{MODULE_TITLE}</p>
    </div>
  );
}
