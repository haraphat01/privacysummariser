async function summarizeText(text) {
    const API_KEY = '';
    const API_URL = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that summarizes terms and policies."
                },
                {
                    role: "user",
                    content: `Summarize the following terms and policies concisely:\n\n${text}`
                }
            ],
            max_tokens: 1500,
            temperature: 0.7
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize") {
        summarizeText(request.text).then(summary => {
            sendResponse({summary: summary});
        });
        return true; // Indicates we wish to send a response asynchronously
    }
});