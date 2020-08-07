import { createUser, postProcessUsers } from './users.module.js';
import { createCalCards } from './layout.module.js';

function initializeUI() {
  createCalCards();
}

window.onload = initializeUI();

let inputs = {
  users: [
    {
      name: 'Cersei Lannister',
      birthday: '11/30/1975',
    },
    {
      name: 'Tyrion Lannister',
      birthday: '12/02/1978',
    },
    {
      name: 'Jon Snow',
      birthday: '12/03/1989',
    },
  ],
  yearInput: '1980',
};

let users = inputs.users.map((curr) => {
  return createUser(curr, inputs.yearInput);
});
users = postProcessUsers(users);

console.log('users', users);
