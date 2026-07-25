import Link from "next/link";
import { getServiceLabel } from "@/lib/briefing-config";
import { getSupabase } from "@/lib/supabase";
import type { Briefing, Client } from "@/lib/types";

export const dynamic = "force-dynamic";

function formatDate(date?: string | null) {
  if (!date) {
    return "Sem data";
  }

  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

async function loadClients() {
  try {
    const supabase = getSupabase();
    const [clients, briefings] = await Promise.all([
      supabase.from("clientes").select("*").order("created_at", { ascending: false }),
      supabase.from("briefings").select("*").order("created_at", { ascending: false })
    ]);

    return {
      clients: (clients.data ?? []) as Client[],
      briefings: (briefings.data ?? []) as Briefing[],
      setupError: clients.error || briefings.error ? "Revise o schema de clientes e briefings no Supabase." : ""
    };
  } catch (error) {
    return {
      clients: [] as Client[],
      briefings: [] as Briefing[],
      setupError: error instanceof Error ? error.message : "Nao foi possivel carregar clientes."
    };
  }
}

export default async function ClientsPage() {
  const { clients, briefings, setupError } = await loadClients();

  return (
    <main className="hub-screen">
      <section className="hub-hero compact">
        <div>
          <div className="section-kicker">Clientes</div>
          <h1>Historico operacional por cliente.</h1>
          <p>
            Cada cliente nasce do primeiro briefing e concentra servicos, briefings e dados de contato para consulta
            rapida.
          </p>
        </div>
        <nav className="hub-actions" aria-label="Navegacao interna">
          <Link className="button ghost" href="/admin">
            Dashboard
          </Link>
          <Link className="button" href="/admin/briefings">
            Novo Briefing
          </Link>
        </nav>
      </section>

      {setupError ? <p className="setup-alert">{setupError}</p> : null}

      <section className="client-grid">
        {clients.length === 0 ? (
          <article className="hub-panel">
            <p className="empty-state">Nenhum cliente cadastrado ainda. Salve um briefing para criar o primeiro.</p>
          </article>
        ) : (
          clients.map((client) => {
            const clientBriefings = briefings.filter(
              (briefing) =>
                briefing.cliente_id === client.id ||
                briefing.email === client.email ||
                briefing.telefone === client.telefone
            );
            const services = Array.from(new Set(clientBriefings.flatMap((briefing) => briefing.servicos)));

            return (
              <article className="hub-panel client-card" key={client.id}>
                <div className="client-card-head">
                  <div>
                    <span>Cliente</span>
                    <h2>{client.nome}</h2>
                    <p>{client.empresa || "Sem empresa informada"}</p>
                  </div>
                  <strong>{clientBriefings.length} briefing(s)</strong>
                </div>

                <dl className="client-facts">
                  <div>
                    <dt>Email</dt>
                    <dd>{client.email || "Nao informado"}</dd>
                  </div>
                  <div>
                    <dt>WhatsApp</dt>
                    <dd>{client.telefone || "Nao informado"}</dd>
                  </div>
                  <div>
                    <dt>Cadastro</dt>
                    <dd>{formatDate(client.created_at)}</dd>
                  </div>
                </dl>

                <div className="client-history">
                  <span>Historico de servicos</span>
                  <p>{services.length > 0 ? services.map(getServiceLabel).join(", ") : "Nenhum servico registrado."}</p>
                </div>

                <div className="client-history">
                  <span>Historico de briefings</span>
                  {clientBriefings.length === 0 ? (
                    <p>Nenhum briefing vinculado.</p>
                  ) : (
                    <ul>
                      {clientBriefings.map((briefing) => (
                        <li key={briefing.id}>
                          <strong>{formatDate(briefing.created_at)}</strong>
                          <span>{briefing.servicos.map(getServiceLabel).join(", ")}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
