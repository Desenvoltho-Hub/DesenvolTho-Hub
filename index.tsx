/**
 * Handles real-time filtering of project cards based on user input.
 */
function initializeProjectSearch(): void {
  const searchInput = document.getElementById('project-search') as HTMLInputElement | null;
  const projectGrid = document.querySelector('.project-grid');
  
  if (!searchInput || !projectGrid) {
    // Silently return if elements are not found, as this might not be an error on other pages.
    return;
  }
  
  const projectCards = Array.from(projectGrid.getElementsByClassName('card')) as HTMLElement[];

  if (projectCards.length === 0) {
    return; // No projects to filter
  }

  const handleSearch = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    projectCards.forEach(card => {
      const title = card.querySelector('h4')?.textContent?.toLowerCase() || '';
      const description = card.querySelector('p')?.textContent?.toLowerCase() || '';
      const isVisible = title.includes(searchTerm) || description.includes(searchTerm);

      // Use the 'flex' display property as defined in the CSS for .card
      card.style.display = isVisible ? 'flex' : 'none';
    });
  };

  searchInput.addEventListener('input', handleSearch);
}

// Ensure the DOM is fully loaded before running the script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProjectSearch);
} else {
  // DOM is already ready
  initializeProjectSearch();
}
