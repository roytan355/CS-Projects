// ==========================================
// IRON PROGRESS - AI CHATBOT
// ==========================================

// Gemini API configuration
const GEMINI_API_KEY = 'AIzaSyBWPjIDPSM1WoVnflmBmkSMcGLdH8kddk0';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Chat state
let chatHistory = [];
let isChatbotOpen = false;

// Fitness resource links
const FITNESS_RESOURCES = {
    form: {
        'bench press': 'https://www.youtube.com/watch?v=4Y2ZdHCOXok',
        'squat': 'https://www.youtube.com/watch?v=ultWZbUMPL8',
        'deadlift': 'https://www.youtube.com/watch?v=hCDzSR6bW10',
        'overhead press': 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
        'pull up': 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
        'barbell row': 'https://www.youtube.com/watch?v=kBWAon7ItDw'
    },
    nutrition: {
        'protein': 'https://www.healthline.com/nutrition/how-much-protein-per-day',
        'calories': 'https://www.calculator.net/calorie-calculator.html',
        'meal prep': 'https://www.budgetbytes.com/category/extra-bytes/budget-friendly-meal-prep/',
        'macros': 'https://www.healthline.com/nutrition/how-to-count-macros'
    },
    workout: {
        'beginner': 'https://www.muscleandstrength.com/workouts/beginner-workout-routine',
        'ppl': 'https://www.reddit.com/r/Fitness/wiki/programs/ppl/',
        'strength': 'https://stronglifts.com/5x5/',
        'hypertrophy': 'https://www.aworkoutroutine.com/push-pull-legs-split/'
    }
};

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
    if (event.key === 'Enter') {
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

    // Try Gemini API first
    try {
        const response = await getGeminiResponse(message);
        hideTypingIndicator();
        addMessageToChat(response, 'bot');
    } catch (error) {
        console.error('Gemini API error:', error);
        hideTypingIndicator();
        // Fallback to smart local response
        const fallbackResponse = getSmartResponse(message);
        addMessageToChat(fallbackResponse, 'bot');
    }
}

function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    // Parse links in message
    if (sender === 'bot') {
        messageDiv.innerHTML = parseLinks(message);
    } else {
        messageDiv.textContent = message;
    }

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    chatHistory.push({ role: sender, content: message });
}

function parseLinks(text) {
    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener" style="color: var(--color-accent-electric);">$1</a>');
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// ==========================================
// GEMINI API INTEGRATION
// ==========================================
async function getGeminiResponse(message) {
    const systemPrompt = `You are Iron Coach, an expert AI fitness coach for the Iron Progress workout app. You provide helpful, science-based advice.

RULES:
1. Keep responses SHORT (2-3 sentences max)
2. Be specific and actionable
3. Use emojis to be friendly
4. ALWAYS include a helpful link when relevant - use these formats:
   - For form questions: "Check this video: [URL]"
   - For nutrition: "Learn more here: [URL]"
5. If you don't know something, say so and suggest a resource

HELPFUL LINKS TO INCLUDE:
- Bench press form: https://www.youtube.com/watch?v=4Y2ZdHCOXok
- Squat form: https://www.youtube.com/watch?v=ultWZbUMPL8  
- Deadlift form: https://www.youtube.com/watch?v=hCDzSR6bW10
- Protein info: https://www.healthline.com/nutrition/how-much-protein-per-day
- Calorie calculator: https://www.calculator.net/calorie-calculator.html
- Beginner program: https://stronglifts.com/5x5/
- PPL routine: https://www.reddit.com/r/Fitness/comments/37ylk5/a_]linear_progression_based_ppl_program_for/

EXAMPLE RESPONSES:
User: "How do I squat properly?"
Response: "Key squat cues: feet shoulder-width, brace core, push knees out, keep chest up. Descend until thighs are parallel. 🦵 Watch this tutorial: https://www.youtube.com/watch?v=ultWZbUMPL8"

User: "How much protein should I eat?"
Response: "Aim for 0.8-1g per pound of bodyweight for muscle building. So at 170lbs, eat 135-170g daily! 🥩 More info: https://www.healthline.com/nutrition/how-much-protein-per-day"`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: `${systemPrompt}\n\nUser question: ${message}` }]
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 300,
            }
        })
    });

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message);
    }

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
    }

    throw new Error('No response from API');
}

