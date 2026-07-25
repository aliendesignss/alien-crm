import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

type BriefingBody = Record<string, unknown>;

function getStringValue(body: BriefingBody, field: string) {
  return String(body[field] ?? "").trim();
}

function getOptionalStringValue(body: BriefingBody, field: string) {
  const value = getStringValue(body, field);

  return value || null;
}

function getServices(body: BriefingBody) {
  if (!Array.isArray(body.servicos)) {
    return [];
  }

  return body.servicos.map((service) => String(service).trim()).filter(Boolean);
}

function getResponses(body: BriefingBody) {
  if (typeof body.respostas !== "object" || !body.respostas || Array.isArray(body.respostas)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(body.respostas).map(([key, value]) => [key, String(value ?? "").trim()])
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error && "message" in error) {
    return String(error.message);
  }

  return "Erro inesperado ao salvar briefing.";
}

async function findExistingClient(
  supabase: ReturnType<typeof getSupabase>,
  client: { nome: string; empresa: string | null; email: string | null; telefone: string | null }
) {
  if (client.email) {
    const { data } = await supabase.from("clientes").select("*").eq("email", client.email).maybeSingle();

    if (data) {
      return data;
    }
  }

  if (client.telefone) {
    const { data } = await supabase.from("clientes").select("*").eq("telefone", client.telefone).maybeSingle();

    if (data) {
      return data;
    }
  }

  let query = supabase.from("clientes").select("*").eq("nome", client.nome);

  if (client.empresa) {
    query = query.eq("empresa", client.empresa);
  }

  const { data } = await query.maybeSingle();

  return data;
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("briefings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
    }

    return NextResponse.json({ briefings: data ?? [] });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BriefingBody;
    const nome = getStringValue(body, "cliente_nome");
    const servicos = getServices(body);

    if (!nome || servicos.length === 0) {
      return NextResponse.json(
        { error: "Informe o cliente e selecione pelo menos um servico." },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const clientPayload = {
      nome,
      empresa: getOptionalStringValue(body, "empresa"),
      email: getOptionalStringValue(body, "email"),
      telefone: getOptionalStringValue(body, "telefone"),
      origem: "briefing",
      updated_at: new Date().toISOString()
    };

    const existingClient = await findExistingClient(supabase, clientPayload);
    let clientId = existingClient?.id as string | undefined;

    if (clientId) {
      const { error: updateError } = await supabase.from("clientes").update(clientPayload).eq("id", clientId);

      if (updateError) {
        return NextResponse.json({ error: getErrorMessage(updateError) }, { status: 500 });
      }
    } else {
      const { data: createdClient, error: clientError } = await supabase
        .from("clientes")
        .insert(clientPayload)
        .select("*")
        .single();

      if (clientError) {
        return NextResponse.json({ error: getErrorMessage(clientError) }, { status: 500 });
      }

      clientId = createdClient.id as string;
    }

    const briefingPayload = {
      cliente_id: clientId,
      cliente_nome: nome,
      empresa: clientPayload.empresa,
      email: clientPayload.email,
      telefone: clientPayload.telefone,
      servicos,
      respostas: getResponses(body),
      resumo: getOptionalStringValue(body, "resumo"),
      status: "novo",
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from("briefings").insert(briefingPayload).select("*").single();

    if (error) {
      return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
    }

    return NextResponse.json({ briefing: data });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
