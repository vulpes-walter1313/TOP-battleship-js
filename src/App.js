import Controller from "./Controller.js";
import Player from './modules/Player';

class App {
  constructor(id) {
    this.app = document.querySelector(id);
  }
  run() {
    this.renderStart();
  }

  renderStart() {
    Controller.cleanElement(this.app);
    const playerInfoDiv = document.createElement('div');
    playerInfoDiv.classList.add('player-info');

    const playerH2 = document.createElement('h2');
    playerH2.textContent = "Set your name";
    
    const nameForm = document.createElement('form');
    nameForm.classList.add('player-form');
    nameForm.innerHTML = `
      <label for="name">Name: </label>
      <input type="text" name="name">
    `;
    const nameSubmit = this.nameSubmission.bind(this);
    nameForm.addEventListener('submit', nameSubmit);

    Controller.insertAfter(playerInfoDiv, playerH2);
    Controller.insertAfter(playerInfoDiv, nameForm);
    Controller.insertAfter(this.app, playerInfoDiv);
  }
  nameSubmission() {
    const nameForm = document.querySelector('.player-form');
    const formData = new FormData(nameForm);
    const playerName = formData.get('name');
    this.player1 = new Player(playerName);
    this.computer = new Player();
    Controller.cleanElement(this.app);
    console.log(this.player1);
    console.log(this.computer);
    this.setPlayerShips();
  }
  setPlayerShips() {
    const setShipsContainer = document.createElement('div');
    setShipsContainer.classList.add('set-player-ships-container');

    const title = document.createElement('h2');
    title.textContent = 'Place your Ships';

    const boardGrid = document.createElement('div');
    boardGrid.classList.add('placement-grid');

    const shipsList = [
      ['carrier', 5],
      ['battleship', 4],
      ['cruiser', 3],
      ['submarine', 3],
      ['destroyer', 2],
    ];
    
    for (let outI = 0; outI < 10; outI++) {
      for (let inI = 0; inI < 10; inI++) {
        const cell = document.createElement('div');
        cell.classList.add('placement-grid-cell');
        cell.setAttribute('data-outeri', outI);
        cell.setAttribute('data-inneri', inI);
        /*
          Something has to be done to alternate ships
          in order to call this.player1.gameboard.placeShip(ship, coords);
          on click
         */
        Controller.insertAfter(boardGrid, cell);
      }
    }
    Controller.insertAfter(setShipsContainer, title);
    Controller.insertAfter(setShipsContainer, boardGrid);
    Controller.insertAfter(this.app, setShipsContainer);
  }
  playerPlaceShip() {

  }
}

export default App;