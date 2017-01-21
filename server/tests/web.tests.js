describe('web sendMessage()', () => {
  it('should construct messageData');
  it('should emit "newMessage" with messageData');
});

describe('web newChat()', () => {
  it('should construct chatData');
  it('should emit "newChat" with chatData');
});

describe('web on(getChats)', () => {
  it('should return "undefined" if there is no chats');
  it('should return object with chats object');
  it('should return all messages only for the first chat');
});

describe('web on(getChatMessages)', () => {
  it('should emit all messages for selected chat');
  it('should not emit any message if there is no chat');
});

describe('web on(sendTelegram)', () => {
  it('should create postData object (chat_id, text)');
  it('should post to /sendMessage');
  it('should insert message with right params');
});
