/**
 * Smoothly scrolls to an element with offset for fixed header
 */
export const scrollToElement = (selector: string) => {
  const element = typeof selector === 'string' 
    ? document.querySelector(`#${selector}`) || document.getElementById(selector.replace('#', ''))
    : selector;
    
  if (element) {
    const headerOffset = 80; // Height of fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
