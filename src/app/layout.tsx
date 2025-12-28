import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Laurent GRIMAUD - Centre Médical Pont de l'Arc",
  description: "Prenez rendez-vous en ligne avec le Dr. Laurent GRIMAUD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
