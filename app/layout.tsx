import type { Metadata } from "next";
import { Big_Shoulders_Stencil, JetBrains_Mono, Literata } from "next/font/google";
import ChatProvider from "@/components/chat/chat-provider";
import AnalyticsConsentBanner from "@/components/analytics/analytics-consent-banner";
import PortfolioAnalytics from "@/components/analytics/portfolio-analytics";
import { SectionBoundary } from "@/components/errors/section-boundary";
import "./globals.css";

const display = Big_Shoulders_Stencil({
  variable: "--font-display-stack",
  subsets: ["latin"],
  display: "swap",
});

const body = Literata({
  variable: "--font-body-stack",
  subsets: ["latin"],
  display: "swap",
});

const plateMono = JetBrains_Mono({
  variable: "--font-plate-stack",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buildforge — Desarrollo de software a medida",
  description:
    "Estudio freelance: apps web y móvil, APIs, integraciones con IA y despliegue a producción. Proyectos reales bajo la marca Buildforge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} ${plateMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col foundry-sand text-foundry-type">
        {children}
        <SectionBoundary section="analytics" compact>
          <PortfolioAnalytics />
        </SectionBoundary>
        <AnalyticsConsentBanner />
        <ChatProvider />
      </body>
    </html>
  );
}
