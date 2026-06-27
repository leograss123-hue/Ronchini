import "./globals.css";
import { Rye } from "next/font/google";

const rye = Rye({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Ronchini",
  description: "Seleção com Modão",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={rye.className}>
        {children}
      </body>
    </html>
  );
}