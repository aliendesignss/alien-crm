import Link from "next/link";
import { BriefingWorkspace } from "@/components/BriefingWorkspace";
import { getSupabase } from "@/lib/supabase";
import type { Briefing } from "@/lib/types";

export const dynamic = "force-dynamic";

async function loadBriefings() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("briefings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { briefings: [] as Briefing[], setupError: "Revise o schema de briefings no Supabase." };
    }

    return { briefings: (data ?? []) as Briefing[], setupError: "" };
  } catch (error) {
    return {
      briefings: [] as Briefing[],
      setupError: error instanceof Error ? error.message : "Nao foi possivel carregar briefings."
    };
  }
}

export default async function BriefingsPage() {
  const { briefings, setupError } = await loadBriefings();

  return (
    <main className="hub-screen">
      <section className="hub-hero compact">
        <div>
          <div className="section-kicker">Briefings</div>
          <h1>Formulario modular de entrada.</h1>
          <p>
            Selecione multiplos servicos, preencha os modulos dinamicos e salve um briefing completo com cadastro
            automatico do cliente.
          </p>
        </div>
        <nav className="hub-actions" aria-label="Navegacao interna">
          <Link className="button ghost" href="/admin">
            Dashboard
          </Link>
          <Link className="button ghost" href="/admin/clientes">
            Clientes
          </Link>
        </nav>
      </section>

      {setupError ? <p className="setup-alert">{setupError}</p> : null}

      <BriefingWorkspace initialBriefings={briefings} />
    </main>
  );
}
