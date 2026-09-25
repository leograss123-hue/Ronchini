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
  title: "Ronchini",
  description: "Seleção com Modão",
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
