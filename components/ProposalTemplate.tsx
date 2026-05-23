import type { CSSProperties } from "react";
import type { Proposal } from "@/lib/types";

const portfolioRows = [
  [
    ["Captura de tela 2026-05-22 215537_resultado.webp", "Brand Growth", "Autoridade visual"],
    ["Captura de tela 2026-05-22 215628_resultado.webp", "Pagina de conversao", "Oferta clara"],
    ["Captura de tela 2026-05-22 215654_resultado.webp", "Experiencia premium", "Confianca"],
    ["Captura de tela 2026-05-22 215755_resultado.webp", "Campanha digital", "Acao direta"],
    ["Captura de tela 2026-05-22 215822_resultado.webp", "Landing estrategica", "Captacao"],
    ["Captura de tela 2026-05-22 215845_resultado.webp", "Rota comercial", "WhatsApp"]
  ],
  [
    ["Captura de tela 2026-05-22 215909_resultado.webp", "Presenca digital", "Percepcao premium"],
    ["Captura de tela 2026-05-22 220007_resultado.webp", "Pagina de impacto", "Decisao simples"],
    ["CARROSSEL 04.webp", "Layout de campanha", "Destaque visual"],
    ["CARROSSEL 05.webp", "Narrativa de oferta", "Fluxo objetivo"],
    ["CARROSSEL 08.webp", "Direcao criativa", "Conversao"]
  ]
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

function PortfolioTrack({ row, reverse = false }: { row: string[][]; reverse?: boolean }) {
  const items = [...row, ...row];

  return (
    <div className={`marquee-row${reverse ? " reverse" : ""}`}>
      <div className="marquee-track">
        {items.map(([file, title, result], index) => {
          const src = `/rotas-criativas/${file}`;

          return (
            <figure className="portfolio-card" aria-hidden={index >= row.length} key={`${file}-${index}`}>
              <div className="mockup" style={{ "--shot": `url("${src}")` } as CSSProperties}>
                <img src={src} alt={`Print de landing page - ${title}`} loading="lazy" />
              </div>
              <figcaption className="portfolio-caption">
                <strong>{title}</strong>
                <span>{result}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export function ProposalTemplate({ proposal }: { proposal: Proposal }) {
  const whatsappUrl = proposal.whatsapp_url || "#aceite";
  const empresa = proposal.nome_empresa || proposal.nome_cliente;
  const objetivo =
    proposal.objetivo ||
    `gerar uma presenca digital mais forte para ${empresa}, com uma pagina clara, desejavel e pronta para levar o visitante ate a conversa.`;
  const condicao = proposal.condicao_pagamento || "Condicao de pagamento a combinar no aceite da proposta.";

  return (
    <>
      <header className="site-header">
        <nav className="nav wrap" aria-label="Navegacao principal">
          <a className="logo" href="#topo">
            Alien Designs
          </a>
          <div className="nav-links" aria-label="Links internos">
            <a href="#visao">Visao</a>
            <a href="#escopo">Escopo</a>
            <a href="#processo">Processo</a>
            <a href="#investimento">Investimento</a>
            <a href="#aceite">Aceite</a>
          </div>
          <a className="button small" href={whatsappUrl}>
            Aprovar proposta
          </a>
        </nav>
      </header>

      <main id="topo">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content wrap">
            <div className="eyebrow">Proposta comercial | Landing Page Premium</div>
            <p className="hero-greeting">Ola, {proposal.nome_cliente}.</p>
            <h1 id="hero-title">
              <span className="soft">Bem-vindo(a) a nave da</span>
              <span className="neon">Alien Designs.</span>
            </h1>
            <p className="hero-copy">
              <strong>A partir de agora, vamos conduzir a rota criativa da sua Landing Page.</strong>
              <span>
                Uma proposta para transformar {empresa} em uma experiencia clara, premium e impossivel de
                ignorar.
              </span>
            </p>
            <div className="hero-actions">
              <a className="button" href={whatsappUrl}>
                Aprovar proposta
              </a>
              <a className="button ghost" href="#visao">
                Ver rota estrategica
              </a>
            </div>

            <div className="console-grid" aria-label="Resumo da proposta">
              <article className="console-card">
                <span>Cliente</span>
                <strong>{proposal.nome_cliente}</strong>
              </article>
              <article className="console-card">
                <span>Nicho</span>
                <strong>{proposal.nicho}</strong>
              </article>
              <article className="console-card">
                <span>Data</span>
                <strong>{formatDate(proposal.data_proposta)}</strong>
              </article>
              <article className="console-card">
                <span>Validade</span>
                <strong>{formatDate(proposal.validade_proposta)}</strong>
              </article>
              <article className="console-card">
                <span>Prazo</span>
                <strong>{proposal.prazo_entrega}</strong>
              </article>
              <article className="console-card">
                <span>Investimento</span>
                <strong>{proposal.investimento}</strong>
              </article>
            </div>
          </div>
        </section>

        <div className="main-screen">
          <section className="section first" id="visao">
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="section-kicker">Visao estrategica</div>
                  <h2>Antes de desenhar a pagina, desenhamos a rota.</h2>
                </div>
                <p>
                  A Landing Page sera construida para guiar o visitante com clareza, elevar a percepcao de valor de
                  {` ${empresa} `}e transformar atencao em acao direta.
                </p>
              </div>

              <div className="strategy-grid">
                <article className="dark-card">
                  <span className="index">01</span>
                  <h3>Clareza da oferta</h3>
                  <p>
                    Organizacao da mensagem para que o visitante entenda rapidamente o que esta sendo oferecido, para
                    quem e qual o proximo passo.
                  </p>
                </article>
                <article className="dark-card">
                  <span className="index">02</span>
                  <h3>Design com percepcao premium</h3>
                  <p>Direcao visual forte, moderna e responsiva para aumentar confianca antes da primeira conversa.</p>
                </article>
                <article className="dark-card">
                  <span className="index">03</span>
                  <h3>Caminho direto para conversao</h3>
                  <p>Fluxo de leitura e chamadas para acao pensadas para levar o lead qualificado ao WhatsApp.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="section" id="escopo">
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="section-kicker">O que sera construido</div>
                  <h2>Uma pagina com presenca, intencao e acabamento.</h2>
                </div>
                <p>O escopo foi pensado para entregar uma Landing Page completa com foco em {objetivo}</p>
              </div>

              <div className="scope-grid">
                {[
                  ["Landing Page completa", "Pagina unica com estrutura comercial, apresentacao da oferta, diferenciais e CTA principal."],
                  ["Design premium e responsivo", "Interface original, refinada e adaptada para desktop, tablet e mobile."],
                  ["Estrutura de conversao", "Secoes organizadas para criar interesse, confianca e avanco para contato."],
                  ["Secoes comerciais", "Blocos de conteudo para oferta, beneficios, autoridade, prova e chamada para acao."],
                  ["Botoes para WhatsApp", "Chamadas posicionadas em pontos estrategicos da pagina."],
                  ["SEO basico", "Hierarquia semantica, title, description e boas praticas iniciais de leitura."],
                  ["Ate 2 rodadas de ajustes", "Refinamentos dentro do escopo aprovado para lapidar conteudo e visual."],
                  ["Publicacao ou arquivos", "Entrega final conforme combinado: publicacao assistida ou arquivos organizados."]
                ].map(([title, text], index) => (
                  <article className="dark-card" key={title}>
                    <span className="index">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="carousel-zone" aria-labelledby="portfolio-title">
              <div className="section-head">
                <div>
                  <div className="section-kicker">Rotas criativas</div>
                  <h2 id="portfolio-title">Algumas rotas criativas que ja tiramos do papel.</h2>
                </div>
                <p>
                  Landing Pages criadas para transformar ideias em presenca, presenca em confianca e confianca em
                  acao.
                </p>
              </div>

              <div className="marquee" aria-label="Carrossel continuo de landing pages">
                <PortfolioTrack row={portfolioRows[0]} />
                <PortfolioTrack row={portfolioRows[1]} reverse />
              </div>
            </div>
          </section>

          <section className="section" id="processo">
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="section-kicker">Processo</div>
                  <h2>Como vamos conduzir a nave.</h2>
                </div>
                <p>
                  Um processo simples, estrategico e visualmente guiado para manter a criacao com direcao clara do
                  inicio ao lancamento.
                </p>
              </div>

              <div className="process">
                {[
                  ["Imersao", "Coleta de informacoes, materiais, objetivo comercial, publico e referencias essenciais."],
                  ["Rota estrategica", "Definicao da narrativa, secoes, hierarquia de conteudo e caminho ate a conversao."],
                  ["Direcao visual", "Criacao da atmosfera visual da pagina com foco em percepcao premium e clareza."],
                  ["Desenvolvimento", "Construcao responsiva da Landing Page e aplicacao dos pontos de chamada para acao."],
                  ["Revisao e lancamento", "Ajustes finais, conferencia responsiva e entrega ou publicacao conforme combinado."]
                ].map(([title, text], index) => (
                  <article className="process-step" key={title}>
                    <span className="process-marker">{String(index + 1).padStart(2, "0")}</span>
                    <div className="process-content">
                      <span className="process-label">Etapa {String(index + 1).padStart(2, "0")}</span>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="cronograma-title">
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="section-kicker">Cronograma</div>
                  <h2 id="cronograma-title">Uma rota clara ate a publicacao.</h2>
                </div>
                <p>O prazo combinado para esta rota e {proposal.prazo_entrega}, contado apos aceite e materiais.</p>
              </div>

              <div className="schedule-grid">
                <article className="schedule-card">
                  <span>Dia 1</span>
                  <h3>Briefing e estrutura</h3>
                  <p>Organizacao da oferta, objetivo, conteudo base e mapa da pagina.</p>
                </article>
                <article className="schedule-card">
                  <span>Dia 2</span>
                  <h3>Direcao visual</h3>
                  <p>Definicao estetica, composicao principal e linguagem visual da pagina.</p>
                </article>
                <article className="schedule-card">
                  <span>Dias 3 e 4</span>
                  <h3>Desenvolvimento</h3>
                  <p>Construcao da experiencia responsiva e dos blocos comerciais.</p>
                </article>
                <article className="schedule-card">
                  <span>Entrega</span>
                  <h3>Ajustes e finalizacao</h3>
                  <p>Revisao, refinamentos finais e publicacao ou entrega dos arquivos.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="section" id="investimento">
            <div className="wrap">
              <div className="investment-panel">
                <div>
                  <div className="section-kicker">Investimento</div>
                  <h2>Investimento para colocar essa nave em orbita.</h2>
                  <p>
                    Uma entrega completa para transformar a presenca da oferta em uma pagina com visual premium,
                    leitura estrategica e chamada direta para acao.
                  </p>
                </div>
                <aside className="price-box" aria-label="Resumo do investimento">
                  <span>Investimento total</span>
                  <strong>{proposal.investimento}</strong>
                  <p>{condicao}</p>
                  <div className="mini-facts">
                    <div>
                      <span>Validade</span>
                      <b>{formatDate(proposal.validade_proposta)}</b>
                    </div>
                    <div>
                      <span>Prazo</span>
                      <b>{proposal.prazo_entrega}</b>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="condicoes-title">
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="section-kicker">Condicoes</div>
                  <h2 id="condicoes-title">Termos claros para uma rota sem ruido.</h2>
                </div>
                <p>
                  As condicoes abaixo mantem escopo, prazo e responsabilidades bem definidos para que a producao avance
                  com fluidez.
                </p>
              </div>

              <div className="terms-grid">
                {[
                  ["Inicio do prazo", "O prazo inicia apos aceite, pagamento inicial e envio dos materiais necessarios."],
                  ["Rodadas de ajustes", "Estao inclusas 2 rodadas de ajustes, desde que solicitadas dentro do escopo aprovado."],
                  ["Fora do escopo", "Alteracoes adicionais, novas paginas, integracoes ou demandas extras podem gerar novo orcamento."],
                  ["Resultados comerciais", "Resultados dependem tambem de oferta, trafego, atendimento, preco, mercado e operacao comercial."],
                  ["Itens nao inclusos", "Nao inclui trafego pago, copywriting avancado do zero, fotos, videos, automacoes, CRM, dominio, hospedagem ou manutencao mensal, salvo se combinado."],
                  ["Entrega final", "A publicacao ou entrega dos arquivos seguira o formato combinado no fechamento da proposta."]
                ].map(([title, text], index) => (
                  <article className="term-card" key={title}>
                    <span className="index">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="final-cta" id="aceite">
          <div className="wrap">
            <div className="cta-box">
              <div className="section-kicker">Aceite</div>
              <h2>Pronto(a) para decolar?</h2>
              <p>Se essa rota faz sentido para voce, o proximo passo e aprovar a proposta e iniciar a imersao.</p>
              <a className="button" href={whatsappUrl}>
                Aprovar proposta
              </a>
              <div className="signature">Alien Designs | Criatividade fora da orbita comum.</div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
