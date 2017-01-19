/* eslint-disable */

const expect = require('expect');
const { User } = require('../db/model/user');
const { db } = require('../utils/db');

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

describe('db.insertUser', () => {
  it('should insert new user on DB', (done) => {

    const id = 2;
    const email = 'email@ex.com';
    const token = '123abc';
    const expiration = new Date();

    db.insertUser(id, email, token, expiration).then((result) => {
      User.findOne({ id }).then((result) => {
        expect(result.token).toBe(token);
        done();
      });
    }).catch(err => console.log(err));
  });
});

describe('db.findUserById', () => {
  it('should find user by id', (done) => {
    const id = user1.id;

    db.findUserById(id).then((result) => {
      expect(result.token).toBe(user1.token);
      done();
    }).catch(err => console.log(err));
  });

  it('should not find user with wrong id', (done) => {
    const id = 333;

    db.findUserById(id).then((result) => {
      expect(result).toBe(null);
      done();
    }).catch(err => console.log(err));
  });
});

describe('db.findUserByToken', () => {
  it('should find user by token', (done) => {
    const token = user1.token;

    db.findUserByToken(token).then((result) => {
      expect(result.id).toBe(user1.id);
      done();
    }).catch(err => console.log(err));
  });

  it('should not find user with wrong token', (done) => {
    const token = 333;

    db.findUserByToken(token).then((result) => {
      expect(result).toBe(null);
      done();
    }).catch(err => console.log(err));
  });
});
