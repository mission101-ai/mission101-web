/**
 * Google Ads Conversion Tracking Utility
 * 
 * This module provides functions to track conversions in Google Ads.
 * Conversions are tracked when users interact with contact information.
 */

// Type definition for gtag function
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      action: string,
      params: {
        send_to: string;
        event_callback?: () => void;
      }
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a conversion event in Google Ads
 * 
 * This function fires when users interact with contact information
 * (click email or phone links), indicating meaningful engagement.
 * 
 * Conversion ID: AW-1007030033/klb5CIyQz-IBEJGemOAD
 */
export const trackConversion = () => {
  // Check if gtag is available (only in browser with Google Ads loaded)
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1007030033/klb5CIyQz-IBEJGemOAD'
      });
      
      // Optional: Log for debugging (remove in production if needed)
      if (process.env.NODE_ENV === 'development') {
        console.log('Google Ads conversion tracked');
      }
    } catch (error) {
      // Silently fail to avoid breaking user experience
      console.error('Error tracking conversion:', error);
    }
  }
};

/**
 * Track a conversion with a callback
 * 
 * Useful when you need to perform an action after conversion is tracked
 * (e.g., navigate to a new page)
 */
export const trackConversionWithCallback = (callback: () => void) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1007030033/klb5CIyQz-IBEJGemOAD',
        'event_callback': callback
      });
    } catch (error) {
      console.error('Error tracking conversion:', error);
      // Still execute callback even if tracking fails
      callback();
    }
  } else {
    // If gtag is not available, just execute the callback
    callback();
  }
};
