/**
 * Detects user's country based on their IP address using ipapi.co
 * Returns country code (e.g., "UA" for Ukraine)
 * Caches result in sessionStorage to avoid repeated API calls
 */

const CACHE_KEY = 'user_country_code';
const API_ENDPOINT = 'https://ipapi.co/country/';

export const detectUserCountry = async (): Promise<string> => {
  // Check if we already have the country code cached
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const countryCode = (await response.text()).trim();
    
    // Cache the result for this session
    sessionStorage.setItem(CACHE_KEY, countryCode);
    
    return countryCode;
  } catch (error) {
    console.warn('Failed to detect user country, defaulting to non-UA:', error);
    // Return empty string to indicate we couldn't detect (will fallback to English)
    return '';
  }
};

/**
 * Determines if the detected country should use Ukrainian language
 */
export const shouldUseUkrainian = async (): Promise<boolean> => {
  const countryCode = await detectUserCountry();
  return countryCode.toUpperCase() === 'UA';
};

