document.addEventListener('DOMContentLoaded', function() {
    const summarizeButton = document.getElementById('summarize');
    const summaryDiv = document.getElementById('summary');

    summarizeButton.addEventListener('click', function() {
        // Show loading message
        summaryDiv.textContent = "Summarizing...";
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "getSummary"}, function(response) {
                if (response && response.summary) {
                    // Format the summary
                    const formattedSummary = formatSummary(response.summary);
                    summaryDiv.innerHTML = formattedSummary;
                } else {
                    summaryDiv.textContent = "Unable to generate summary. Please make sure you're on a page with terms and policies.";
                }
            });
        });
    });

    function formatSummary(summary) {
        // Split the summary into paragraphs
        const paragraphs = summary.split('\n').filter(p => p.trim() !== '');
        
        // Join paragraphs with HTML line breaks
        return paragraphs.join('<br><br>');
    }
});