// ==========================================
// SMART LOCAL RESPONSES (FALLBACK)
// ==========================================
function getSmartResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Form questions
    if (containsAny(lowerMessage, ['bench press', 'bench form', 'how to bench'])) {
        return "Bench press tips: Arch back slightly, retract shoulder blades, grip wider than shoulders, lower to mid-chest. 🏋️ Watch this tutorial: https://www.youtube.com/watch?v=4Y2ZdHCOXok";
    }

    if (containsAny(lowerMessage, ['squat', 'how to squat'])) {
        return "Squat cues: Feet shoulder-width, brace core, push knees out, chest up, go parallel or below. 🦵 Watch: https://www.youtube.com/watch?v=ultWZbUMPL8";
    }

    if (containsAny(lowerMessage, ['deadlift', 'how to deadlift'])) {
        return "Deadlift: Bar over mid-foot, hinge hips, flat back, push floor away. Start light! 💪 Tutorial: https://www.youtube.com/watch?v=hCDzSR6bW10";
    }

    // Nutrition questions
    if (containsAny(lowerMessage, ['protein', 'how much protein'])) {
        return "Aim for 0.8-1g protein per pound of bodyweight daily for muscle building. Good sources: chicken, eggs, fish, Greek yogurt. 🥩 More info: https://www.healthline.com/nutrition/how-much-protein-per-day";
    }

    if (containsAny(lowerMessage, ['calorie', 'calories', 'how many calories', 'tdee'])) {
        return "Calories depend on your goal! Bulk: +300-500 above maintenance. Cut: -400-500 below. 📊 Calculate yours: https://www.calculator.net/calorie-calculator.html";
    }

    if (containsAny(lowerMessage, ['bulk', 'gain muscle', 'build muscle'])) {
        return "To bulk: Eat 300-500 cal surplus, 1g/lb protein, train hard with progressive overload, sleep 7-9 hours. 💪 Beginner program: https://stronglifts.com/5x5/";
    }

    if (containsAny(lowerMessage, ['cut', 'lose fat', 'lose weight'])) {
        return "For fat loss: 400-500 cal deficit, keep protein HIGH (1g/lb), lift heavy to preserve muscle, add cardio. 🔥 Track calories: https://www.myfitnesspal.com/";
    }

    // Workout questions
    if (containsAny(lowerMessage, ['program', 'routine', 'workout plan', 'beginner'])) {
        return "For beginners, try StrongLifts 5x5 (3 days/week, full body). Focus on squat, bench, deadlift, row, and OHP. 📋 Full program: https://stronglifts.com/5x5/";
    }

    if (containsAny(lowerMessage, ['ppl', 'push pull legs', 'split'])) {
        return "PPL is great for intermediates! Push (chest/shoulders/triceps), Pull (back/biceps), Legs - 6 days/week. 🏋️ Free program: https://www.reddit.com/r/Fitness/wiki/programs/ppl/";
    }

    // Greetings
    if (containsAny(lowerMessage, ['hello', 'hi', 'hey', 'help'])) {
        return "Hey! I'm Iron Coach 💪 Ask me about workout form, nutrition, or training programs. I'll give you quick tips with helpful links!";
    }

    // Default
    return "I can help with workout form, nutrition, and training! Try asking about bench press form, protein intake, or a workout program. Or check out these resources:\n• Form tutorials: https://www.youtube.com/@ataborathletics\n• Nutrition: https://www.healthline.com/nutrition";
}

function containsAny(str, keywords) {
    return keywords.some(keyword => str.includes(keyword));
}
