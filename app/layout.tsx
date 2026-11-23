import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

// Bold geometric display font for headlines, Inter for body/UI (plain and legible).
const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Always read fresh content from Supabase instead of a build-time copy,
// so admin edits show up on the live site straight away.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yaseer Maruf — AI/Data Scientist",
  description: "Portfolio of Yaseer Maruf, AI/Data Scientist.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read content once here so Navbar/Footer (name, socials) always match
  // the same source of truth as the rest of the site.
  const content = await getContent();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${sans.variable}`}>
        <ThemeProvider>
          <Navbar name={content.profile.name} />
          <main className="min-h-screen">{children}</main>
          <Footer social={content.social} copyright={content.footer.copyright} />
        </ThemeProvider>
      </body>
    </html>
  );
}
