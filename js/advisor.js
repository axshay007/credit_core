// AI Advisor functionality for Credit Core

// Simulated AI responses database
const aiResponses = {
    'improve credit score': {
        response: "Here are the most effective ways to improve your credit score:\n\n1. **Pay bills on time** - Payment history is 35% of your score\n2. **Keep credit utilization low** - Aim for under 30%, ideally under 10%\n3. **Don't close old credit cards** - Length of credit history matters\n4. **Pay down existing debt** - Lower balances improve your utilization ratio\n5. **Consider becoming an authorized user** on someone else's account\n6. **Check your credit report** for errors and dispute them\n\nWith consistent effort, you can see improvements in 3-6 months!",
        followUp: ["How long does it take to see improvements?", "What's the fastest way to boost my score?", "Should I pay off all my cards?"]
    },
    'credit utilization': {
        response: "Credit utilization is the percentage of your available credit that you're using. Here's what you need to know:\n\n**Ideal utilization rates:**\n• Overall: Under 30% (preferably under 10%)\n• Per card: Under 30% on each individual card\n\n**Tips to optimize utilization:**\n• Pay balances before statement dates\n• Request credit limit increases\n• Spread balances across multiple cards\n• Make multiple payments per month\n\nFor example, if you have a $10,000 limit, keep your balance under $1,000 for the best score impact.",
        followUp: ["When should I pay my credit card?", "How do I request a credit limit increase?", "Is 0% utilization bad?"]
    },
    'pay off debt': {
        response: "Here are proven strategies to pay off debt faster:\n\n**Debt Avalanche Method:**\n• Pay minimums on all cards\n• Put extra money toward highest APR card\n• Saves the most money in interest\n\n**Debt Snowball Method:**\n• Pay minimums on all cards\n• Put extra money toward smallest balance\n• Provides psychological wins\n\n**Additional strategies:**\n• Balance transfer to 0% APR card\n• Debt consolidation loan\n• Side hustle for extra income\n• Cut expenses temporarily\n\nThe key is choosing a method and sticking to it consistently!",
        followUp: ["Which method is better for me?", "How do balance transfers work?", "Should I use my savings to pay off debt?"]
    },
    'first credit card': {
        response: "Great question! Here are the best credit cards for beginners:\n\n**Student Cards:**\n• Discover it Student Cash Back\n• Capital One SavorOne Student\n• Chase Freedom Student\n\n**Secured Cards:**\n• Discover it Secured\n• Capital One Platinum Secured\n• Citi Secured Mastercard\n\n**Starter Cards:**\n• Capital One Platinum\n• Credit One Bank Platinum\n\n**Tips for first-time cardholders:**\n• Start with one card\n• Keep utilization under 30%\n• Pay in full every month\n• Set up autopay for at least the minimum\n\nBuilding credit takes time, but starting early is key!",
        followUp: ["What's the difference between secured and unsecured cards?", "How much credit limit should I start with?", "When can I upgrade to a better card?"]
    },
    'default': {
        response: "I understand you're looking for financial guidance. I can help with:\n\n• **Credit Score Improvement** - Strategies to boost your score\n• **Debt Management** - Payoff strategies and consolidation\n• **Credit Cards** - Choosing the right card for your needs\n• **Credit Utilization** - Optimizing your credit usage\n• **Financial Planning** - Budgeting and saving tips\n• **Credit Reports** - Understanding and monitoring your credit\n\nWhat specific area would you like to explore? Feel free to ask about any financial topic!",
        followUp: ["How do I check my credit score?", "What's a good credit score?", "How do I build credit from scratch?"]
    }
};

// Chat history
let chatHistory = [];

// Initialize advisor
document.addEventListener('DOMContentLoaded', function() {
    loadChatHistory();
    setupChatInput();
});

// Load chat history from localStorage
function loadChatHistory() {
    const savedHistory = JSON.parse(localStorage.getItem('creditCoreChatHistory')) || [];
    chatHistory = savedHistory;
    
    // Display saved messages
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && chatHistory.length > 0) {
        // Clear initial message if there's saved history
        chatMessages.innerHTML = '';
        
        chatHistory.forEach(message => {
            displayMessage(message.content, message.type, false);
        });
    }
}

// Save chat history to localStorage
function saveChatHistory() {
    localStorage.setItem('creditCoreChatHistory', JSON.stringify(chatHistory));
}

