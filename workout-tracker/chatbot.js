// ==========================================
// IRON PROGRESS - AI FITNESS COACH (Gemini Powered)
// ==========================================

// Gemini API configuration
const GEMINI_API_KEY = 'AIzaSyBWPjIDPSM1WoVnflmBmkSMcGLdH8kddk0';

// Chat state
let chatHistory = [];
let isChatbotOpen = false;

// ==========================================
// CHATBOT UI
// ==========================================
function toggleChatbot() {
    const chatWindow = document.getElementById('chatbot-window');
    isChatbotOpen = !isChatbotOpen;

    if (isChatbotOpen) {
        chatWindow.classList.remove('hidden');
        document.getElementById('chatbot-input').focus();
    } else {
        chatWindow.classList.add('hidden');
    }
}

function handleChatKeypress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    addMessageToChat(message, 'user');
    input.value = '';

    showTypingIndicator();

    try {
        const response = await callGeminiAPI(message);
        hideTypingIndicator();
        addMessageToChat(response, 'bot');
    } catch (error) {
        console.error('AI Error:', error);
        hideTypingIndicator();
        addMessageToChat("Sorry, I'm having trouble connecting. Try asking about squats, protein, or workout routines! 💪", 'bot');
    }
}

function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    // Make links clickable for bot messages
    if (sender === 'bot') {
        // Convert URLs to clickable links
        const urlRegex = /(https?:\/\/[^\s\)]+)/g;
        const formattedMessage = message.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
        messageDiv.innerHTML = formattedMessage;
    } else {
        messageDiv.textContent = message;
    }

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store in history for context
    chatHistory.push({ role: sender === 'user' ? 'user' : 'model', content: message });

    // Keep only last 10 messages for context
    if (chatHistory.length > 10) {
        chatHistory = chatHistory.slice(-10);
    }
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// ==========================================
// GEMINI API - Direct Call
// ==========================================
async function callGeminiAPI(userMessage) {
    const systemContext = `You are Iron Coach, an AI fitness assistant. You are knowledgeable about:
- Weightlifting (form, programming, progressions)
- Nutrition (macros, meal planning, supplements)  
- Bodybuilding and strength training
- Exercise science and recovery

Guidelines:
- Give helpful, science-based fitness advice
- Be conversational and encouraging
- Keep responses concise (2-4 sentences)
- Use relevant emojis
- If asked about specific exercises, explain proper form
- You can discuss any topic, but specialize in fitness

You're chatting with a user of the Iron Progress workout tracking app.`;

    // Build conversation with history
    const contents = [];

    // Add system context as first message
    contents.push({
        role: 'user',
        parts: [{ text: systemContext + '\n\nUser: ' + userMessage }]
    });

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    temperature: 0.8,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 500,
                },
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
                ]
            })
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Response Error:', errorData);
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract the response text
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
    }

    // Check for blocked response
    if (data.candidates && data.candidates[0] && data.candidates[0].finishReason === 'SAFETY') {
        return "I can't respond to that, but I'm happy to help with fitness questions! Try asking about workout routines or nutrition. 💪";
    }

    throw new Error('No valid response from AI');
}
