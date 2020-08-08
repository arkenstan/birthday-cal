import { globalData } from './helpers.js';

function createCalCards() {
  const { days } = globalData;
  let printDays = [...days];
  printDays.shift();
  printDays.push(days[0]);

  let cardsContainers = document.getElementById('cardsContainer');
  let cards = [];

  for (let day of printDays) {
    let card = document.createElement('div');
    card.setAttribute('class', 'card');

    // Create card header
    let cardHeader = document.createElement('div');
    cardHeader.setAttribute('class', 'card-header');
    let headerSpan = document.createElement('span');
    headerSpan.setAttribute('class', 'heading');
    headerSpan.innerText = day;
    cardHeader.appendChild(headerSpan);

    // Create card content
    let cardContent = document.createElement('div');
    cardContent.setAttribute('class', 'card-content');
    cardContent.setAttribute('id', `${globalData.cardIdPrefix}${day}`);
    cardContent.innerHTML = `<div class="none"><h1>None</h1></div>`;

    card.append(cardHeader, cardContent);
    cards.push(card);
  }

  cardsContainers.append(...cards);
}

function addUsersToCards(users) {
  let dayContainers = {};

  for (let user of users) {
    if (!dayContainers[user.birthDay]) {
      dayContainers[user.birthDay] = [];
    }
    let userCard = document.createElement('div');
    userCard.setAttribute('class', 'user');
    userCard.innerText = user.initials;
    dayContainers[user.birthDay].push(userCard);
  }

  for (let day of globalData.days) {
    let contentEl = document.getElementById(`${globalData.cardIdPrefix}${day}`);
    contentEl.innerHTML = ``;
    if (dayContainers[day] && dayContainers[day].length > 0) {
      contentEl.append(...dayContainers[day]);
    } else {
      contentEl.innerHTML = `<div class="user none-color"><h1>None</h1></div>`;
    }
  }
}

export { createCalCards, addUsersToCards };
