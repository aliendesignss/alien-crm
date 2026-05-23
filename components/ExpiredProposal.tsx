const fallbackWhatsapp = "https://wa.me/5500000000000";

export function ExpiredProposal({ whatsappUrl }: { whatsappUrl?: string | null }) {
  return (
    <main className="expired-screen">
      <section className="expired-panel">
        <div className="section-kicker">Proposta expirada</div>
        <h1>Esta proposta saiu da janela de validade.</h1>
        <p>Entre em contato com a Alien Designs para solicitar uma nova rota comercial atualizada.</p>
        <a className="button" href={whatsappUrl || fallbackWhatsapp}>
          Falar com a Alien Designs
        </a>
      </section>
    </main>
  );
}
