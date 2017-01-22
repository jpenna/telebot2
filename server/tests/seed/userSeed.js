const { User } = require('../../db/model/user');

const user1 = {
  id: 1,
  token: 'asdfqwer',
  email: 'em@ex.com',
  expiration_date: new Date(),
};

const user2 = {
  id: 2,
  email: 'email@ex.com',
  token: '123abc',
  expiration_date: new Date()
};

const user3 = {
  id: 3,
  email: 'xtudo@ex.com',
  token: 'youcan',
  expiration: new Date()
};

function populateUsers() {
  return User.remove({})
  .then(
    () => new User(user1).save()
    .then(
      () => new User(user2).save()
    )
  );
}

module.exports = {
  user1, user2, user3, populateUsers
};
