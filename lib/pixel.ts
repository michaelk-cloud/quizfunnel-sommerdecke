"use client";

type PixelEvent = [string, Record<string, unknown> | undefined];

let ready = false;
const queue: PixelEvent[] = [];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __pixelInitialized?: boolean;
  }
}

export function markPixelReady() {
  ready = true;
  flush();
}

export function markPixelBlocked() {
  ready = false;
  queue.length = 0;
}

function flush() {
  if (typeof window === "undefined" || !window.fbq || !ready) return;
  while (queue.length) {
    const [event, params] = queue.shift()!;
    window.fbq("track", event, params);
  }
}

export function trackPixel(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (ready && window.fbq) {
    window.fbq("track", event, params);
    return;
  }
  queue.push([event, params]);
}
