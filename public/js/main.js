// DOM에서 ID가 'chat-form'의 정보를 chatForm변수로 갖고온다.
const chatForm = document.getElementById('chat-form');

// // DOM에서 ID가 'chat-message'의 정보를 갖고온다.
// const chatData = document.getElementById('chat-message');

const socket = io(); 

// server쪽에 온 message(../../server.js)를 console.log로 출력
socket.on('message', message => {
    console.log(message);
    
    // message를 outputMessage함수로 전달
    outputMessage(message);
})

// 채팅 message listiner생성
chatForm.addEventListener('submit', (e) => {
    // 페이지가 새로고침 되서 
    // 초기화 하는것을 방지
    e.preventDefault();

    // 이벤트 타겟에서 msg(chat.html참고) id를 가진
    // 테그의 value(text)값을 갖고온다.
    const msg = e.target.elements.msg.value;

    // client쪽에서 message를 server쪽으로 보낸다
    socket.emit('chatMessage', msg);

    // // message가 제대로 입력이 되는지 확인하는 console.log
    // console.log(msg);

});

// message를 Dom에 보내서 채팅창에 나타내기
function outputMessage(message) {
    // div 요소를 생성한다.
    const div = document.createElement('div');
    // class이름을 message로 한다.
    div.classList.add('message');



    // div tag안에 입력할 내용을 넣는다(message)
    div.innerHTML = `
        <p class = "meta">Brad <span>  </span></p>
        <p class="text">
        ${message}
        </p>
    `;

    // class이름이 chat-messages에 div를 appendChild한다.(추가)
    document.querySelector('.chat-messages').appendChild(div);


}