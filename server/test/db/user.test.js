/* eslint-disable */
require('../../config/config');
const expect = require('expect');
const { User } = require('../../db/model/user');

describe.only('User', () => {
  before(() => {
    user1 = {
      id: 1,
      token: 'asdfqwer',
      email: 'em@ex.com',
      expiration_date: new Date(),
    };

    id = 2;
    email = 'email@ex.com';
    token = '123abc';
    expiration = new Date();
  });


  beforeEach(() => {
    User.remove({}).exec();
    new User(user1).save();
  });

  describe('insertUser()', () => {
    it('should insert new user on DB', (done) => {
      User.insertUser(id, email, token, expiration).then((user) => {
        User.findOne({ id }).then((user) => {
          expect(user).toExist();
          expect(user.token).toBe(token);
          done();
        });
      });
    });
  });

  describe('findUserById()', () => {
    it('should find user by id', (done) => {
      const id = user1.id;

      User.findUserById(id).then((user) => {
        expect(user.token).toBe(user1.token);
        done();
      }).catch(err => console.log(err));
    });

    it('should not find user with wrong id', (done) => {
      User.findUserById(id).then((user) => {
        expect(user).toBe(null);
        done();
      });
    });
  });

  describe('findUserByToken()', () => {
    it('should find user by token', (done) => {
      const token = user1.token;

      User.findUserByToken(token).then((user) => {
        expect(user.id).toBe(user1.id);
        done();
      });
    });

    it('should not find user with wrong token', (done) => {
      User.findUserByToken(token).then((user) => {
        expect(user).toBe(null);
        done();
      });
    });
  });

  describe('removeUser()', () => {
    it('should remove user', (done) => {
      const id = user1.id;

      User.removeUser(id).then((user) => {
        expect(user.result.n).toBe(1);
        expect(user.result.ok).toBe(1);
        done();
      }).catch(err => console.log(err));
    });

    it('should not find user with wrong token', (done) => {
      User.removeUser(id).then((user) => {
        expect(user.result.n).toBe(0);
        expect(user.result.ok).toBe(1);
        done();
      }).catch(err => console.log(err));
    });
  });

});
