import type { Metadata } from "next";
export const runtime = 'edge';
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const inter = Inter({ subsets: ["latin"] });
const ambra = localFont({
  src: "./fonts/Ambra-Sans-Black-trial.ttf",
  variable: "--font-ambra",
});

export const metadata: Metadata = {
  title: "PlayBeth® | Premium Baby Boutique",
  description: "Boutique baby clothing and accessories with a premium, shopping experience.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${ambra.variable}`} suppressHydrationWarning>
        <LoadingScreen />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
