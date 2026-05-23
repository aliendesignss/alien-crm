import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alien Designs | Propostas",
  description: "Mini plataforma de propostas comerciais para Landing Pages da Alien Designs."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
