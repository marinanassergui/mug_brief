import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mug Studio · Briefing",
  description: "Preencha o briefing estruturado para iniciarmos a criação da sua landing page estratégica de alto nível.",
  metadataBase: new URL("https://mug.studio"),
  openGraph: {
    title: "Mug Studio · Briefing",
    description: "Preencha o briefing estruturado para iniciarmos a criação da sua landing page.",
    url: "https://mug.studio/briefing",
    siteName: "Mug Studio",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#000000]">
        {children}
      </body>
    </html>
  );
}
