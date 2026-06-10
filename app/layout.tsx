import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garantir MVP",
  description:
    "Prove whether a finance AI works on your edge cases before it ever touches real money. Independent, provably local, decision-grade.",
  openGraph: {
    title: "Garantir — the pre-deployment verdict for finance AI",
    description:
      "Test AI on your real files, locally. Get a verdict your CFO, compliance, and auditors can all act on.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..900&family=Hanken+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
