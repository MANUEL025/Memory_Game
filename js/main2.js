document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.btn');
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let score = 0; // Variable para la puntuación total

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.children[0].children[0].src === secondCard.children[0].children[0].src;

    if (isMatch) {
      score += parseInt(firstCard.getAttribute('data-score'));
      updateScore(); // Actualiza la puntuación si hay coincidencia
      disableCards();
    } else {
      unflipCards();
    }
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function updateScore() {
    // Actualiza el elemento HTML para mostrar la puntuación
    document.getElementById('score').innerText = `Puntuación: ${score}`;
  }

  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 4);
      card.style.order = randomPos;
    });
  })();

  cards.forEach(card => card.addEventListener('click', flipCard));

  updateScore(); // Inicializa la puntuación al cargar el juego
});
