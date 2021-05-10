const path = require('path'); // 정적경로 불러오기
const http = require('http');
const express = require('express');
const sockitio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = sockitio(server);

// client쪽에서 연결시도하면 sockit io 연결
io.on('connection', socket => {
    // socket io에 연결됬음을 console.log로 알려줍니다.
    console.log('New WS connection.'); 

    // socket쪽에 message를 보냅니다. 
    // socket.emit는 socket에 연결된 개인(본인)만 메세지를 보낼수 있게 합니다.
    socket.emit("message","Wellcome to chat course."); // 환영메세지

    // socket.brodcast.emit는 본인을 제외한 socket에 연결된 모든유저에게
    // 메세지를 전달합니다.
    socket.broadcast.emit("message", "A user has join the App"); // 대화참여 메세지

    // // io.emit는 전체(소켓에 접속한 유저들)에 메세지를 보냄
    // io.emit()

    // client쪽에서 연결을 닫을시 disconnect사용
    // 반드시 io.on안에 있어야함
    socket.on('disconnect', () => {
        io.emit("message", "user has left the chat");
    });

    // socket쪽에서 server로 메세지를 보낸다.
    socket.on("chatMessage", (msg) => {
        // server에서 제대로 받는지 확인하는 console.log
        console.log(msg);
        // socket에 접속한 모든 유저들한테 메세지(msg)를 보낸다
        io.emit("message", msg);
    })
})

PORT = 5000 || process.env.PORT;

// 정적폴더 사용하기
app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => {
    console.log(`server is running PORT : ${PORT}`);
});