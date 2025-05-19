import './styles/index.scss';

let attempts = 1;
let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null;
let hasFlippedCard = false;
const cards = document.querySelectorAll('.card');
const attemptsElement = document.querySelector('.attempts h1')!;
const winMessageContainer = document.querySelector('.win-message-container') as HTMLElement;
const startOverButton = document.querySelector('.start-over-btn')!;

cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const clickedCard = e.currentTarget as HTMLElement;

    if (clickedCard === firstCard || clickedCard.classList.contains('flip')) {
      return; // Ignore if the card is clicked twice or is already flipped
    }

    flipCard(clickedCard);

    if (!hasFlippedCard) {
      firstCard = clickedCard;
      hasFlippedCard = true;
    } else {
      secondCard = clickedCard;
      checkForMatch();
    }
  });
});

function flipCard(card: HTMLElement) {
  card.classList.add('flip');
}

function checkForMatch() {
  if (firstCard && secondCard) {
    const isMatch = firstCard.querySelector('.card-back')?.textContent === secondCard.querySelector('.card-back')?.textContent;

    if (isMatch) {
      resetTurn();
      checkWinCondition();
    } else {
      attempts++;
      attemptsElement.textContent = `Attempts: ${attempts}`;
      setTimeout(() => unflipCards(), 1000);
    }
  }
}

function unflipCards() {
  firstCard?.classList.remove('flip');
  secondCard?.classList.remove('flip');
  resetTurn();
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  hasFlippedCard = false;
}

function checkWinCondition() {
  const allCards = Array.from(cards);
  const allFlipped = allCards.every((card) => card.classList.contains('flip'));

  if (allFlipped) {
    winMessageContainer.style.display = 'flex'; // Show win message
  }
}

startOverButton.addEventListener('click', () => {
  location.reload(); // Reload the page to restart the game
});
