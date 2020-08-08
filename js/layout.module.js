import { globalData } from './constants.js';

/**
 *
 * Function draws cal cards on the UI
 *
 */
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

/**
 *
 * Function will add users to their respective cal cards
 *
 * @param {Array} users
 * @param {string} users[$].initials
 * @param {string} users[$].dayOfWeek
 *
 */
const addUsersToCards = (users) => {
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
};

const showErrors = (errors) => {
  let errorContainer = document.getElementById('formErrors');
  let errorEls = [];
  errorContainer.innerHTML = '';
  for (let error of errors) {
    let errorEl = document.createElement('li');
    errorEl.setAttribute('class', 'error');
    errorEl.innerText = error;
    errorEls.push(errorEl);
  }
  errorContainer.append(...errorEls);
};

export { createCalCards, addUsersToCards, showErrors };
