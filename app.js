let playerPoints = 0;
let botPoints = 0;

const playerPointsDisplay = document.getElementById("playerPoints");
const botPointsDisplay = document.getElementById("botPoints");

const playerOptionsList = document.querySelectorAll(".player .option");
const enemyOptionsList = document.querySelectorAll(".enemy .option");
const resultModal = document.getElementById("resultModal");
const modalResult = document.getElementById("modalResult");
const playAgainBtn = document.getElementById("playAgainBtn");

playerOptionsList.forEach((option) => {
  option.onclick = () => {
    clearOptions(playerOptionsList);

    option.style.opacity = "1";
    option.setAttribute("data-selected", true);

    const movePlayer = option.getAttribute("data-value");
    const moveEnemy = iaEnemy();

    result(movePlayer, moveEnemy);
  };
});

const iaEnemy = () => {
  const optionRandom = Math.floor(Math.random() * enemyOptionsList.length);
  const optionSelected = enemyOptionsList[optionRandom];

  clearOptions(enemyOptionsList);

  optionSelected.style.opacity = "1";
  optionSelected.setAttribute("data-selected", "true");

  return optionSelected.getAttribute("data-value");
};

const clearOptions = (optionsList) => {
  optionsList.forEach((option) => {
    option.setAttribute("data-selected", "false");
    option.style.opacity = "0.5";
  });
};

const result = (movePlayer, moveEnemy) => {
  if (movePlayer === moveEnemy) {
    showResultModal("Você empatou 😢");
  } else if (
    (movePlayer === "stone" && moveEnemy === "paper") ||
    (movePlayer === "paper" && moveEnemy === "scissor") ||
    (movePlayer === "scissor" && moveEnemy === "stone")
  ) {
    botPoints++;
    updatePoints();
    showResultModal("Você perdeu 😭");
  } else {
    playerPoints++;
    updatePoints();
    showResultModal("Você ganhou 🥲");
  }
};

const updatePoints = () => {
  playerPointsDisplay.textContent = playerPoints;
  botPointsDisplay.textContent = botPoints;
};

const showResultModal = (resultText) => {
  modalResult.textContent = resultText;
  resultModal.style.display = "flex"; // Mostra o modal
};

playAgainBtn.onclick = () => {
  resultModal.style.display = "none"; // Esconde o modal
  clearOptions(playerOptionsList);
  clearOptions(enemyOptionsList);
};
