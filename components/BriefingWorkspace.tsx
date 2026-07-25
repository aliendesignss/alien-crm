"use client";

import { FormEvent, useMemo, useState } from "react";
import { getServiceLabel, serviceModules } from "@/lib/briefing-config";
import type { Briefing } from "@/lib/types";

type BriefingForm = {
  cliente_nome: string;
  empresa: string;
  email: string;
  telefone: string;
  resumo: string;
};

const initialForm: BriefingForm = {
  cliente_nome: "",
  empresa: "",
  email: "",
  telefone: "",
  resumo: ""
};

export function BriefingWorkspace({ initialBriefings }: { initialBriefings: Briefing[] }) {
  const [form, setForm] = useState<BriefingForm>(initialForm);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [briefings, setBriefings] = useState<Briefing[]>(initialBriefings);
  const [activeBriefingId, setActiveBriefingId] = useState(initialBriefings[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const activeModules = useMemo(
    () => serviceModules.filter((service) => selectedServices.includes(service.id)),
    [selectedServices]
  );

  const activeBriefing = useMemo(
    () => briefings.find((briefing) => briefing.id === activeBriefingId) ?? briefings[0],
    [activeBriefingId, briefings]
  );

  function updateForm(field: keyof BriefingForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleService(serviceId: string) {
    setSelectedServices((current) =>
      current.includes(serviceId) ? current.filter((item) => item !== serviceId) : [...current, serviceId]
    );
  }

  function updateResponse(fieldId: string, value: string) {
    setResponses((current) => ({ ...current, [fieldId]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.cliente_nome.trim() || selectedServices.length === 0) {
      setError("Informe o cliente e selecione pelo menos um servico.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/briefings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          servicos: selectedServices,
          respostas: responses
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Nao foi possivel salvar o briefing.");
      }

      setBriefings((current) => [data.briefing, ...current]);
      setActiveBriefingId(data.briefing.id);
      setForm(initialForm);
      setSelectedServices([]);
      setResponses({});
      setSuccess("Briefing salvo e cliente atualizado no Hub.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Erro inesperado ao salvar briefing.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hub-workspace">
      <form className="hub-panel briefing-form" onSubmit={handleSubmit}>
        <div className="hub-panel-head">
          <span>Briefing modular</span>
          <strong>Novo briefing</strong>
        </div>

        <div className="form-grid">
          <label>
            Cliente *
            <input
              value={form.cliente_nome}
              onChange={(event) => updateForm("cliente_nome", event.target.value)}
              placeholder="Nome do cliente"
            />
          </label>
          <label>
            Empresa/marca
            <input
              value={form.empresa}
              onChange={(event) => updateForm("empresa", event.target.value)}
              placeholder="Marca do cliente"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateForm("email", event.target.value)}
              placeholder="cliente@email.com"
            />
          </label>
          <label>
            WhatsApp
            <input
              value={form.telefone}
              onChange={(event) => updateForm("telefone", event.target.value)}
              placeholder="+55 00 00000-0000"
            />
          </label>
          <label className="span-2">
            Resumo inicial
            <textarea
              value={form.resumo}
              onChange={(event) => updateForm("resumo", event.target.value)}
              placeholder="Contexto geral, urgencias, objetivo comercial ou observacoes importantes."
            />
          </label>
        </div>

        <div className="service-picker" aria-label="Selecionar servicos">
          {serviceModules.map((service) => (
            <button
              className={selectedServices.includes(service.id) ? "service-chip active" : "service-chip"}
              key={service.id}
              onClick={() => toggleService(service.id)}
              type="button"
            >
              <strong>{service.label}</strong>
              <span>{service.description}</span>
            </button>
          ))}
        </div>

        {activeModules.length > 0 ? (
          <div className="module-stack">
            {activeModules.map((service) => (
              <section className="briefing-module" key={service.id}>
                <div>
                  <span>{service.label}</span>
                  <strong>{service.description}</strong>
                </div>
                <div className="form-grid">
                  {service.fields.map((field) => (
                    <label className="span-2" key={field.id}>
                      {field.label}
                      <textarea
                        value={responses[field.id] ?? ""}
                        onChange={(event) => updateResponse(field.id, event.target.value)}
                        placeholder={field.placeholder}
                      />
                    </label>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {error ? <p className="form-error">{error}</p> : null}
        {success ? <p className="form-success">{success}</p> : null}

        <button className="button admin-submit" disabled={loading} type="submit">
          {loading ? "Salvando briefing..." : "Salvar Briefing"}
        </button>
      </form>

      <aside className="hub-panel briefing-viewer">
        <div className="hub-panel-head">
          <span>Visualizacao completa</span>
          <strong>{briefings.length} briefing(s)</strong>
        </div>

        <div className="briefing-list">
          {briefings.length === 0 ? (
            <p className="empty-state">Nenhum briefing salvo ainda.</p>
          ) : (
            briefings.map((briefing) => (
              <button
                className={briefing.id === activeBriefing?.id ? "briefing-row active" : "briefing-row"}
                key={briefing.id}
                onClick={() => setActiveBriefingId(briefing.id)}
                type="button"
              >
                <span>{briefing.status ?? "novo"}</span>
                <strong>{briefing.cliente_nome}</strong>
                <small>{briefing.servicos.map(getServiceLabel).join(", ")}</small>
              </button>
            ))
          )}
        </div>

        {activeBriefing ? (
          <article className="briefing-detail">
            <div>
              <span>Cliente</span>
              <strong>{activeBriefing.cliente_nome}</strong>
              <p>{[activeBriefing.empresa, activeBriefing.email, activeBriefing.telefone].filter(Boolean).join(" | ")}</p>
            </div>
            <div>
              <span>Servicos</span>
              <p>{activeBriefing.servicos.map(getServiceLabel).join(", ")}</p>
            </div>
            {activeBriefing.resumo ? (
              <div>
                <span>Resumo</span>
                <p>{activeBriefing.resumo}</p>
              </div>
            ) : null}
            <div>
              <span>Respostas</span>
              {Object.keys(activeBriefing.respostas ?? {}).length === 0 ? (
                <p>Nenhuma resposta detalhada registrada.</p>
              ) : (
                <dl className="answer-list">
                  {Object.entries(activeBriefing.respostas).map(([key, value]) => (
                    <div key={key}>
                      <dt>{key.replaceAll("_", " ")}</dt>
                      <dd>{value || "Sem resposta"}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </article>
        ) : null}
      </aside>
    </div>
  );
}
