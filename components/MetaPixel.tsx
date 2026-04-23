"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getConsent } from "./ConsentBanner";
import { markPixelBlocked, markPixelReady, trackPixel } from "@/lib/pixel";

export { trackPixel };

export function MetaPixel({ pixelId }: { pixelId: string }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);

  useEffect(() => {
    const initial = getConsent();
    setConsent(initial);
    if (initial !== "accepted") markPixelBlocked();
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as "accepted" | "rejected";
      setConsent(detail);
      if (detail !== "accepted") markPixelBlocked();
    };
    window.addEventListener("consent-change", handler);
    return () => window.removeEventListener("consent-change", handler);
  }, []);

  useEffect(() => {
    if (consent === "accepted" && typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, consent]);

  if (consent !== "accepted") return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        onReady={() => {
          markPixelReady();
        }}
      >
        {`
          if (!window.__pixelInitialized) {
            window.__pixelInitialized = true;
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          }
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
