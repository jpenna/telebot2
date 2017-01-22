/* eslint no-undef:off*/

require('../../config/config');
const expect = require('expect');
const { User } = require('../../db/model/user');
const userSeed = require('../seed/userSeed');

describe('User', () => {
  before(() => {
    user1 = userSeed.user1;

    user3 = userSeed.user3;
    id = user3.id;
    email = user3.email;
    token = user3.token;
    expiration = user3.expiration;
  });


  beforeEach((done) => {
    userSeed.populateUsers().then(() => {
      done();
    });
  });

  describe('insertUser()', () => {
    it('should insert new user on DB', (done) => {
      User.insertUser(id, email, token, expiration).then(() => {
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
