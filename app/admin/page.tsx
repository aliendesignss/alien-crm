import Link from "next/link";
import { getServiceLabel } from "@/lib/briefing-config";
import { getSupabase } from "@/lib/supabase";
import type { Briefing, Client, Proposal } from "@/lib/types";

export const dynamic = "force-dynamic";

type ProposalRecord = Proposal & { created_at?: string | null };

function formatDate(date?: string | null) {
  if (!date) {
    return "Sem data";
  }

  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

async function loadHubData() {
  try {
    const supabase = getSupabase();
    const [proposals, briefings, clients] = await Promise.all([
      supabase.from("propostas").select("*").order("created_at", { ascending: false }).limit(6),
      supabase.from("briefings").select("*").order("created_at", { ascending: false }).limit(6),
      supabase.from("clientes").select("*").order("created_at", { ascending: false }).limit(6)
    ]);

    return {
      proposals: (proposals.data ?? []) as ProposalRecord[],
      briefings: (briefings.data ?? []) as Briefing[],
      clients: (clients.data ?? []) as Client[],
      setupError: proposals.error || briefings.error || clients.error ? "Revise o schema do Supabase da Fase 1." : ""
    };
  } catch (error) {
    return {
      proposals: [] as ProposalRecord[],
      briefings: [] as Briefing[],
      clients: [] as Client[],
      setupError: error instanceof Error ? error.message : "Nao foi possivel carregar o Hub."
    };
  }
}

export default async function AdminPage() {
  const { proposals, briefings, clients, setupError } = await loadHubData();
  const activeProjects = briefings.filter((briefing) => briefing.status !== "finalizado").length;

  return (
    <main className="hub-screen">
      <section className="hub-hero">
        <div>
          <div className="section-kicker">Alien Hub</div>
          <h1>Centro operacional da Alien Designs.</h1>
          <p>
            Base do MVP para acompanhar indicadores, briefings, clientes e o status dos projetos sem alterar o modulo
            de propostas comerciais.
          </p>
        </div>
        <nav className="hub-actions" aria-label="Modulos do Alien Hub">
          <Link className="button" href="/admin/briefings">
            Novo Briefing
          </Link>
          <Link className="button ghost" href="/admin/propostas">
            Propostas
          </Link>
          <Link className="button ghost" href="/admin/clientes">
            Clientes
          </Link>
        </nav>
      </section>

      {setupError ? <p className="setup-alert">{setupError}</p> : null}

      <section className="hub-metrics" aria-label="Indicadores gerais">
        <article>
          <span>Briefings</span>
          <strong>{briefings.length}</strong>
          <p>Ultimos registros operacionais</p>
        </article>
        <article>
          <span>Clientes</span>
          <strong>{clients.length}</strong>
          <p>Cadastro criado pelo primeiro briefing</p>
        </article>
        <article>
          <span>Propostas</span>
          <strong>{proposals.length}</strong>
          <p>Modulo preservado e ativo</p>
        </article>
        <article>
          <span>Projetos ativos</span>
          <strong>{activeProjects}</strong>
          <p>Status inicial do pipeline</p>
        </article>
      </section>

      <section className="hub-grid">
        <article className="hub-panel">
          <div className="hub-panel-head">
            <span>Ultimos briefings</span>
            <Link href="/admin/briefings">Ver todos</Link>
          </div>
          <div className="hub-list">
            {briefings.length === 0 ? (
              <p className="empty-state">Nenhum briefing salvo ainda.</p>
            ) : (
              briefings.map((briefing) => (
                <div className="hub-list-row" key={briefing.id}>
                  <div>
                    <strong>{briefing.cliente_nome}</strong>
                    <p>{briefing.servicos.map(getServiceLabel).join(", ")}</p>
                  </div>
                  <span>{formatDate(briefing.created_at)}</span>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="hub-panel">
          <div className="hub-panel-head">
            <span>Status dos projetos</span>
            <strong>Pipeline MVP</strong>
          </div>
          <div className="status-stack">
            {briefings.length === 0 ? (
              <p className="empty-state">Os projetos aparecem aqui depois do primeiro briefing.</p>
            ) : (
              briefings.map((briefing) => (
                <div className="status-item" key={briefing.id}>
                  <span>{briefing.status ?? "novo"}</span>
                  <strong>{briefing.cliente_nome}</strong>
                  <p>{briefing.servicos.map(getServiceLabel).join(", ")}</p>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="hub-panel">
          <div className="hub-panel-head">
            <span>Clientes recentes</span>
            <Link href="/admin/clientes">Historico</Link>
          </div>
          <div className="hub-list">
            {clients.length === 0 ? (
              <p className="empty-state">Clientes serao cadastrados automaticamente pelos briefings.</p>
            ) : (
              clients.map((client) => (
                <div className="hub-list-row" key={client.id}>
                  <div>
                    <strong>{client.nome}</strong>
                    <p>{client.empresa || client.email || "Sem complemento"}</p>
                  </div>
                  <span>{formatDate(client.created_at)}</span>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="hub-panel">
          <div className="hub-panel-head">
            <span>Propostas comerciais</span>
            <Link href="/admin/propostas">Gerar</Link>
          </div>
          <div className="hub-list">
            {proposals.length === 0 ? (
              <p className="empty-state">Nenhuma proposta encontrada.</p>
            ) : (
              proposals.map((proposal) => (
                <div className="hub-list-row" key={proposal.slug}>
                  <div>
                    <strong>{proposal.nome_cliente}</strong>
                    <p>{proposal.nicho}</p>
                  </div>
                  <span>{proposal.status ?? "ativa"}</span>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
