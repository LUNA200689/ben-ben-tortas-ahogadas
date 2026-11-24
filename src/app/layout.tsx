import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tortas Ahogadas BEN-BEN | Menú Digital",
  description: "Las mejores tortas ahogadas de Guadalajara. Tradición jalisciense desde el corazón de Atlas. Servicio a domicilio, pago con tarjeta y transferencia.",
  keywords: ["tortas ahogadas", "Guadalajara", "BEN-BEN", "comida jalisciense", "Atlas", "tacos dorados"],
  authors: [{ name: "BEN-BEN Tortas Ahogadas" }],
  openGraph: {
    title: "Tortas Ahogadas BEN-BEN - Las mejores de Guadalajara",
    description: "Tradición jalisciense en cada bocado. Calificación 4.7 en Google Maps con 290+ reseñas.",
    siteName: "BEN-BEN",
    type: "website",
    locale: "es_MX",
  },
};

export const viewport = {
  themeColor: "#0F5132",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
