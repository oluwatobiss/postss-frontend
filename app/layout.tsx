import type { Metadata } from "next";
import RootElements from "./_components/RootElements";
import "./globals.css";

export const metadata: Metadata = {
  title: "Postss: Socialize with people worldwide",
  description: "Postss is an app for socializing with people worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootElements>{children}</RootElements>;
}