// Setup chat input functionality
function setupChatInput() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Send message function
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Display user message
    displayMessage(message, 'user');
    
    // Add to history
    chatHistory.push({ content: message, type: 'user', timestamp: new Date().toISOString() });
    
    // Clear input
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate AI response after delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateAIResponse(message);
        displayMessage(response.text, 'ai');
        
        // Add to history
        chatHistory.push({ content: response.text, type: 'ai', timestamp: new Date().toISOString() });
        
        // Show follow-up questions if available
        if (response.followUp && response.followUp.length > 0) {
            setTimeout(() => {
                showFollowUpQuestions(response.followUp);
            }, 500);
        }
        
        // Save history
        saveChatHistory();
    }, 1000 + Math.random() * 1000); // Random delay for realism
}

// Ask predefined question
function askQuestion(question) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = question;
    sendMessage();
}

// Display message in chat
function displayMessage(content, type, saveToHistory = true) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = formatMessageContent(content);
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Animate message appearance
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

// Format message content (convert markdown-like formatting)
function formatMessageContent(content) {
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/•/g, '&bull;');
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'message-content';
    typingContent.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    
    typingDiv.appendChild(typingContent);
    chatMessages.appendChild(typingDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add CSS for typing animation
    if (!document.getElementById('typingStyles')) {
        const style = document.createElement('style');
        style.id = 'typingStyles';
        style.textContent = `
            .typing-dots {
                display: flex;
                gap: 4px;
                align-items: center;
            }
            .typing-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #6b7280;
                animation: typing 1.4s infinite ease-in-out;
            }
            .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
            .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
            @keyframes typing {
                0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                40% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Generate AI response based on user input
function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Find best matching response
    let bestMatch = 'default';
    let bestScore = 0;
    
    Object.keys(aiResponses).forEach(key => {
        if (key === 'default') return;
        
        const keywords = key.split(' ');
        let score = 0;
        
        keywords.forEach(keyword => {
            if (message.includes(keyword)) {
                score += 1;
            }
        });
        
        if (score > bestScore) {
            bestScore = score;
            bestMatch = key;
        }
    });
    
    // Add some personalization based on user's credit score
    let personalizedResponse = aiResponses[bestMatch].response;
    
    if (window.CreditCore && window.CreditCore.userPreferences) {
        const creditScore = window.CreditCore.userPreferences.creditScore || 720;
        
        if (bestMatch === 'improve credit score') {
            if (creditScore >= 750) {
                personalizedResponse = "Great news! With a credit score of " + creditScore + ", you're already in excellent territory. " + personalizedResponse;
            } else if (creditScore >= 670) {
                personalizedResponse = "Your current score of " + creditScore + " is good, but there's room for improvement. " + personalizedResponse;
            } else {
                personalizedResponse = "With a score of " + creditScore + ", focusing on these strategies will help you see significant improvements. " + personalizedResponse;
            }
        }
    }
    
    return {
        text: personalizedResponse,
        followUp: aiResponses[bestMatch].followUp || []
    };
}

// Show follow-up questions
function showFollowUpQuestions(questions) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const followUpDiv = document.createElement('div');
    followUpDiv.className = 'message ai-message follow-up-questions';
    
    const followUpContent = document.createElement('div');
    followUpContent.className = 'message-content';
    
    let followUpHTML = '<div style="margin-bottom: 10px; font-weight: 600;">You might also want to know:</div>';
    
    questions.forEach(question => {
        followUpHTML += `<div class="follow-up-question" onclick="askQuestion('${question}')" style="
            padding: 8px 12px;
            margin: 5px 0;
            background: rgba(37, 99, 235, 0.1);
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.9rem;
        " onmouseover="this.style.background='rgba(37, 99, 235, 0.2)'" onmouseout="this.style.background='rgba(37, 99, 235, 0.1)'">${question}</div>`;
    });
    
    followUpContent.innerHTML = followUpHTML;
    followUpDiv.appendChild(followUpContent);
    chatMessages.appendChild(followUpDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Clear chat history
function clearChatHistory() {
    if (confirm('Are you sure you want to clear your chat history?')) {
        chatHistory = [];
        localStorage.removeItem('creditCoreChatHistory');
        
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = `
                <div class="message ai-message">
                    <div class="message-content">
                        Hello! I'm your AI credit advisor. I can help you with credit scores, debt management, and financial planning. What would you like to know?
                    </div>
                </div>
            `;
        }
    }
}

// Export functions
window.CreditAdvisor = {
    sendMessage,
    askQuestion,
    clearChatHistory,
    generateAIResponse
};

