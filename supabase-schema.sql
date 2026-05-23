create table propostas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nome_cliente text not null,
  nome_empresa text,
  nicho text not null,
  data_proposta date not null,
  validade_proposta date not null,
  prazo_entrega text not null,
  investimento text not null,
  condicao_pagamento text,
  objetivo text,
  whatsapp_url text,
  status text default 'ativa',
  created_at timestamp with time zone default now()
);

alter table propostas enable row level security;

create policy "Permitir leitura publica de propostas ativas"
on propostas for select
using (status = 'ativa');

create policy "Permitir criacao via anon"
on propostas for insert
with check (true);
