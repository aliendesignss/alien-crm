# Alien Designs Propostas

Mini plataforma web em Next.js para gerar propostas comerciais de Landing Pages com Supabase e deploy na Vercel.

## Estrutura

- `/admin`: central interna para preencher dados e gerar proposta.
- `/proposta/[slug]`: pagina publica da proposta.
- `/api/propostas`: API para criar proposta e gerar slug unico.
- `components/ProposalTemplate.tsx`: template visual da proposta.
- `components/ExpiredProposal.tsx`: tela para propostas vencidas.
- `lib/supabase.ts`: cliente Supabase usando variaveis publicas.
- `lib/slugify.ts`: utilitario para slug.
- `supabase-schema.sql`: schema inicial da tabela.

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
```

Este projeto usa apenas a chave anon publica. Antes de producao real, proteja `/admin` com autenticacao e revise as policies de insert conforme o fluxo escolhido.

## Deploy na Vercel

1. Suba o projeto para um repositorio Git.
2. Importe o repositorio na Vercel.
3. Em `Settings > Environment Variables`, cadastre:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
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

## Proximos modulos previstos

- `/admin/propostas`: lista de propostas criadas.
- `/admin/propostas/[slug]/editar`: edicao de proposta.
- `/admin/briefings`: briefing automatico.
- `/proposta/[slug]?preview=true`: visualizacao antes do envio.
