describe('authenticate', () => {

  describe('auth GET /views/chatRoom', () => {
    it('should check token cookie');
    it('should redirect 401 to /views/login if no token cookie found');
    it('should redirect 401 to /views/login if no user found');
    it('should redirect 401 to /views/login if token expired');
    it('should should call next()');
  });

  describe('auth POST /sendcode', () => {
    it('should create user if not registered');
    it('should set token cookie');
  });
});
