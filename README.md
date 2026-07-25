# Alien Hub

Centro operacional da Alien Designs em Next.js, com propostas comerciais, briefings modulares e cadastro automatico de clientes via Supabase.

## Estrutura

- `/admin`: dashboard operacional com indicadores, ultimos briefings, clientes e status dos projetos.
- `/admin/propostas`: gerador de propostas comerciais ja existente.
- `/admin/briefings`: formulario modular com selecao de multiplos servicos, modulos dinamicos e visualizacao completa.
- `/admin/clientes`: historico de clientes, servicos e briefings.
- `/proposta/[slug]`: pagina publica da proposta.
- `/api/propostas`: API para criar proposta e gerar slug unico.
- `/api/briefings`: API para listar e criar briefings, com cadastro automatico de cliente.
- `/api/clientes`: API para listar clientes.
- `components/ProposalTemplate.tsx`: template visual da proposta.
- `components/ExpiredProposal.tsx`: tela para propostas vencidas.
- `components/BriefingWorkspace.tsx`: interface do briefing modular.
- `lib/supabase.ts`: cliente Supabase usando variaveis publicas.
- `lib/slugify.ts`: utilitario para slug.
- `lib/briefing-config.ts`: configuracao dos servicos e campos dinamicos.
- `supabase-schema.sql`: schema das propostas, clientes e briefings.

## Instalacao

```bash
npm install
npm run dev
```

Acesse:

```txt
http://localhost:3000/admin
```

## Configurar Supabase

1. Crie um projeto no Supabase.
2. Abra o SQL Editor.
3. Execute o conteudo de `supabase-schema.sql`.
4. Copie `.env.example` para `.env.local`.
5. Preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
ADMIN_USER=alien
ADMIN_PASSWORD=troque-por-uma-senha-forte
```

Este projeto usa apenas a chave anon publica. Antes de producao real, revise as policies de insert/update conforme o fluxo escolhido.

## Protecao do Admin

A rota `/admin` e todos os submodulos administrativos sao protegidos por autenticacao HTTP Basic via `middleware.ts`.

No navegador, ao acessar `/admin`, informe:

- usuario: valor de `ADMIN_USER`
- senha: valor de `ADMIN_PASSWORD`

A pagina publica `/proposta/[slug]` continua aberta para envio aos clientes.

## Deploy na Vercel

1. Suba o projeto para um repositorio Git.
2. Importe o repositorio na Vercel.
3. Em `Settings > Environment Variables`, cadastre:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_USER`
   - `ADMIN_PASSWORD`
4. Rode o deploy.

## Configurar subdominio

1. Na Vercel, abra o projeto.
2. Va em `Settings > Domains`.
3. Adicione o subdominio, por exemplo:

```txt
propostas.aliendesigns.com.br
```

4. No provedor do dominio, crie o registro DNS indicado pela Vercel:
   - normalmente um `CNAME` apontando para `cname.vercel-dns.com`
5. Aguarde a propagacao e a emissao automatica do SSL.

## Roadmap

- Fase 1: dashboard, propostas preservadas, briefings modulares e clientes.
- Fase 2: busca global, filtros, tags, datas, upload de arquivos e observacoes internas.
- Fase 3: cronograma, revisoes, historico de alteracoes, responsaveis e checklist de entrega.
- Fase 4: financeiro por projeto, pagamentos, receita mensal e receita por servico.
- Fase 5: automacoes com IA para briefings, propostas, resumos e sugestoes estrategicas.
- Fase 6: portal do cliente com login, aprovacoes, downloads e solicitacao de revisoes.

## Proximos modulos previstos

- `/admin/propostas`: lista de propostas criadas.
- `/admin/propostas/[slug]/editar`: edicao de proposta.
- `/proposta/[slug]?preview=true`: visualizacao antes do envio.
