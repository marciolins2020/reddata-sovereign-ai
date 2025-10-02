/**
 * Smoothly scrolls to an element without causing forced reflows
 * Uses native scrollIntoView which is more performant than getBoundingClientRect
 */
export const scrollToElement = (selector: string) => {
  const element = typeof selector === 'string' 
    ? document.querySelector(selector) || document.getElementById(selector.replace('#', ''))
    : selector;
    
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
  }
};
