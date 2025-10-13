import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PWARegistration } from "@/components/pwa-registration";
import { Analytics } from "@/components/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sagarmatha Investments — Brokerage & Investment Advisory in Nepal",
  description: "Sagarmatha Investments is a modern brokerage and investment advisory in Nepal. We provide stock trading, PMS, research, and client-first financial guidance.",
  keywords: ["brokerage", "investment", "Nepal", "stock trading", "PMS", "portfolio management", "NEPSE", "financial advisory"],
  authors: [{ name: "Sagarmatha Investments" }],
  creator: "Sagarmatha Investments",
  publisher: "Sagarmatha Investments",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    title: "Sagarmatha Investments",
    siteName: "Sagarmatha Investments",
    locale: "en_NP",
    description: "Brokerage, PMS, IPO handling, research, and advisory.",
    url: "https://sagarmatha-investments.vercel.app/",
    images: [
      {
        url: "https://sagarmatha-investments.vercel.app/images/office.png",
        alt: "Sagarmatha Investments office and team",
        width: 1200,
        height: 675,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagarmatha Investments",
    description: "Trusted partner for financial success in Nepal.",
    images: ["https://sagarmatha-investments.vercel.app/images/office.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "https://sagarmatha-investments.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "Sagarmatha Investments",
              url: "https://sagarmatha-investments.vercel.app/",
              logo: "https://sagarmatha-investments.vercel.app/favicon.svg",
              description: "Brokerage, portfolio management, and investment advisory services in Nepal.",
              telephone: "+977-9876543211",
              email: "info@sagarmathainvestments.com",
              areaServed: "NP",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kathmandu",
                addressCountry: "NP",
              },
              serviceType: [
                "Stock brokerage",
                "Investment advisory",
                "Portfolio management",
                "Research",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <PWARegistration />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
