/**
 * Smoothly scrolls to an element with offset for fixed header
 * Includes retry logic to handle elements that haven't rendered yet
 */
export const scrollToElement = (selector: string, retries = 3) => {
  // Remove # if present
  const id = selector.replace('#', '');
  
  const attemptScroll = (attemptsLeft: number) => {
    const element = document.getElementById(id);
    
    if (element) {
      // Use requestAnimationFrame to ensure layout is complete
      requestAnimationFrame(() => {
        const headerOffset = 100; // Height of fixed header + padding
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    } else if (attemptsLeft > 0) {
      // Element not found, retry after a short delay
      setTimeout(() => {
        attemptScroll(attemptsLeft - 1);
      }, 100);
    } else {
      console.warn(`Element with id "${id}" not found after ${retries} attempts`);
    }
  };
  
  attemptScroll(retries);
};
