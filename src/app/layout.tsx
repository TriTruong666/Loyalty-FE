import type { Metadata } from "next";
import { Provider } from "jotai";
import { Inter, Open_Sans, Montserrat } from "next/font/google"; // Import Google Fonts
import "./globals.css";
import QueryProvider from "./components/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./components/ThemeProvider";
import ResponsiveWrapper from "./components/ResponsiveWrapper";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const openFont = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const monseFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-monse",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "PicareVN Loyalty",
  description: "Offical website Loyalty of Picare Vietnam",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${openFont.variable} ${monseFont.variable} antialiased`}
      >
        <Provider>
          <QueryProvider>
            <ThemeProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              <ResponsiveWrapper>
                <div>{children}</div>
              </ResponsiveWrapper>
            </ThemeProvider>
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
