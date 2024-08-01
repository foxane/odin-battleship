import '../css/main.css';
import Dom from './dom';
import Player from './player';

// NOTE : create interface module for brigde between backend and frontend

export default function attack(cell) {
  if (cell.dataset.status === 'attacked') return;
  if (computer.gameboard.receiveAttack([cell.dataset.row, cell.dataset.col])) {
    cell.style.backgroundColor = 'red';
  } else {
    cell.style.backgroundColor = 'grey';
  }
  console.log(cell);
}

// Init

const player = new Player('human');
const computer = new Player('computer');
const domUtils = new Dom();
player.element = document.querySelector('.player-1');
computer.element = document.querySelector('.player-2');

// Dom init
player.element.appendChild(domUtils.createBoard());
computer.element.appendChild(domUtils.createBoard('inactive'));

// Place random ship
player.gameboard.placeRandomShip();
computer.gameboard.placeRandomShip();
domUtils.renderBoard(player.gameboard.shipCoordinates);
