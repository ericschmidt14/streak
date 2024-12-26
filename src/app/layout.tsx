import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Streak",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme({
    primaryColor: "red",
    colors: {
      red: [
        "#ffe9f8",
        "#ffd2e9",
        "#f8a4cd",
        "#f172b1",
        "#ec4899",
        "#e92e8a",
        "#e91d83",
        "#cf0d70",
        "#ba0264",
        "#a40056",
      ],
      blue: [
        "#e7f2ff",
        "#d1e0ff",
        "#a2bef9",
        "#709af3",
        "#467bee",
        "#2b68ec",
        "#1a5eec",
        "#084ed2",
        "#0045bd",
        "#003ba7",
      ],
    },
  });

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
