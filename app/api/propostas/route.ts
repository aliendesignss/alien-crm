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

async function createAvailableSlug(nomeCliente: string) {
  const supabase = getSupabase();
  const baseSlug = slugify(nomeCliente) || "proposta";
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const { data, error } = await supabase.from("propostas").select("slug").eq("slug", candidate).maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const missing = requiredFields.filter((field) => !String(body[field] ?? "").trim());

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatorios.", fields: missing },
        { status: 400 }
      );
    }

    const slug = await createAvailableSlug(body.nome_cliente);
    const supabase = getSupabase();

    const payload = {
      slug,
      nome_cliente: body.nome_cliente,
      nome_empresa: body.nome_empresa || null,
      nicho: body.nicho,
      data_proposta: body.data_proposta,
      validade_proposta: body.validade_proposta,
      prazo_entrega: body.prazo_entrega,
      investimento: body.investimento,
      condicao_pagamento: body.condicao_pagamento || null,
      objetivo: body.objetivo || null,
      whatsapp_url: body.whatsapp_url || null
    };

    const { data, error } = await supabase.from("propostas").insert(payload).select("*").single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ proposta: data, slug });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado ao criar proposta.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
