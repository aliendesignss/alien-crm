export type Proposal = {
  slug: string;
  nome_cliente: string;
  nome_empresa?: string | null;
  nicho: string;
  data_proposta: string;
  validade_proposta: string;
  prazo_entrega: string;
  investimento: string;
  condicao_pagamento?: string | null;
  objetivo?: string | null;
  whatsapp_url?: string | null;
  status?: string | null;
};

export type Client = {
  id: string;
  nome: string;
  empresa?: string | null;
  email?: string | null;
  telefone?: string | null;
  origem?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type Briefing = {
  id: string;
  cliente_id?: string | null;
  cliente_nome: string;
  empresa?: string | null;
  email?: string | null;
  telefone?: string | null;
  servicos: string[];
  respostas: Record<string, string>;
  resumo?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};
