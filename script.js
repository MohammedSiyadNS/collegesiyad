/* 
   Cybolink Institute of Studies - Interactive Script
   Manages sticky headers, mobile navigation, scroll-reveal triggers, 
   real-time form validations, and the admissions chatbot.
*/

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------
       1. Mobile Navigation Menu Toggle
    ---------------------------------------------------- */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    // Close menu when a link is clicked (especially in mobile view)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu) {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    });


    /* ----------------------------------------------------
       2. Sticky Header & Active Nav Highlighting (Scroll Spy)
    ---------------------------------------------------- */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll spy highlight
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    /* ----------------------------------------------------
       3. Intersection Observer for Scroll Reveals
    ---------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });


    /* ----------------------------------------------------
       4. Admissions Section Chatbot (CyboBot)
    ---------------------------------------------------- */
    const chatBody = document.getElementById('chatbot-body');
    const chatInput = document.getElementById('chatbot-input');
    const chatSend = document.getElementById('chatbot-send');

    // Bot replies catalog
    const botReplies = {
        'admissions process': 'Our process is simple: 1️⃣ Submit your application online, 2️⃣ Upload required transcripts & recommendation letters, and 3️⃣ Complete the faculty interview. Fall admissions close on February 1st.',
        'scholarships': 'Yes, Cybolink offers Merit Scholarships (up to 50% waiver) based on academic records and Need-Based Grants. Use our main portal to apply for these.',
        'key deadlines': 'Fall 2026 application deadlines: Early Action is Nov 15, 2025. Regular Decision is Feb 1, 2026. Transfer admissions are accepted until April 15, 2026.',
        'fee structure': 'Yearly tuition fees are: School of Tech: $24,500, School of Business: $21,000, School of Design: $21,000. Flexible split payment schedules are available.',
        'courses': 'We offer majors in Software Engineering & AI, Business Administration & Leadership, and Creative Arts & Digital Media. Check our Courses section above for highlights!',
        'hello': 'Hello! Hope you are doing great. Ask me any admissions questions!',
        'hi': 'Hi there! How can CyboBot assist you with admissions today?'
    };

    // Chat chip handler (defined in global scope for HTML onclick)
    window.handleChipClick = function(topic) {
        appendMessage(topic, 'user');
        triggerBotResponse(topic.toLowerCase());
    };

    // Append message to scroll area
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender);
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Typing effect simulator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('typing-indicator');
        indicator.id = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        chatBody.appendChild(indicator);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Main Bot Response selector
    function triggerBotResponse(userQuery) {
        showTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            let botText = "I'm CyboBot, Cybolink's admissions helper. Try selecting one of the topics below or write to info@cybolink.com for specific requests!";
            
            // Clean keyword query matching
            for (const key in botReplies) {
                if (userQuery.includes(key)) {
                    botText = botReplies[key];
                    break;
                }
            }

            // Append response text and quick help chips again
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('chat-msg', 'bot');
            msgDiv.textContent = botText;

            // Add standard options block
            const chipContainer = document.createElement('div');
            chipContainer.classList.add('chat-chips');
            chipContainer.innerHTML = `
                <button class="chat-chip" onclick="handleChipClick('Admissions Process')">Admissions Process</button>
                <button class="chat-chip" onclick="handleChipClick('Scholarships')">Scholarships</button>
                <button class="chat-chip" onclick="handleChipClick('Key Deadlines')">Key Deadlines</button>
                <button class="chat-chip" onclick="handleChipClick('Fee Structure')">Fee Structure</button>
            `;
            msgDiv.appendChild(chipContainer);

            chatBody.appendChild(msgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1200);
    }

    // Input actions (Enter key and Button clicks)
    if (chatSend && chatInput) {
        chatSend.addEventListener('click', () => {
            const val = chatInput.value.trim();
            if (val) {
                appendMessage(val, 'user');
                chatInput.value = '';
                triggerBotResponse(val.toLowerCase());
            }
        });

        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = chatInput.value.trim();
                if (val) {
                    appendMessage(val, 'user');
                    chatInput.value = '';
                    triggerBotResponse(val.toLowerCase());
                }
            }
        });
    }


    /* ----------------------------------------------------
       5. Contact Enquiry Form Javascript Validation
    ---------------------------------------------------- */
    const form = document.getElementById('enquiry-form');
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const phoneInput = document.getElementById('form-phone');
    const messageInput = document.getElementById('form-message');
    const toastSuccess = document.getElementById('toast-success');

    // Helper functions
    function showError(inputElement) {
        const parent = inputElement.parentElement;
        parent.classList.add('error');
    }

    function clearError(inputElement) {
        const parent = inputElement.parentElement;
        parent.classList.remove('error');
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    // Check individual inputs
    function checkFormValidity() {
        let isValid = true;

        // Name Check
        if (nameInput.value.trim() === '') {
            showError(nameInput);
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Email Check
        if (emailInput.value.trim() === '') {
            showError(emailInput);
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput);
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Phone Check
        if (phoneInput.value.trim() === '') {
            showError(phoneInput);
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        // Message Check
        if (messageInput.value.trim() === '') {
            showError(messageInput);
            isValid = false;
        } else {
            clearError(messageInput);
        }

        return isValid;
    }

    // Clear error states dynamically on type/focus
    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                clearError(input);
            });
        }
    });

    // Form submit listener
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const isFormValid = checkFormValidity();
            
            if (isFormValid) {
                // Success: reset form fields and show toast
                form.reset();
                
                if (toastSuccess) {
                    toastSuccess.classList.add('show');
                    
                    setTimeout(() => {
                        toastSuccess.classList.remove('show');
                    }, 4000);
                }
            }
        });
    }

});
