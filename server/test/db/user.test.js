/* eslint-disable */
require('../../config/config');
const expect = require('expect');
const { User } = require('../../db/model/user');

beforeEach(() => {
  User.remove({}).exec();
  user1 = {
    id: 1,
    token: 'asdfqwer',
    email: 'em@ex.com',
    expiration_date: new Date(),
  };
  new User(user1).save();
});

describe('User.insertUser', () => {
  it('should insert new user on DB', (done) => {

    const id = 2;
    const email = 'email@ex.com';
    const token = '123abc';
    const expiration = new Date();

    User.insertUser(id, email, token, expiration).then((result) => {
      User.findOne({ id }).then((result) => {
        expect(result.token).toBe(token);
        done();
      });
    }).catch(err => console.log(err));
  });
});

describe('User.findUserById', () => {
  it('should find user by id', (done) => {
    const id = user1.id;

    User.findUserById(id).then((result) => {
      expect(result.token).toBe(user1.token);
      done();
    }).catch(err => console.log(err));
  });

  it('should not find user with wrong id', (done) => {
    const id = 333;

    User.findUserById(id).then((result) => {
      expect(result).toBe(null);
      done();
    }).catch(err => console.log(err));
  });
});

describe('User.findUserByToken', () => {
  it('should find user by token', (done) => {
    const token = user1.token;

    User.findUserByToken(token).then((result) => {
      expect(result.id).toBe(user1.id);
      done();
    }).catch(err => console.log(err));
  });

  it('should not find user with wrong token', (done) => {
    const token = 333;

    User.findUserByToken(token).then((result) => {
      expect(result).toBe(null);
      done();
    }).catch(err => console.log(err));
  });
});

describe('User.removeUser', () => {
  it('should remove user', (done) => {
    const id = user1.id;

    User.removeUser(id).then((result) => {
      expect(result.result.n).toBe(1);
      expect(result.result.ok).toBe(1);
      done();
    }).catch(err => console.log(err));
  });

  it('should not find user with wrong token', (done) => {
    const id = 333;

    User.removeUser(id).then((result) => {
      expect(result.result.n).toBe(0);
      expect(result.result.ok).toBe(1);
      done();
    }).catch(err => console.log(err));
  });
});
