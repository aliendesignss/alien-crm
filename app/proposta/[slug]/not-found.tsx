import Link from "next/link";

export default function ProposalNotFound() {
  return (
    <main className="expired-screen">
      <section className="expired-panel">
        <div className="section-kicker">Rota nao localizada</div>
        <h1>Proposta nao encontrada.</h1>
        <p>Confira o link recebido ou gere uma nova proposta pela central interna da Alien Designs.</p>
        <Link className="button" href="/admin">
          Voltar para o comando
        </Link>
      </section>
    </main>
  );
}
