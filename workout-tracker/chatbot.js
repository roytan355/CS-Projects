// ==========================================
// IRON PROGRESS - AI CHATBOT
// ==========================================

// Gemini API configuration (set your API key here)
const GEMINI_API_KEY = 'AIzaSyBWPjIDPSM1WoVnflmBmkSMcGLdH8kddk0'; // Add your Gemini API key here
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Demo mode - uses smart pre-built responses when API key is not set
const CHATBOT_DEMO_MODE = !GEMINI_API_KEY;

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
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message to chat
    addMessageToChat(message, 'user');
    input.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Get response
    if (CHATBOT_DEMO_MODE) {
        // Use smart local responses
        setTimeout(() => {
            hideTypingIndicator();
            const response = getSmartResponse(message);
            addMessageToChat(response, 'bot');
        }, 800 + Math.random() * 700);
    } else {
        // Use Gemini API
        getGeminiResponse(message);
    }
}

function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    chatHistory.push({ role: sender, content: message });
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
// SMART LOCAL RESPONSES
// ==========================================
function getSmartResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Diet and nutrition questions
    if (containsAny(lowerMessage, ['protein', 'how much protein', 'protein intake'])) {
        return "For muscle building, aim for 0.8-1g of protein per pound of bodyweight daily. Good sources include chicken breast (31g per 100g), eggs (6g each), Greek yogurt (17g per cup), and protein powder (25g per scoop). Spread your intake across 4-5 meals! 🥩";
    }

    if (containsAny(lowerMessage, ['calorie', 'calories', 'how many calories', 'tdee'])) {
        return "Your calorie needs depend on your goals! For muscle gain, eat 300-500 calories above maintenance. For fat loss, stay 400-500 below. Use our Nutrition Calculator tab for personalized numbers based on your stats! 📊";
    }

    if (containsAny(lowerMessage, ['bulk', 'bulking', 'gain weight', 'gain muscle'])) {
        return "For a successful bulk: 1) Eat 300-500 calories above maintenance, 2) Hit 1g protein per lb bodyweight, 3) Train with progressive overload, 4) Sleep 7-9 hours, 5) Be patient - aim for 0.5-1lb/week gain to minimize fat. You've got this! 💪";
    }

    if (containsAny(lowerMessage, ['cut', 'cutting', 'lose weight', 'lose fat', 'diet'])) {
        return "For fat loss: 1) Create a 400-500 calorie deficit, 2) Keep protein HIGH (1g/lb) to preserve muscle, 3) Lift heavy to maintain strength, 4) Add some cardio, 5) Stay hydrated. Aim for 0.5-1lb loss per week. Stay consistent! 🔥";
    }

    if (containsAny(lowerMessage, ['meal', 'eat', 'food', 'what should i eat'])) {
        return "Great lifting foods: Chicken, salmon, eggs, beef, Greek yogurt (protein). Rice, oats, potatoes, fruits (carbs). Avocado, nuts, olive oil (fats). Check the Nutrition tab for a personalized meal plan based on your goals! 🍽️";
    }

    // Exercise form questions
    if (containsAny(lowerMessage, ['bench press', 'bench form'])) {
        return "Bench press tips: 1) Arch your back slightly, 2) Retract shoulder blades, 3) Grip slightly wider than shoulder width, 4) Lower bar to mid-chest, 5) Drive feet into floor, 6) Press up in a slight arc. Check our Tutorials section for video guides from Jeff Nippard and AthleanX! 🏋️";
    }

    if (containsAny(lowerMessage, ['squat', 'squat form'])) {
        return "Squat fundamentals: 1) Feet shoulder-width apart, toes slightly out, 2) Brace your core, 3) Keep chest up, 4) Push knees out over toes, 5) Descend until thighs are parallel or below, 6) Drive through mid-foot. Mobility work helps! Check our Tutorials tab for detailed videos. 🦵";
    }

    if (containsAny(lowerMessage, ['deadlift', 'deadlift form'])) {
        return "Deadlift cues: 1) Feet hip-width apart, 2) Bar over mid-foot, 3) Hinge at hips to grip bar, 4) Flatten back and brace, 5) Push floor away with legs, 6) Lock out hips at top. Start light and master form first! Watch Alan Thrall's 5-step setup video in our Tutorials. 💪";
    }

    if (containsAny(lowerMessage, ['form', 'technique', 'how to do'])) {
        return "For proper exercise form, check out our Tutorials section in the Badges tab! We have curated videos from top coaches like Jeff Nippard, AthleanX, and Alan Thrall. Which specific exercise do you need help with? 🎬";
    }

    // Workout and programming questions
    if (containsAny(lowerMessage, ['program', 'routine', 'split', 'how often'])) {
        return "For beginners: 3 days/week full body. Intermediate: Push/Pull/Legs (6 days) or Upper/Lower (4 days). Key: progressive overload - add weight or reps each week. Compound movements (squat, bench, deadlift, OHP, rows) should be your foundation! 📋";
    }

    if (containsAny(lowerMessage, ['rest', 'recovery', 'sleep'])) {
        return "Recovery is when muscles grow! Tips: 1) Sleep 7-9 hours nightly, 2) Rest muscle groups 48-72 hours between sessions, 3) Eat enough protein & calories, 4) Stay hydrated, 5) Manage stress. Don't skip rest days - they're part of the program! 😴";
    }

    if (containsAny(lowerMessage, ['plateau', 'stuck', 'not progressing'])) {
        return "Hitting a plateau? Try: 1) Deload week (50% volume), 2) Vary rep ranges, 3) Add more volume gradually, 4) Improve sleep/nutrition, 5) Try different exercise variations. Sometimes your body just needs a reset! Track your workouts here to spot patterns. 📈";
    }

    if (containsAny(lowerMessage, ['warm up', 'warmup', 'before workout'])) {
        return "Good warmup: 1) 5 min light cardio, 2) Dynamic stretches (leg swings, arm circles), 3) Activation work (band pull-aparts, glute bridges), 4) Warm-up sets with increasing weight before working sets. Never skip the warmup - it prevents injuries! 🔥";
    }

    // App navigation
    if (containsAny(lowerMessage, ['log', 'track', 'add workout', 'how do i use'])) {
        return "To log a workout: 1) Go to the 💪 Log tab, 2) Select date and exercise, 3) Enter sets, reps, and weight, 4) Click 'Add Exercise', 5) Click 'Finish Workout' when done. Your data is saved automatically and you can track progress in the 📊 Progress tab!";
    }

    if (containsAny(lowerMessage, ['badge', 'achievement', 'unlock'])) {
        return "Badges are unlocked automatically when you hit strength milestones! For example, bench 135 lbs to get 'One Plate Club', or squat 225 for 'Two Plate Squatter'. Check the 🏆 Badges tab to see all available achievements and your progress! 🏅";
    }

    if (containsAny(lowerMessage, ['tutorial', 'video', 'learn'])) {
        return "Find video tutorials in the 🏆 Badges tab - scroll down to 'Form Tutorials'. Select any exercise to see curated videos from Jeff Nippard, AthleanX, Alan Thrall and more. Great for learning proper form! 🎬";
    }

    // Greetings and general
    if (containsAny(lowerMessage, ['hello', 'hi', 'hey', 'sup', 'what\'s up'])) {
        return "Hey there! 👋 I'm your AI fitness coach. Ask me about workout routines, proper form, nutrition, or how to use this app. What can I help you with today?";
    }

    if (containsAny(lowerMessage, ['thanks', 'thank you', 'helpful'])) {
        return "You're welcome! 💪 Keep crushing those workouts. I'm here whenever you need advice on training, nutrition, or form. Let's get those gains!";
    }

    if (containsAny(lowerMessage, ['help', 'what can you do'])) {
        return "I can help you with:\n• 🏋️ Exercise form and technique\n• 🥗 Nutrition and diet advice\n• 📋 Workout programming\n• 💪 Building muscle / losing fat\n• 🏆 Using this app's features\n\nJust ask me anything fitness-related!";
    }

    // Default response
    return "Great question! While I'm in demo mode, I can help with basic fitness questions about form, nutrition, and workouts. For more advanced AI responses, add a Gemini API key in chatbot.js. Meanwhile, try asking about bench press form, protein intake, or how to bulk! 🤖";
}

