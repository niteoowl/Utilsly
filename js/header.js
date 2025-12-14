/**
 * Utilsly Common Header
 * Handles Favicon and common <head> elements.
 */
(() => {
    function updateFavicon() {
        // Check for dark mode preference
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
            (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));

        // Simpler check relying on what common.js sets (data-theme is authoritative after init)
        // But common.js might set it slightly later? 
        // common.js sets data-theme in initTheme().
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const useDark = currentTheme === 'dark';

        const faviconPath = useDark ? '/images/favicon_dark.png' : '/images/favicon_light.png';

        let link = document.querySelector('link[rel="icon"]');
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }

        // Only update if changed to avoid flickering if called redundantly
        if (link.getAttribute('href') !== faviconPath) {
            link.href = faviconPath;
        }
    }

    // Initial load
    updateFavicon();

    // Watch for theme changes on the html element
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                updateFavicon();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Also listen to system preference changes if no theme is set
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
            updateFavicon();
        }
    });
})();
