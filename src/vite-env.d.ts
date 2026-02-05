/// <reference types="vite/client" />

// Google Tag (gtag.js) TypeScript declarations
interface Window {
  gtag?: (
    command: 'js' | 'config' | 'event',
    targetOrAction: string | Date,
    params?: {
      [key: string]: any;
      send_to?: string;
      event_callback?: () => void;
    }
  ) => void;
  dataLayer?: any[];
}
