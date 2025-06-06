
import type { Metadata } from "next";

import "../globals.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
// import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import { routing } from "../../../i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextAuthProvider from "../../providers/NextAuthProvider";


// const droidArabicKufi = localFont({
//   src: [
//     {
//       path: "../fonts/NotoKufiArabic-Black.ttf",
//       weight: "900",
//       style: "normal",
//     },
//     {
//       path: "../fonts/NotoKufiArabic-ExtraBold.ttf",
//       weight: "800",
//       style: "normal",
//     },
//     {
//       path: "../fonts/NotoKufiArabic-Bold.ttf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../fonts/NotoKufiArabic-SemiBold.ttf",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "../fonts/NotoKufiArabic-Medium.ttf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../fonts/NotoKufiArabic-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../fonts/NotoKufiArabic-Light.ttf",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../fonts/NotoKufiArabic-Thin.ttf",
//       weight: "200",
//       style: "normal",
//     },
//     {
//       path: "../fonts/NotoKufiArabic-ExtraLight.ttf",
//       weight: "100",
//       style: "normal",
//     },
//   ],
//   variable: "--font-droid-kufi",
// });

// const helvetica = localFont({
//   src: [
//     { path: "../fonts/helvetica-black.otf", weight: "900", style: "normal" },
//     { path: "../fonts/Helvetica-Bold.ttf", weight: "700", style: "normal" },
//     { path: "../fonts/helvetica-light.ttf", weight: "200", style: "normal" },
//     { path: "../fonts/Helvetica.ttf", weight: "400", style: "normal" },
//   ],
//   variable: "--font-helvetica",
// });

export const metadata: Metadata = {
  title: "Home",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();

  // Server-rendered defaults for `lang` and `dir` attributes


 

  console.log("jjjjj", locale);

  return (
    <NextAuthProvider>
      <NextIntlClientProvider messages={messages}>
        <Header />
        {children}
        <Toaster />
        <Footer />
      </NextIntlClientProvider>
    </NextAuthProvider>
  );
}
