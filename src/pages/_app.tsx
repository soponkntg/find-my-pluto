import { Navbar } from "@/component";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-prompt",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${prompt.variable} font-sans`}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}
