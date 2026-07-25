"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormState = {
  nome_cliente: string;
  nome_empresa: string;
  nicho: string;
  validade_proposta: string;
  data_proposta: string;
  prazo_entrega: string;
  investimento: string;
  condicao_pagamento: string;
  objetivo: string;
  whatsapp_url: string;
};

const initialState: FormState = {
  nome_cliente: "",
  nome_empresa: "",
  nicho: "",
  validade_proposta: "",
  data_proposta: new Date().toISOString().slice(0, 10),
  prazo_entrega: "5 dias uteis",
  investimento: "",
  condicao_pagamento: "50% para iniciar e 50% na entrega",
  objetivo: "",
  whatsapp_url: ""
};

const requiredFields: Array<keyof FormState> = [
  "nome_cliente",
  "nicho",
  "validade_proposta",
  "data_proposta",
  "prazo_entrega",
  "investimento"
];

export default function ProposalsAdminPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const missingFields = useMemo(
    () => requiredFields.filter((field) => !form[field].trim()),
    [form]
  );

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (missingFields.length > 0) {
      setError("Preencha os campos obrigatorios antes de gerar a proposta.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/propostas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Nao foi possivel criar a proposta.");
      }

      router.push(`/proposta/${data.slug}`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Erro inesperado ao gerar proposta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-screen">
      <section className="admin-shell">
        <aside className="admin-briefing">
          <div className="section-kicker">Propostas comerciais</div>
          <h1>Comando de propostas Alien Designs.</h1>
          <p>
            Preencha os dados da rota comercial e gere uma proposta publica com o mesmo DNA visual das Landing Pages da
            Alien.
          </p>
          <div className="mission-strip">
            <span>Status</span>
            <strong>Modulo Landing Page ativo</strong>
          </div>
          <div className="mission-grid">
            <article>
              <span>01</span>
              <b>Dados</b>
            </article>
            <article>
              <span>02</span>
              <b>Slug</b>
            </article>
            <article>
              <span>03</span>
              <b>Proposta</b>
            </article>
          </div>
          <Link className="button ghost hub-back-link" href="/admin">
            Voltar ao Hub
          </Link>
        </aside>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-head">
            <span>Gerador de proposta</span>
            <strong>Landing Page Premium</strong>
          </div>

          <div className="form-grid">
            <label>
              Nome do cliente *
              <input
                value={form.nome_cliente}
                onChange={(event) => updateField("nome_cliente", event.target.value)}
                placeholder="Maria Eduarda"
              />
            </label>
            <label>
              Nome da empresa/marca
              <input
                value={form.nome_empresa}
                onChange={(event) => updateField("nome_empresa", event.target.value)}
                placeholder="Marca da cliente"
              />
            </label>
            <label>
              Nicho *
              <input
                value={form.nicho}
                onChange={(event) => updateField("nicho", event.target.value)}
                placeholder="Estetica, arquitetura, infoproduto..."
              />
            </label>
            <label>
              Data da proposta *
              <input
                type="date"
                value={form.data_proposta}
                onChange={(event) => updateField("data_proposta", event.target.value)}
              />
            </label>
            <label>
              Validade da proposta *
              <input
                type="date"
                value={form.validade_proposta}
                onChange={(event) => updateField("validade_proposta", event.target.value)}
              />
            </label>
            <label>
              Prazo de entrega *
              <input
                value={form.prazo_entrega}
                onChange={(event) => updateField("prazo_entrega", event.target.value)}
                placeholder="5 dias uteis"
              />
            </label>
            <label>
              Investimento *
              <input
                value={form.investimento}
                onChange={(event) => updateField("investimento", event.target.value)}
                placeholder="R$ 1.497,00"
              />
            </label>
            <label>
              Condicao de pagamento
              <input
                value={form.condicao_pagamento}
                onChange={(event) => updateField("condicao_pagamento", event.target.value)}
                placeholder="50% no inicio e 50% na entrega"
              />
            </label>
            <label className="span-2">
              Objetivo da Landing Page
              <textarea
                value={form.objetivo}
                onChange={(event) => updateField("objetivo", event.target.value)}
                placeholder="Captar leads qualificados pelo WhatsApp para vender..."
              />
            </label>
            <label className="span-2">
              WhatsApp URL
              <input
                value={form.whatsapp_url}
                onChange={(event) => updateField("whatsapp_url", event.target.value)}
                placeholder="https://wa.me/55..."
              />
            </label>
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="button admin-submit" disabled={loading} type="submit">
            {loading ? "Gerando rota..." : "Gerar Proposta"}
          </button>
        </form>
      </section>
    </main>
  );
}
