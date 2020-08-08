import { globalData } from './constants.js';

const createCalCards = () => {
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
    // cardContent.setAttribute('id', `${globalData.cardIdPrefix}${day}`);
    cardContent.innerHTML = `<div class="user-content" id="${globalData.cardIdPrefix}${day}">
    <div class="user color-class-none"></div></div>
    `;

    card.append(cardHeader, cardContent);
    cards.push(card);
  }

  cardsContainers.append(...cards);
};

function addUsersToCards(users) {
  let dayContainers = {};

  for (let user of users) {
    const { dayOfWeek, initials } = user;
    if (!dayContainers[dayOfWeek]) {
      dayContainers[dayOfWeek] = [];
    }
    let userCard = document.createElement('div');
    let coloClassIndex =
      (dayContainers[dayOfWeek].length % globalData.colorClasses) + 1;
    userCard.setAttribute('class', `user color-class-${coloClassIndex}`);
    userCard.innerText = initials;
    dayContainers[dayOfWeek].push(userCard);
  }

  for (let day of globalData.days) {
    let contentEl = document.getElementById(`${globalData.cardIdPrefix}${day}`);
    contentEl.innerHTML = ``;
    if (dayContainers[day] && dayContainers[day].length > 0) {
      contentEl.append(...dayContainers[day]);
    } else {
      contentEl.innerHTML = `<div class="user color-class-none"></div>`;
    }
  }
}

export { createCalCards, addUsersToCards };
