import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Script from "next/script";
import * as gtag from "@/lib/gtag";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
         strategy="afterInteractive"
         src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag.GA_MEASUREMENT_ID}');
          `,
        }}
      />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}
