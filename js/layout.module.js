import { days } from './helpers.js';

function createCalCards() {
  let cardsContainers = document.getElementById('cardsContainer');

  for (let day of days) {
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
    cardContent.setAttribute('id', `card-${day}`);
    cardContent.innerHTML = `<div class="none"><h1>None</h1></div>`;

    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    cardsContainers.append(card);
  }
}

export { createCalCards };
