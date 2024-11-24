// Log when the content script is loaded
console.log("Content script loaded on:", window.location.href);


// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in content script:", message);

    if (message.action === "scrape") {
        try {
            const data = scrapeLinkedInData(); // Call scraping function
            console.log("Scraped Data:", data);
            sendResponse({ data }); // Send the scraped data back to popup.js
        } catch (error) {
            console.error("Error during scraping:", error);
            sendResponse({ error: "Failed to scrape LinkedIn data" });
        }
    }
    return true; // Required for async sendResponse
});


// Function to scrape LinkedIn data
function scrapeLinkedInData() {
    const data = {};

    try {
        // Extract full name
        const nameElement = document.querySelector('.text-heading-xlarge');
        data.fullName = nameElement ? nameElement.innerText.trim() : null;

        // Extract current position
        const positionElement = document.querySelector('.text-body-medium.break-words');
        data.currentPosition = positionElement ? positionElement.innerText.trim() : null;

        // Extract location
        const locationElement = document.querySelector('.text-body-small.inline.t-black--light.break-words');
        data.location = locationElement ? locationElement.innerText.trim() : null;

        // Extract skills (if available in the DOM)
        const skillElements = document.querySelectorAll('.pvs-list__item--one .t-bold');
        data.skills = Array.from(skillElements).map(skill => skill.innerText.trim());

        console.log("Scraped LinkedIn Data:", data);
    } catch (error) {
        console.error("Error while scraping LinkedIn data:", error);
    }

    return data;
}

