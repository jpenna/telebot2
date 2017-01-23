/* eslint no-undef:off */

const expect = require('expect');
const request = require('supertest');
const { app } = require('../../server');
const { User } = require('../../db/model/user');

describe('authenticate', () => {
  describe('GET /views/chatRoom', () => {
    before(() => {
      token = '123';
    });

    beforeEach(() => {
      findUserSpy = expect.spyOn(User, 'findUserByToken');
    });

    afterEach(() => {
      findUserSpy.restore();
    });

    it('should check token cookie', (done) => {
      request(app)
      .get('/views')
      .set('Cookie', `token=${token}`)
      .end((err) => {
        expect(findUserSpy).toHaveBeenCalled();
        expect(findUserSpy.calls[0].arguments).toEqual(token);
        done(err);
      });
    });

    it('should redirect 401 to /views/login if no token cookie found', (done) => {
      findUserSpy.reset();

      request(app)
      .get('/views')
      .expect(401)
      .expect('x-authorization', 'No token cookie')
      .expect('location', '/views/login')
      .end((err) => {
        expect(findUserSpy).toNotHaveBeenCalled();
        done(err);
      });
    });

    it('should redirect 401 to /views/login if no user found', (done) => {
      findUserSpy.andReturn(new Promise(resolve => resolve()));

      request(app)
      .get('/views')
      .set('Cookie', `token=${token}`)
      .expect(401)
      .expect('x-authorization', 'No user found')
      .expect('location', '/views/login')
      .end((err) => {
        done(err);
      });
    });

    it('should redirect 401 to /views/login if token expired', (done) => {
      findUserSpy.andReturn(new Promise((resolve) => {
        resolve(
          { expiration_date: new Date().getTime() - 9999999 }
        );
      }));

      request(app)
      .get('/views')
      .set('Cookie', `token=${token}`)
      .expect(401)
      .expect('x-authorization', 'Token expired')
      .expect('location', '/views/login')
      .end((err) => {
        expect(findUserSpy).toHaveBeenCalled();
        done(err);
      });
    });

    it('should should call next()', (done) => {
      findUserSpy.andReturn(new Promise((resolve) => {
        resolve(
          { expiration_date: new Date().getTime() + 99999999 }
        );
      }));

      request(app)
      .get('/views')
      .set('Cookie', `token=${token}`)
      .expect(301)
      .end((err) => {
        done(err);
      });
    });
  });

  describe('auth POST /sendcode', () => {
    // better to separate each reaquest on it's own function?
    it('should create user if not registered');
    it('should set token cookie');
  });
});
