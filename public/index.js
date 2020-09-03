const socket = io();
const form = id('login')
const chatbox = id('chat-box')
const sendMsg = id('sendMsg')
var username;
form.addEventListener('submit', function(e){
    e.preventDefault()
    username = id('username').value
    socket.emit('joinRoom', { username: username, room :id('room').value });
    form.style.display = 'none';
    chatbox.style.display = 'block';
})

sendMsg.addEventListener('submit', function(e){
    e.preventDefault()
    socket.emit('sendMessage', {message: id('msg').value, username:username })
})

socket.on('message', msg => {
    console.log(msg)
    if(Array.isArray(msg)){
        msg.forEach(m => {
            addMsg(m)
        })
    } else {
        addMsg(msg)
    }
});
socket.on('notify', msg => {
    console.log(msg)
});

socket.on('roomUsers', users => {
    console.log(users)
});

function addMsg(msg) {
    const div = document.createElement('div')
    div.innerHTML = `
        <p>${msg.message}</p>
        <span>${msg.username}</span>
        <span>${msg.time}</span>
    `;
    chatbox.append(div)
}
function id(id){
    return document.getElementById(id)
}