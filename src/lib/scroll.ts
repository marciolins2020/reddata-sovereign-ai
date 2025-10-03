/**
 * Waits for all images in an element to finish loading
 */
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
      img.addEventListener('load', () => resolve(), { once: true });
      img.addEventListener('error', () => resolve(), { once: true });
      
      // Timeout fallback - don't wait forever
      setTimeout(() => resolve(), 3000);
    });
  });
  
  return Promise.all(imagePromises).then(() => {});
};

/**
 * Smoothly scrolls to an element with offset for fixed header
 * Waits for images to load to prevent layout shifts
 */
export const scrollToElement = async (selector: string, retries = 3) => {
  // Remove # if present
  const id = selector.replace('#', '');
  
  const attemptScroll = async (attemptsLeft: number): Promise<void> => {
    const element = document.getElementById(id);
    
    if (element) {
      // Wait for all images in the target section to load
      await waitForImages(element);
      
      // Additional wait for any lazy-loaded content
      await new Promise(resolve => setTimeout(resolve, 100));
      
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
