function extractPolicyText() {
    // This is a simple example. You might need more sophisticated logic to find and extract the right text.
    const policyElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    let policyText = '';
    policyElements.forEach(element => {
        policyText += element.textContent + '\n';
    });
    return policyText;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSummary") {
        const policyText = extractPolicyText();
        chrome.runtime.sendMessage({action: "summarize", text: policyText}, response => {
            sendResponse({summary: response.summary});
        });
        return true; // Indicates we wish to send a response asynchronously
    }
});
