/**
 * Google Ads & Google Analytics Tracking Utility
 * 
 * This module provides functions to track conversions in Google Ads
 * and events in Google Analytics 4.
 * Tracking fires when users interact with contact information.
 */

// Type definition for gtag function
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      actionOrTarget: string | Date,
      params?: {
        send_to?: string;
        event_callback?: () => void;
        event_category?: string;
        event_label?: string;
        contact_type?: string;
        link_url?: string;
        page_location?: string;
        [key: string]: unknown;
      }
    ) => void;
    dataLayer?: unknown[];
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

/**
 * Track contact click events to both Google Ads and Google Analytics 4
 * 
 * This function sends data to both platforms:
 * - Google Ads: Tracks as a conversion for campaign optimization
 * - Google Analytics 4: Tracks as 'contact_click' event with detailed parameters
 * 
 * @param contactType - Type of contact: 'phone', 'email', or 'linkedin'
 * @param linkUrl - The URL or href of the clicked link
 * 
 * @example
 * trackContactClick('phone', 'tel:+380974825097')
 * trackContactClick('email', 'mailto:sergii@mission101.ai')
 * trackContactClick('linkedin', 'https://www.linkedin.com/in/sergiiilliukhin/')
 */
export const trackContactClick = (
  contactType: 'phone' | 'email' | 'linkedin',
  linkUrl: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      // Send to Google Ads (conversion tracking)
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1007030033/klb5CIyQz-IBEJGemOAD'
      });
      
      // Send to Google Analytics 4 (detailed event tracking)
      window.gtag('event', 'contact_click', {
        'event_category': 'engagement',
        'event_label': contactType,
        'contact_type': contactType,
        'link_url': linkUrl,
        'page_location': window.location.href
      });
      
      // Optional: Log for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('Contact click tracked:', {
          type: contactType,
          url: linkUrl,
          page: window.location.href
        });
      }
    } catch (error) {
      // Silently fail to avoid breaking user experience
      console.error('Error tracking contact click:', error);
    }
  }
};
