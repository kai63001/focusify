import "./globals.scss";
import { Inter } from "next/font/google";
import { Providers } from "./redux/provider";
import { AlertProvider } from "./hook/AlertContext";
import MotionAlert from "./hook/MotionAlert";
import ToastAlert from "./hook/ToastAlert";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Focusify",
  description: "Focusify is a productivity tool that helps you stay focused.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <AlertProvider>
          <Providers>{children}</Providers>
          <MotionAlert />
          <ToastAlert />
        </AlertProvider>
      </body>
    </html>
  );
}
