import type { CSSProperties } from "react";
import type { Proposal } from "@/lib/types";

const portfolioRows = [
  [
    ["Captura de tela 2026-05-22 215537_resultado.webp", "Brand Growth", "Autoridade visual"],
    ["Captura de tela 2026-05-22 215628_resultado.webp", "Página de conversão", "Oferta clara"],
    ["Captura de tela 2026-05-22 215654_resultado.webp", "Experiência premium", "Confiança"],
    ["Captura de tela 2026-05-22 215755_resultado.webp", "Campanha digital", "Ação direta"],
    ["Captura de tela 2026-05-22 215822_resultado.webp", "Landing estratégica", "Captação"],
    ["Captura de tela 2026-05-22 215845_resultado.webp", "Rota comercial", "WhatsApp"]
  ],
  [
    ["Captura de tela 2026-05-22 215909_resultado.webp", "Presença digital", "Percepção premium"],
    ["Captura de tela 2026-05-22 220007_resultado.webp", "Página de impacto", "Decisão simples"],
    ["CARROSSEL 04.webp", "Layout de campanha", "Destaque visual"],
    ["CARROSSEL 05.webp", "Narrativa de oferta", "Fluxo objetivo"],
    ["CARROSSEL 08.webp", "Direção criativa", "Conversão"]
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
            <figure className="portfolio-card reveal" aria-hidden={index >= row.length} key={`${file}-${index}`}>
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
    `gerar uma presença digital mais forte para ${empresa}, com uma página clara, desejável e pronta para levar o visitante até a conversa.`;
  const condicao = proposal.condicao_pagamento || "Condição de pagamento a combinar no aceite da proposta.";

  return (
    <>
      <header className="site-header">
        <nav className="nav wrap" aria-label="Navegação principal">
          <a className="logo" href="#topo">
            Alien Designs
          </a>
          <div className="nav-links" aria-label="Links internos">
            <a href="#visao">Visão</a>
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
          <div className="hero-content wrap reveal">
            <div className="eyebrow">Proposta comercial | Landing Page Premium</div>
            <p className="hero-greeting">Olá, {proposal.nome_cliente}.</p>
            <h1 id="hero-title">
              <span className="soft">Bem-vindo(a) à nave da</span>
              <span className="neon">Alien Designs.</span>
            </h1>
            <p className="hero-copy">
              <strong>A partir de agora, vamos conduzir a rota criativa da sua Landing Page.</strong>
              <span>Uma proposta para transformar {empresa} em uma experiência clara, premium e impossível de ignorar.</span>
            </p>
            <div className="hero-actions">
              <a className="button" href={whatsappUrl}>
                Aprovar proposta
              </a>
              <a className="button ghost" href="#visao">
                Ver rota estratégica
              </a>
            </div>

            <div className="console-grid" aria-label="Resumo da proposta">
              <article className="console-card reveal">
                <span>Cliente</span>
                <strong>{proposal.nome_cliente}</strong>
              </article>
              <article className="console-card reveal">
                <span>Nicho</span>
                <strong>{proposal.nicho}</strong>
              </article>
              <article className="console-card reveal">
                <span>Data</span>
                <strong>{formatDate(proposal.data_proposta)}</strong>
              </article>
              <article className="console-card reveal">
                <span>Validade</span>
                <strong>{formatDate(proposal.validade_proposta)}</strong>
              </article>
              <article className="console-card reveal">
                <span>Prazo</span>
                <strong>{proposal.prazo_entrega}</strong>
              </article>
            </div>
          </div>
        </section>

        <div className="main-screen">
          <section className="section first" id="visao">
            <div className="wrap">
              <div className="section-head reveal">
                <div>
                  <div className="section-kicker">Visão estratégica</div>
                  <h2>Antes de desenhar a página, desenhamos a rota.</h2>
                </div>
                <p>
                  A Landing Page será construída para guiar o visitante com clareza, elevar a percepção de valor de{" "}
                  {empresa} e transformar atenção em ação direta.
                </p>
              </div>

              <div className="strategy-grid">
                <article className="dark-card reveal">
                  <span className="index">01</span>
                  <h3>Clareza da oferta</h3>
                  <p>
                    Organização da mensagem para que o visitante entenda rapidamente o que está sendo oferecido, para
                    quem é e qual é o próximo passo.
                  </p>
                </article>
                <article className="dark-card reveal">
                  <span className="index">02</span>
                  <h3>Design com percepção premium</h3>
                  <p>Direção visual forte, moderna e responsiva para aumentar a confiança antes da primeira conversa.</p>
                </article>
                <article className="dark-card reveal">
                  <span className="index">03</span>
                  <h3>Caminho direto para conversão</h3>
                  <p>Fluxo de leitura e chamadas para ação pensadas para levar o lead qualificado ao WhatsApp.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="section" id="escopo">
            <div className="wrap">
              <div className="section-head reveal">
                <div>
                  <div className="section-kicker">O que será construído</div>
                  <h2>Uma página com presença, intenção e acabamento.</h2>
                </div>
                <p>O escopo foi pensado para entregar uma Landing Page completa com foco em {objetivo}</p>
              </div>

              <div className="scope-grid">
                {[
                  ["Landing Page completa", "Página única com estrutura comercial, apresentação da oferta, diferenciais e CTA principal."],
                  ["Design premium e responsivo", "Interface original, refinada e adaptada para desktop, tablet e mobile."],
                  ["Estrutura de conversão", "Seções organizadas para criar interesse, confiança e avanço para contato."],
                  ["Seções comerciais", "Blocos de conteúdo para oferta, benefícios, autoridade, prova e chamada para ação."],
                  ["Botões para WhatsApp", "Chamadas posicionadas em pontos estratégicos da página."],
                  ["SEO básico", "Hierarquia semântica, title, description e boas práticas iniciais de leitura."],
                  ["Até 2 rodadas de ajustes", "Refinamentos dentro do escopo aprovado para lapidar conteúdo e visual."],
                  ["Publicação ou arquivos", "Entrega final conforme combinado: publicação assistida ou arquivos organizados."]
                ].map(([title, text], index) => (
                  <article className="dark-card reveal" key={title}>
                    <span className="index">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="carousel-zone" aria-labelledby="portfolio-title">
              <div className="section-head reveal">
                <div>
                  <div className="section-kicker">Rotas criativas</div>
                  <h2 id="portfolio-title">Algumas rotas criativas que já tiramos do papel.</h2>
                </div>
                <p>
                  Landing Pages criadas para transformar ideias em presença, presença em confiança e confiança em ação.
                </p>
              </div>

              <div className="marquee" aria-label="Carrossel contínuo de landing pages">
                <PortfolioTrack row={portfolioRows[0]} />
                <PortfolioTrack row={portfolioRows[1]} reverse />
              </div>
            </div>
          </section>

          <section className="section" id="processo">
            <div className="wrap">
              <div className="section-head reveal">
                <div>
                  <div className="section-kicker">Processo</div>
                  <h2>Como vamos conduzir a nave.</h2>
                </div>
                <p>
                  Um processo simples, estratégico e visualmente guiado para manter a criação com direção clara do
                  início ao lançamento.
                </p>
              </div>

              <div className="process">
                {[
                  ["Imersão", "Coleta de informações, materiais, objetivo comercial, público e referências essenciais."],
                  ["Rota estratégica", "Definição da narrativa, seções, hierarquia de conteúdo e caminho até a conversão."],
                  ["Direção visual", "Criação da atmosfera visual da página com foco em percepção premium e clareza."],
                  ["Desenvolvimento", "Construção responsiva da Landing Page e aplicação dos pontos de chamada para ação."],
                  ["Revisão e lançamento", "Ajustes finais, conferência responsiva e entrega ou publicação conforme combinado."]
                ].map(([title, text], index) => (
                  <article className="process-step reveal" key={title}>
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
              <div className="section-head reveal">
                <div>
                  <div className="section-kicker">Cronograma</div>
                  <h2 id="cronograma-title">Uma rota clara até a publicação.</h2>
                </div>
                <p>O prazo combinado para esta rota é {proposal.prazo_entrega}, contado após aceite e envio dos materiais.</p>
              </div>

              <div className="schedule-grid">
                <article className="schedule-card reveal">
                  <span>Dia 1</span>
                  <h3>Briefing e estrutura</h3>
                  <p>Organização da oferta, objetivo, conteúdo base e mapa da página.</p>
                </article>
                <article className="schedule-card reveal">
                  <span>Dia 2</span>
                  <h3>Direção visual</h3>
                  <p>Definição estética, composição principal e linguagem visual da página.</p>
                </article>
                <article className="schedule-card reveal">
                  <span>Dias 3 e 4</span>
                  <h3>Desenvolvimento</h3>
                  <p>Construção da experiência responsiva e dos blocos comerciais.</p>
                </article>
                <article className="schedule-card reveal">
                  <span>Entrega</span>
                  <h3>Ajustes e finalização</h3>
                  <p>Revisão, refinamentos finais e publicação ou entrega dos arquivos.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="section" id="investimento">
            <div className="wrap">
              <div className="investment-panel reveal">
                <div>
                  <div className="section-kicker">Investimento</div>
                  <h2>Investimento para colocar essa nave em órbita.</h2>
                  <p>
                    Uma entrega completa para transformar a presença da oferta em uma página com visual premium,
                    leitura estratégica e chamada direta para ação.
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
              <div className="section-head reveal">
                <div>
                  <div className="section-kicker">Condições</div>
                  <h2 id="condicoes-title">Termos claros para uma rota sem ruído.</h2>
                </div>
                <p>
                  As condições abaixo mantêm escopo, prazo e responsabilidades bem definidos para que a produção avance
                  com fluidez.
                </p>
              </div>

              <div className="terms-grid">
                {[
                  ["Início do prazo", "O prazo inicia após aceite, pagamento inicial e envio dos materiais necessários."],
                  ["Rodadas de ajustes", "Estão inclusas 2 rodadas de ajustes, desde que solicitadas dentro do escopo aprovado."],
                  ["Fora do escopo", "Alterações adicionais, novas páginas, integrações ou demandas extras podem gerar novo orçamento."],
                  ["Resultados comerciais", "Resultados dependem também de oferta, tráfego, atendimento, preço, mercado e operação comercial."],
                  ["Itens não inclusos", "Não inclui tráfego pago, copywriting avançado do zero, fotos, vídeos, automações, CRM, domínio, hospedagem ou manutenção mensal, salvo se combinado."],
                  ["Entrega final", "A publicação ou entrega dos arquivos seguirá o formato combinado no fechamento da proposta."]
                ].map(([title, text], index) => (
                  <article className="term-card reveal" key={title}>
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
            <div className="cta-box reveal">
              <div className="section-kicker">Aceite</div>
              <h2>Pronto(a) para decolar?</h2>
              <p>Se essa rota faz sentido para você, o próximo passo é aprovar a proposta e iniciar a imersão.</p>
              <a className="button" href={whatsappUrl}>
                Aprovar proposta
              </a>
              <div className="signature">Alien Designs | Criatividade fora da órbita comum.</div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
