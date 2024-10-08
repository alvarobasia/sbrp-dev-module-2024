import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactDOM from "react-dom";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import ReactQueryProvider from "../libs/ReactQuery";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ReactDOM.preload("https://unpkg.com/leaflet@1.0.1/dist/leaflet.css", {
    as: "style",
  });

  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={inter.className}>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}
