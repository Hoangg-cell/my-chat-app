const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('msg-input');
const messagesContainer = document.getElementById('chat-messages');

// Gửi tin nhắn lên server khi bấm Gửi
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

// Nhận tin nhắn từ server và hiển thị lên màn hình
socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = msg;
    messagesContainer.appendChild(messageElement);
    
    // Tự động cuộn xuống tin nhắn mới nhất
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});