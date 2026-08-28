import { useCallback, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/** Garante que existe uma linha em `profiles` para o utilizador autenticado. */
export async function ensureProfile(user: User) {
  const { data } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
  if (data) return;
  await supabase.from("profiles").insert({
    id: user.id,
    email: user.email ?? "",
    role: "formando",
  });
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
      if (next?.user) void ensureProfile(next.user);
    });
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { session, user: session?.user ?? null, loading, signOut };
}

export function authErrorMessage(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email ou password incorretos.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Já existe uma conta com este email. Tente entrar.";
  if (m.includes("password should be at least"))
    return "A password tem de ter, no mínimo, 6 caracteres.";
  if (m.includes("invalid email") || m.includes("unable to validate email"))
    return "O endereço de email não é válido.";
  if (m.includes("email not confirmed"))
    return "Confirme o seu email antes de entrar (verifique a caixa de correio).";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Demasiadas tentativas. Aguarde um momento e tente novamente.";
  return message;
}
