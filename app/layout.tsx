import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alien Hub | Alien Designs",
  description: "Centro operacional da Alien Designs para propostas, briefings e clientes."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
