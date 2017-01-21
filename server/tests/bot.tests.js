describe('bot /start', () => {
  it('should create chat in DB');
  it('should send new chat to web');
  it('should reply to user');
});

describe('bot /text', () => {
  it('should save message in DB');
  it('should send message to web');
  it('should reply to user');

  it('should create chat if inexitant');
  it('should sae message after create inexistant chat');
});

describe('botReply send()', () => {
  it('should reply client with msg param');
  it('should send message to web');
  it('should save message in db');
});

describe('utils getUserAvatar()', () => {
  it('should post /getUserProfilePhotos and return UserProfilePhotos obj (file_id, *_size, *_path)');
  it('should post /getFile and return file_path');
  it('should create write stream to /public/img/avatars');
  it('should request /file/*/file_path and pipe response');
});
