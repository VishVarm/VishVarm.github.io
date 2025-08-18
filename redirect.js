// GitHub Pages redirect script
// This helps ensure proper routing on GitHub Pages

(function() {
    // Get the current path
    var path = window.location.pathname;
    
    // If we're on GitHub Pages and the path doesn't end with a slash or .html
    if (path && path !== '/' && !path.endsWith('.html') && !path.endsWith('/')) {
        // Check if this should be a directory
        if (path.includes('/')) {
            // This is likely a subdirectory, redirect to index.html
            window.location.href = path + '/';
        } else {
            // This might be a file without extension, try adding .html
            window.location.href = path + '.html';
        }
    }
    
    // Fix any broken navigation links
    document.addEventListener('DOMContentLoaded', function() {
        // Find all navigation links and ensure they work properly
        var navLinks = document.querySelectorAll('.nav-link, .nav-logo');
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                
                // If it's a relative path to the root, ensure it works
                if (href === '/' || href === '../' || href === '../../') {
                    // This should go to the root index.html
                    // GitHub Pages will handle this automatically
                    return true;
                }
            });
        });
    });
})();
