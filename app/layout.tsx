import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "./contexts/UserContext";

export const metadata: Metadata = {
  title: "Fitora - Transforme ton corps",
  description: "Application de fitness personnalisée",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}