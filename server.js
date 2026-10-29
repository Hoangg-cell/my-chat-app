const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Cấu hình để phục vụ các file tĩnh trong thư mục public
app.use(express.static('public'));

// Lắng nghe sự kiện kết nối từ client
io.on('connection', (socket) => {
    console.log('Một user đã kết nối:', socket.id);

    // Lắng nghe sự kiện gửi tin nhắn từ client
    socket.on('chat message', (msg) => {
        // Phát lại tin nhắn cho tất cả mọi người (bao gồm cả người gửi)
        io.emit('chat message', msg);
    });

    // Khi user ngắt kết nối
    socket.on('disconnect', () => {
        console.log('User đã ngắt kết nối:', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});