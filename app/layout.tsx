import "./globals.scss";
import { Quicksand } from "next/font/google";
import { Providers } from "./redux/provider";
import { AlertProvider } from "./hook/AlertContext";
import MotionAlert from "./hook/MotionAlert";
import ToastAlert from "./hook/ToastAlert";
const quicksand = Quicksand({ subsets: ["latin"] });
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Focusify - Boost Your Productivity with Our Pomodoro Study Timer",
  metadataBase: new URL("https://focusify.io"),
  description:
    "Maximize focus with our Pomodoro Study Timer. Ideal for students and professionals, enhance productivity using the proven Pomodoro Technique.",
  keywords: [
    "pomodoro",
    "pomodoro timer",
    "pomodoro technique",
    "pomodoro study timer",
    "timer for studying",
    "focus timers",
    "study timer",
  ],
  alternates: {
    canonical: "",
  },
  openGraph: {
    title: "Focusify - Boost Your Productivity with Our Pomodoro Study Timer",
    description:
      "Maximize focus with our Pomodoro Study Timer. Ideal for students and professionals, enhance productivity using the proven Pomodoro Technique.b",
    url: "",
    siteName: "Focusify",
    images: [
      {
        url: "/main/Home.webp",
        width: 800,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={quicksand.className}>
        <AlertProvider>
          <Providers>{children}</Providers>
          <MotionAlert />
          <ToastAlert />
        </AlertProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MH6RNQLV94"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-MH6RNQLV94');
        `}
        </Script>
      </body>
    </html>
  );
}
