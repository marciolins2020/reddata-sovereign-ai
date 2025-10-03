/**
 * Smoothly scrolls to an element with offset for fixed header
 * Waits for images to load before scrolling to ensure layout is stable
 */
export const scrollToElement = (selector: string, retries = 3) => {
  // Remove # if present
  const id = selector.replace('#', '');
  
  const waitForImages = (element: HTMLElement): Promise<void> => {
    const images = Array.from(element.querySelectorAll('img'));
    
    if (images.length === 0) {
      return Promise.resolve();
    }
    
    const imagePromises = images.map(img => {
      if (img.complete) {
        return Promise.resolve();
      }
      
      return new Promise<void>((resolve) => {
        img.addEventListener('load', () => resolve());
        img.addEventListener('error', () => resolve()); // Resolve even on error
        
        // Timeout after 3 seconds to avoid hanging
        setTimeout(() => resolve(), 3000);
      });
    });
    
    return Promise.all(imagePromises).then(() => {});
  };
  
  const attemptScroll = async (attemptsLeft: number) => {
    const element = document.getElementById(id);
    
    if (element) {
      // Wait for all images to load
      await waitForImages(element);
      
      // Extra delay for any other lazy-loaded content
      await new Promise(resolve => setTimeout(resolve, 100));
      
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
