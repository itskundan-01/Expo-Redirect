/**
 * MahaLaxya - QR Code Redirection Script
 * Handles navigation between the AI Finance Advisor and Virtual Trading Platform
 */

// URLs for the services - replace these with actual URLs once deployed
const serviceUrls = {
    'ai-advisor': 'https://mahalakshya-ai.kundanprojects.space',  // Replace with actual URL when deployed
    'trading-platform': 'https://mahalakshya.kundanprojects.space'  // Replace with actual URL when deployed
};

// Default URLs for local development/testing
const defaultUrls = {
    'ai-advisor': 'http://localhost:5000',
    'trading-platform': 'http://localhost:3000'
};

/**
 * Redirects the user to the selected service
 * @param {string} service - The service to redirect to ('ai-advisor' or 'trading-platform')
 */
function redirectTo(service) {
    // Log the selection for analytics purposes
    console.log(`User selected: ${service}`);
    
    // Special handling for trading platform
    if (service === 'trading-platform') {
        // Show modal or alert for trading platform
        showUnavailableMessage();
        return;
    }
    
    // Get the appropriate URL
    const url = serviceUrls[service] || defaultUrls[service];
    
    // Show loading animation (optional enhancement for future)
    showLoading(service);
    
    // Redirect after a short delay to allow loading animation to be seen
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

/**
 * Shows a loading animation before redirecting
 * @param {string} service - The selected service
 */
function showLoading(service) {
    // Get the button in the clicked card
    const card = document.querySelector(`.option-card.${service}`);
    const button = card.querySelector('.try-button');
    
    // Update button text and add loading class
    button.textContent = 'Loading...';
    button.classList.add('loading');
    
    // Add a subtle pulse effect to the entire card
    card.classList.add('pulse');
}

/**
 * Shows a message that the trading platform is only available on localhost
 */
function showUnavailableMessage() {
    // Create modal element
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    // Create message box
    const messageBox = document.createElement('div');
    messageBox.style.backgroundColor = 'white';
    messageBox.style.padding = '2rem';
    messageBox.style.borderRadius = '12px';
    messageBox.style.maxWidth = '90%';
    messageBox.style.width = '500px';
    messageBox.style.textAlign = 'center';
    messageBox.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    
    // Message content
    messageBox.innerHTML = `
        <h3 style="color: var(--dark-blue); margin-bottom: 1rem;">Trading Platform Not Available</h3>
        <p style="margin-bottom: 1.5rem;">The trading platform is currently only available on localhost. 
        Please access it directly from your laptop or local development environment.</p>
        <p style="margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--text-light);">
            Local URL: ${defaultUrls['trading-platform']}
        </p>
        <button id="close-modal" style="background: linear-gradient(135deg, var(--primary-color), var(--dark-blue)); 
        color: white; border: none; border-radius: 50px; padding: 0.8rem 2rem; 
        font-size: 1.1rem; cursor: pointer;">Close</button>
    `;
    
    modal.appendChild(messageBox);
    document.body.appendChild(modal);
    
    // Add event listener to close button
    document.getElementById('close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

/**
 * Animates the logo on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    if (logo) {
        // Add a subtle entrance animation for the logo
        logo.classList.add('animate-in');
    }
    
    // Add click event listeners to buttons for better mobile experience
    const buttons = document.querySelectorAll('.try-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent double-triggering with the card click
            const card = button.closest('.option-card');
            const service = card.classList.contains('ai-advisor') ? 'ai-advisor' : 'trading-platform';
            redirectTo(service);
        });
    });
    
    // Check if this page was opened from a QR code scan
    // This is approximate detection, not 100% reliable
    const fromQR = checkIfFromQRScan();
    if (fromQR) {
        console.log('User arrived via QR code scan');
        // Could trigger special welcome animation or tracking here
    }
});

/**
 * Attempts to determine if the page was opened from a QR code scanner
 * @returns {boolean} True if likely from QR scanner
 */
function checkIfFromQRScan() {
    // Common QR scanner apps often have specific referrers or user agents
    const referrer = document.referrer.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Mobile device check (QR scans typically happen on mobile)
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
    
    // No referrer often indicates camera/QR app opened the link directly
    const hasNoReferrer = referrer === '';
    
    return isMobile && hasNoReferrer;
}