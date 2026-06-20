/* js/chatbot.js — CyboBot admissions assistant */
(function () {
    'use strict';
    const chatBody  = document.getElementById('chatbot-body');
    const chatInput = document.getElementById('chatbot-input');
    const chatSend  = document.getElementById('chatbot-send');
    if (!chatBody) return;

    const botReplies = {
        'admissions process': 'Our process is simple: 1️⃣ Submit your application online, 2️⃣ Upload required transcripts & recommendation letters, and 3️⃣ Complete the faculty interview. Fall admissions close on February 1st.',
        'scholarships':       'Yes, Cybolink offers Merit Scholarships (up to 50% waiver) based on academic records and Need-Based Grants. Use our main portal to apply for these.',
        'key deadlines':      'Fall 2026 application deadlines: Early Action is Nov 15, 2025. Regular Decision is Feb 1, 2026. Transfer admissions are accepted until April 15, 2026.',
        'fee structure':      'Yearly tuition fees are: School of Tech: $24,500, School of Business: $21,000, School of Design: $21,000. Flexible split payment schedules are available.',
        'courses':            'We offer majors in Software Engineering & AI, Business Administration & Leadership, and Creative Arts & Digital Media. Check our Courses section above for highlights!',
        'hello':              'Hello! Hope you are doing great. Ask me any admissions questions!',
        'hi':                 'Hi there! How can CyboBot assist you with admissions today?'
    };

    window.handleChipClick = function (topic) {
        appendMessage(topic, 'user');
        triggerBotResponse(topic.toLowerCase());
    };

    function appendMessage(text, sender) {
        const div = document.createElement('div');
        div.classList.add('chat-msg', sender);
        div.textContent = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTyping() {
        const ind = document.createElement('div');
        ind.classList.add('typing-indicator');
        ind.id = 'typing-indicator';
        ind.innerHTML = '<span></span><span></span><span></span>';
        chatBody.appendChild(ind);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTyping() {
        const ind = document.getElementById('typing-indicator');
        if (ind) ind.remove();
    }

    function buildChips() {
        const c = document.createElement('div');
        c.classList.add('chat-chips');
        c.innerHTML = `
            <button class="chat-chip" onclick="handleChipClick('Admissions Process')">Admissions Process</button>
            <button class="chat-chip" onclick="handleChipClick('Scholarships')">Scholarships</button>
            <button class="chat-chip" onclick="handleChipClick('Key Deadlines')">Key Deadlines</button>
            <button class="chat-chip" onclick="handleChipClick('Fee Structure')">Fee Structure</button>
        `;
        return c;
    }

    function triggerBotResponse(query) {
        showTyping();
        setTimeout(() => {
            removeTyping();
            let text = "I'm CyboBot, Cybolink's admissions helper. Try selecting one of the topics below or write to info@cybolink.com for specific requests!";
            for (const key in botReplies) {
                if (query.includes(key)) { text = botReplies[key]; break; }
            }
            const div = document.createElement('div');
            div.classList.add('chat-msg', 'bot');
            div.textContent = text;
            div.appendChild(buildChips());
            chatBody.appendChild(div);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1200);
    }

    function send() {
        const val = chatInput.value.trim();
        if (!val) return;
        appendMessage(val, 'user');
        chatInput.value = '';
        triggerBotResponse(val.toLowerCase());
    }

    if (chatSend && chatInput) {
        chatSend.addEventListener('click', send);
        chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
    }
})();
