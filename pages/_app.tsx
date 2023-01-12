import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PageHead } from "@components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageHead title={"Slimes"} description="An art project by scum" />
      <Component {...pageProps} />;
    </>
  );
}
