import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Luxivolt Mühendislik | Endüstriyel Elektrik Çözümleri",
  description: "Luxivolt Mühendislik, A.G., Y.G. ve enerji sistemlerinde anahtar teslim çözümler sunan öncü mühendislik firmasıdır.",
  keywords: "elektrik mühendisliği, A.G., Y.G., trafo merkezi, enerji otomasyonu, pano montajı",
};

import Chatbot from "../components/Chatbot";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${montserrat.variable} ${inter.variable}`}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
