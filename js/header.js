/**
 * header.js
 * Handles dynamic favicon switching based on system theme.
 */
(function () {
    function updateFavicon() {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // Check local storage if theme is manually overridden (supporting Utilsly's theme system)
        const storedTheme = localStorage.getItem('theme');
        const effectiveDark = storedTheme === 'dark' || (!storedTheme && isDark);

        const faviconPath = effectiveDark ? '/images/favicon_dark.png' : '/images/favicon_light.png';

        // Find or create link element
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = faviconPath;
    }

    // Initial call
    updateFavicon();

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);

    // If you have a custom event for theme toggling in common.js, you might listen to it too
    // For now, reliance on page reload or system change is standard, 
    // but we can expose it globally if needed.
    window.updateAppFavicon = updateFavicon; // Expose for other scripts if needed
})();
