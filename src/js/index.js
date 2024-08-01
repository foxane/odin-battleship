import '../css/main.css';
import { createBoard, renderBoard } from './dom';
import Player from './player';

// Game state
let turn = 'player';

const playerAttack = (cellElement) => {
  const {
    dataset: { row, col, status },
  } = cellElement;

  if (turn !== 'player' || status !== 'null') return;

  if (computer.gameboard.receiveAttack([row, col])) {
    // Hit
    cellElement.style.backgroundColor = 'red';
  } else {
    // Miss
    cellElement.style.backgroundColor = 'green';
    turn = 'computer';
    computerAttack();
  }

  cellElement.dataset.status = 'attacked';
};

const computerAttack = () => {
  let [row, col] = computer.attack();
  let cell = document.querySelector(
    `.cell[data-row="${row}"][data-col="${col}"]`,
  );

  // Loop to find unattacked cell
  while (cell.dataset.status !== 'null') {
    [row, col] = computer.attack();
    cell = document.querySelector(
      `.cell[data-row="${row}"][data-col="${col}"]`,
    );
  }

  // Attack
  if (player.gameboard.receiveAttack([row, col])) {
    cell.style.backgroundColor = 'red';
    setTimeout(() => {
      computerAttack();
    }, 1000);
  } else {
    cell.style.backgroundColor = 'white';
    turn = 'player';
  }
};

// Init
const player = new Player('human');
const computer = new Player('computer');
player.element = document.querySelector('.player-1');
computer.element = document.querySelector('.player-2');

// Dom init
player.element.appendChild(createBoard());
computer.element.appendChild(createBoard(playerAttack));

// Place random ship
player.gameboard.placeRandomShip();
computer.gameboard.placeRandomShip();
renderBoard(player.gameboard.shipCoordinates);

const randomBtn = document.querySelector('.randomize-btn');
randomBtn.addEventListener('click', () => {
  player.gameboard.resetBoard();
  player.gameboard.placeRandomShip();
  player.element.innerHTML = '';
  player.element.appendChild(createBoard());
  renderBoard(player.gameboard.shipCoordinates);
  console.log('hi');
});
