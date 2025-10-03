/**
 * Smoothly scrolls to an element with offset for fixed header
 * Optimized to avoid forced reflows by batching DOM reads
 */
export const scrollToElement = (selector: string, retries = 3) => {
  // Remove # if present
  const id = selector.replace('#', '');
  
  const attemptScroll = (attemptsLeft: number) => {
    const element = document.getElementById(id);
    
    if (element) {
      // Double requestAnimationFrame to ensure all pending layout work is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Now safe to read layout properties - browser has finished all pending updates
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          // Batch the write operation
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
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
