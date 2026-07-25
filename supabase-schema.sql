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

create table clientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  empresa text,
  email text,
  telefone text,
  origem text default 'briefing',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create unique index clientes_email_unique
on clientes (email)
where email is not null;

create unique index clientes_telefone_unique
on clientes (telefone)
where telefone is not null;

alter table clientes enable row level security;

create policy "Permitir leitura de clientes via anon"
on clientes for select
using (true);

create policy "Permitir criacao de clientes via anon"
on clientes for insert
with check (true);

create policy "Permitir atualizacao de clientes via anon"
on clientes for update
using (true)
with check (true);

create table briefings (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid references clientes(id) on delete set null,
  cliente_nome text not null,
  empresa text,
  email text,
  telefone text,
  servicos text[] not null default '{}',
  respostas jsonb not null default '{}'::jsonb,
  resumo text,
  status text default 'novo',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table briefings enable row level security;

create policy "Permitir leitura de briefings via anon"
on briefings for select
using (true);

create policy "Permitir criacao de briefings via anon"
on briefings for insert
with check (true);

create policy "Permitir atualizacao de briefings via anon"
on briefings for update
using (true)
with check (true);
