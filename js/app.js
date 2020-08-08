import { sampleInputs } from './helpers.js';
import { createUser, postProcessUsers } from './users.module.js';
import { createCalCards, addUsersToCards } from './layout.module.js';

function initialize() {
  createCalCards();
  let users = sampleInputs.users.map((curr) => {
    return createUser(curr, sampleInputs.yearInput);
  });
  users = postProcessUsers(users);
  console.table(users);
  addUsersToCards(users);
}

window.onload = initialize;
