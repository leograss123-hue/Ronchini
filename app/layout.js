import "./globals.css";
import { Rye, Inter, Cinzel } from "next/font/google";

const rye = Rye({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rye",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
});

export const metadata = {
  title: "Ronchini | Shows e Eventos",
  description:
    "Sertanejo de verdade, com tradição e energia. Agende o show do Ronchini para o seu casamento, formatura, evento corporativo ou festa particular. Agenda disponível.",
  keywords: [
    "Ronchini",
    "shows sertanejo",
    "banda sertaneja",
    "contratar show",
    "casamento sertanejo",
    "formatura sertanejo",
    "evento corporativo",
    "modão",
    "Poços de Caldas",
    "Minas Gerais",
  ],
  authors: [{ name: "Ronchini" }],
  creator: "Ronchini",
  metadataBase: new URL("https://ronchini.vercel.app"),
  openGraph: {
    title: "Ronchini | Shows e Eventos",
    description:
      "Sertanejo de verdade, com tradição e energia. Agende o show do Ronchini para o seu evento.",
    url: "https://ronchini.vercel.app",
    siteName: "Ronchini",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ronchini — Shows e Eventos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronchini | Shows e Eventos",
    description:
      "Sertanejo de verdade, com tradição e energia. Agende o show do Ronchini.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${rye.variable} ${inter.variable} ${cinzel.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
