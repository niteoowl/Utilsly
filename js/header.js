/**
 * Header JS - Favicon Manager
 * Updates favicon based on System Theme (Browser Theme), not App Theme.
 */
(function () {
    function updateFavicon() {
        // Check system preference
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // You would typically have different icons. 
        // Assuming current setup: favicon_light.png (for dark bg?) and favicon_dark.png
        // Or if user wants "Browser Theme" matching:
        // Dark Mode Browser -> Needs Light Icon -> favicon_dark.png (naming convention might be reverse or direct)
        // Let's assume:
        // favicon_light.png = Icon for Light Mode (Dark Icon)
        // favicon_dark.png = Icon for Dark Mode (Light Icon)

        // But usually:
        // Dark System -> Show Light Icon (to contrast)
        // Light System -> Show Dark Icon (to contrast)

        const iconName = isDark ? 'favicon_dark.png' : 'favicon_light.png';
        const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
        link.type = 'image/png';
        link.rel = 'icon';
        link.href = `/images/${iconName}`;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    // Initial check
    updateFavicon();

    // Listener for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
})();
