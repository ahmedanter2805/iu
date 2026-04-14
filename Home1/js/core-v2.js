/**
 * IU University - Core Feature Logic (Design-Preserving)
 */

document.addEventListener('DOMContentLoaded', () => {
    initNotifications();
    initChatbot();
    initSearch();
});

// 1. Notification System
function showNotification(message, type = 'info') {
    const container = document.getElementById('iu-notification-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `iu-toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }, 100);
}

function initNotifications() {
    const container = document.createElement('div');
    container.id = 'iu-notification-container';
    document.body.appendChild(container);

    // Initial Welcome Notification
    setTimeout(() => {
        showNotification("Welcome back to IU Portal!", "success");
    }, 2000);
}

// 2. Chatbot Logic
function initChatbot() {
    const chatBtn = document.createElement('button');
    chatBtn.id = 'iu-chat-trigger';
    chatBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
    chatBtn.onclick = toggleChat;
    document.body.appendChild(chatBtn);

    const chatWindow = document.createElement('div');
    chatWindow.id = 'iu-chatbot-window';
    chatWindow.innerHTML = `
        <div class="iu-chat-header">
            <span>IU Smart Assistant</span>
            <button onclick="toggleChat()"><i class="fas fa-times"></i></button>
        </div>
        <div class="iu-chat-body" id="iu-chat-body">
            <div class="bot-msg">Hello! How can I help you academic-wise today?</div>
        </div>
        <div class="iu-chat-footer">
            <input type="text" id="iu-chat-input" placeholder="Type a message...">
            <button onclick="sendChatMessage()"><i class="fas fa-paper-plane"></i></button>
        </div>
    `;
    document.body.appendChild(chatWindow);

    document.getElementById('iu-chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
}

function toggleChat() {
    const win = document.getElementById('iu-chatbot-window');
    win.classList.toggle('open');
}

function sendChatMessage() {
    const input = document.getElementById('iu-chat-input');
    const body = document.getElementById('iu-chat-body');
    if (!input.value.trim()) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'user-msg';
    userMsg.textContent = input.value;
    body.appendChild(userMsg);

    // Bot Response Simulation
    const botMsg = document.createElement('div');
    botMsg.className = 'bot-msg';
    botMsg.textContent = "Let me look that up for you...";
    body.appendChild(botMsg);

    input.value = '';
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
        botMsg.textContent = "I'm currently in 'Learn Mode'. Please contact admission for specific details.";
        body.scrollTop = body.scrollHeight;
    }, 1000);
}

// 3. Search Logic
function initSearch() {
    const searchInput = document.getElementById('iu-global-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? '' : 'none';
        });
    });
}
