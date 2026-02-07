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

// Set to true to skip API and always use fallback responses
const USE_FALLBACK_ONLY = true;

async function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    addMessageToChat(message, 'user');
    input.value = '';

    showTypingIndicator();

    // Small delay to feel more natural
    await new Promise(resolve => setTimeout(resolve, 500));

    if (USE_FALLBACK_ONLY) {
        // Always use smart fallback (no API needed)
        hideTypingIndicator();
        const fallbackResponse = generateFallbackResponse(message);
        addMessageToChat(fallbackResponse, 'bot');
        return;
    }

    try {
        const response = await callGeminiAPI(message);
        hideTypingIndicator();
        addMessageToChat(response, 'bot');
    } catch (error) {
        console.error('AI Error:', error);
        hideTypingIndicator();
        const fallbackResponse = generateFallbackResponse(message);
        addMessageToChat(fallbackResponse, 'bot');
    }
}

// Smart fallback when API doesn't connect
function generateFallbackResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    const searchQuery = encodeURIComponent(userMessage);

    // Fitness-related keywords
    if (msg.includes('bench') || msg.includes('chest')) {
        return `Great question about chest training! 💪 Here's a helpful video tutorial: https://youtube.com/results?search_query=bench+press+form+tutorial\n\nOr search for more info: https://google.com/search?q=${searchQuery}`;
    }
    if (msg.includes('squat') || msg.includes('leg')) {
        return `Leg day is important! 🦵 Check out this squat tutorial: https://youtube.com/results?search_query=squat+form+tutorial\n\nMore resources: https://google.com/search?q=${searchQuery}`;
    }
    if (msg.includes('deadlift') || msg.includes('back')) {
        return `Deadlifts are a great compound movement! 🏋️ Here's a form guide: https://youtube.com/results?search_query=deadlift+form+tutorial\n\nLearn more: https://google.com/search?q=${searchQuery}`;
    }
    if (msg.includes('protein') || msg.includes('nutrition') || msg.includes('diet') || msg.includes('eat')) {
        return `Nutrition is key for gains! 🥗 Here's helpful info: https://youtube.com/results?search_query=fitness+nutrition+guide\n\nMore details: https://google.com/search?q=${searchQuery}`;
    }
    if (msg.includes('workout') || msg.includes('program') || msg.includes('routine')) {
        return `Looking for a good workout program? 📋 Check these out: https://youtube.com/results?search_query=beginner+workout+program\n\nFind more: https://google.com/search?q=${searchQuery}`;
    }
    if (msg.includes('form') || msg.includes('how to')) {
        return `Good form is everything! Here's a tutorial: https://youtube.com/results?search_query=${searchQuery}\n\nOr search: https://google.com/search?q=${searchQuery}`;
    }

    // General fallback - provide search links
    return `I'd love to help with that! 🔍 Here are some resources:\n\n📺 YouTube: https://youtube.com/results?search_query=${searchQuery}\n\n🔎 Google: https://google.com/search?q=${searchQuery}\n\nFeel free to ask me anything about workouts, nutrition, or fitness! 💪`;
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
    const systemContext = `You are Iron Coach, a helpful AI assistant in a workout tracking app. You help users with ANY question they have.

Your capabilities:
- Answer fitness/workout questions (form, programming, nutrition, supplements)
- Help with general questions on any topic
- Provide helpful resources and links when relevant

Response Guidelines:
- Be helpful and provide practical solutions
- For workout topics: give science-based advice with proper form tips
- For general questions: provide clear answers or point to helpful resources
- When relevant, include useful links like:
  * YouTube tutorials: https://youtube.com/results?search_query=[topic]
  * Google search: https://google.com/search?q=[topic]
  * Wikipedia: https://en.wikipedia.org/wiki/[topic]
- Keep responses concise (3-5 sentences max)
- Use emojis to be friendly 💪
- If you don't know something, suggest a Google search link

Example: If someone asks about bench press form, you might say:
"For bench press, keep your feet flat, arch your back slightly, and grip the bar just outside shoulder width. Lower the bar to your mid-chest and press up. Here's a great tutorial: https://youtube.com/results?search_query=bench+press+form+tutorial 💪"

Now respond to this user question:`;

    // Build conversation with history
    const contents = [];

    // Add system context as first message
    contents.push({
        role: 'user',
        parts: [{ text: systemContext + '\n\n' + userMessage }]
    });

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    temperature: 0.7,
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
