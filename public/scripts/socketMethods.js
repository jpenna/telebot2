socket.on('newChat', function (data) {

    console.log('new client: ', user );

    let userData = {
        chatId: user.chat_id,
        first_name: user.firstname,
        last_name: user.lastname,
        avatar: user.avatar,
        messages: []
    }

    console.log(userData)

    window.newUser(userData)
});

socket.on('newMessage', function (msgObj) {

    console.log('chat message: ', msgObj);

    let msgData = {
        chatId: msgObj.chat_id,
        author: msgObj.author,
        type: msgObj.type,
        text: msgObj.message,
        sentAt: msgObj.sentAt
    }

    console.log(msgData);

    window.newMessage(msgData)
});
