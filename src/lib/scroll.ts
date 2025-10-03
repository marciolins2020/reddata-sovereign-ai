/**
 * Smoothly scrolls to an element with offset for fixed header
 */
export const scrollToElement = (selector: string) => {
  // Remove # if present
  const id = selector.replace('#', '');
  const element = document.getElementById(id);
    
  if (element) {
    const headerOffset = 100; // Height of fixed header + padding
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
