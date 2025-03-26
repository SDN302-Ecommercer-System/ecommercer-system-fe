/**
 * Transform image URL to get higher resolution version
 * @param {string} url - Original image URL
 * @returns {string} - Transformed URL with higher resolution or original URL if pattern not found
 */
export const getHighResImage = (url) => {
  if (!url) return "";
  
  // Check if URL contains the pattern
  if (url.includes("/500/750/")) {
    return url.replace("/500/750/", "/1517/2000/");
  }
  
  // Return original URL if pattern not found
  return url;
}; 