function containsAny(str, keywords) {
    return keywords.some(keyword => str.includes(keyword));
}

// ==========================================
// GEMINI API INTEGRATION
// ==========================================
async function getGeminiResponse(message) {
    const systemPrompt = `You are an expert AI fitness coach integrated into the Iron Progress workout tracking app. You provide helpful, science-based advice on:
- Exercise form and technique
- Workout programming and routines
- Nutrition, diet, and supplements
- Muscle building and fat loss
- Using the app's features (workout logging, badges, nutrition calculator, tutorials)

Keep responses concise (2-4 sentences max), friendly, and actionable. Use relevant emojis. If asked about app features, mention specific tabs like "💪 Log", "🏆 Badges", "📊 Progress", or "🥗 Nutrition".`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nUser: ${message}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 200,
                }
            })
        });

        const data = await response.json();
        hideTypingIndicator();

        if (data.candidates && data.candidates[0]) {
            const botResponse = data.candidates[0].content.parts[0].text;
            addMessageToChat(botResponse, 'bot');
        } else {
            addMessageToChat("Sorry, I couldn't process that. Try asking about workouts, nutrition, or form!", 'bot');
        }
    } catch (error) {
        console.error('Gemini API error:', error);
        hideTypingIndicator();
        addMessageToChat("I'm having trouble connecting. Let me use my local knowledge instead!", 'bot');
        setTimeout(() => {
            const fallbackResponse = getSmartResponse(message);
            addMessageToChat(fallbackResponse, 'bot');
        }, 500);
    }
}
