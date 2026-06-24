import { NextResponse } from "next/server";
import { slugify } from "@/lib/slugify";
import { getSupabase } from "@/lib/supabase";

const requiredFields = [
  "nome_cliente",
  "nicho",
  "data_proposta",
  "validade_proposta",
  "prazo_entrega",
  "investimento"
] as const;

const maxSlugAttempts = 20;

type ProposalBody = Record<string, unknown>;

function getStringValue(body: ProposalBody, field: string) {
  return String(body[field] ?? "").trim();
}

function getOptionalStringValue(body: ProposalBody, field: string) {
  const value = getStringValue(body, field);

  return value || null;
}

function createPayload(body: ProposalBody, slug: string) {
  return {
    slug,
    nome_cliente: getStringValue(body, "nome_cliente"),
    nome_empresa: getOptionalStringValue(body, "nome_empresa"),
    nicho: getStringValue(body, "nicho"),
    data_proposta: getStringValue(body, "data_proposta"),
    validade_proposta: getStringValue(body, "validade_proposta"),
    prazo_entrega: getStringValue(body, "prazo_entrega"),
    investimento: getStringValue(body, "investimento"),
    condicao_pagamento: getOptionalStringValue(body, "condicao_pagamento"),
    objetivo: getOptionalStringValue(body, "objetivo"),
    whatsapp_url: getOptionalStringValue(body, "whatsapp_url"),
    status: "ativa"
  };
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error && "message" in error) {
    return String(error.message);
  }

  return "Erro inesperado ao criar proposta.";
}

function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "23505";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProposalBody;
    const missing = requiredFields.filter((field) => !getStringValue(body, field));

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios.", fields: missing },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const baseSlug = slugify(getStringValue(body, "nome_cliente")) || "proposta";

    for (let attempt = 1; attempt <= maxSlugAttempts; attempt += 1) {
      const slug = attempt === 1 ? baseSlug : `${baseSlug}-${attempt}`;
      const payload = createPayload(body, slug);
      const { error } = await supabase.from("propostas").insert(payload);

      if (!error) {
        return NextResponse.json({ proposta: payload, slug });
      }

      if (!isUniqueViolation(error)) {
        return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
      }
    }

    return NextResponse.json(
      { error: "Não foi possível gerar um slug único para esta proposta." },
      { status: 409 }
    );
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
