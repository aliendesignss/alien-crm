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
