import Controller from "./Controller.js";
import Player from './modules/Player';
import Ship from './modules/Ship';

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
    title.textContent = 'Place your Carrier';
    title.classList.add('placement-shipname-display');

    const rotateBtn = document.createElement('button');
    rotateBtn.setAttribute('type', 'button');
    rotateBtn.textContent = 'Rotate';

    rotateBtn.addEventListener('click', ()=> {
      const gridCells = document.querySelectorAll('.placement-grid-cell');
      const axisDisplay = document.querySelector('.placement-axis-display')
      gridCells.forEach(cell => {
        if (cell.getAttribute('data-orientation') === 'x') {
          cell.setAttribute('data-orientation', 'y');
          axisDisplay.textContent = 'Placing in Y-axis';
        } else {
          cell.setAttribute('data-orientation', 'x');
          axisDisplay.textContent = 'Placing in X-axis';
        }
      })
    });

    const axisDisplay = document.createElement('p');
    axisDisplay.classList.add('placement-axis-display');
    axisDisplay.textContent = 'Placing in X-axis';

    const boardGrid = document.createElement('div');
    boardGrid.classList.add('placement-grid');

    const shipsList = [
      ['carrier', 5],
      ['battleship', 4],
      ['cruiser', 3],
      ['submarine', 3],
      ['destroyer', 2],
    ];
    
    const firstShip = shipsList.shift();
    for (let outI = 0; outI < 10; outI++) {
      for (let inI = 0; inI < 10; inI++) {
        const cell = document.createElement('div');
        cell.classList.add('placement-grid-cell');
        // Add ship details into attributes
        cell.setAttribute('data-outeri', outI);
        cell.setAttribute('data-inneri', inI);
        cell.setAttribute('data-orientation', 'x');
        cell.setAttribute('data-shipname', firstShip[0]);
        cell.setAttribute('data-shiplength', firstShip[1]);
        
        Controller.insertAfter(boardGrid, cell);
      }
    }
    // click event to submit coordinates
    boardGrid.addEventListener('click', (e) => {
      if (e.target.classList.contains('placement-grid-cell')) {
        if (e.target.dataset.shipname != 'undefined') {
          const shipName = e.target.dataset.shipname;
          const shipLength = parseInt(e.target.dataset.shiplength);
          const ship = new Ship(shipLength, shipName);
          const coords = [
            parseInt(e.target.dataset.outeri),
            parseInt(e.target.dataset.inneri),
            e.target.dataset.orientation
          ];
          try {
            this.player1.gameboard.placeShip(ship, coords);
            if (shipsList.length != 0) {
              const shipData = shipsList.shift();
              this.updatePlaceShipGridAttributes('data-shipname', shipData[0]);
              this.updatePlaceShipGridAttributes('data-shiplength', shipData[1]);
              this.updatePlacementShipName();
            } else {
              this.updatePlaceShipGridAttributes('data-shipname', 'undefined');
            }
          } catch (err) {
            console.log(err);
          }
          console.log(this.player1.gameboard);
        } else {
          console.log('no more ships to place');
        }
      } 
    });

    // hover on event to handle illustration of placement
    boardGrid.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('placement-grid-cell')) {
        const hoveredCell = e.target;
        const allCells = Array.from(document.querySelectorAll('.placement-grid-cell'));
        const axis = hoveredCell.dataset.orientation;
        const shiplength = parseInt(hoveredCell.dataset.shiplength);
        const outerI = parseInt(hoveredCell.dataset.outeri);
        const innerI = parseInt(hoveredCell.dataset.inneri);
        if (axis === 'x') {
          const cellsToHighlight = [];
          for (let i = innerI; i < innerI + shiplength; i++) {
           let cell = allCells.find(cell => cell.dataset.outeri === outerI.toString() && cell.dataset.inneri === i.toString());
           if (cell) {
             cellsToHighlight.push(cell);
           }
          }
          console.dir(cellsToHighlight);
          cellsToHighlight.forEach(cell => cell.classList.add('hovered'));

        } else if (axis === 'y' ){
          const cellsToHighlight = [];
          for (let o = outerI; o < outerI + shiplength; o++) {
           let cell = allCells.find(cell => cell.dataset.outeri === o.toString() && cell.dataset.inneri === innerI.toString());
           if (cell) {
             cellsToHighlight.push(cell);
           }
          }
          console.dir(cellsToHighlight);
          cellsToHighlight.forEach(cell => cell.classList.add('hovered'));
        }

      } else {
        return;
      }
    });
    
    // Hover off event
    boardGrid.addEventListener('mouseout', (e) => {
      const allCells = document.querySelectorAll('.placement-grid-cell');
      allCells.forEach(cell => cell.classList.remove('hovered'));
    });
    Controller.insertAfter(setShipsContainer, title);
    Controller.insertAfter(setShipsContainer, rotateBtn);
    Controller.insertAfter(setShipsContainer, axisDisplay);
    Controller.insertAfter(setShipsContainer, boardGrid);
    Controller.insertAfter(this.app, setShipsContainer);
  }
  
  updatePlaceShipGridAttributes(attrName, attrValue) {
    const cells = document.querySelectorAll('.placement-grid-cell');
    cells.forEach(cell => {
      cell.setAttribute(attrName, attrValue);
    });
  }
  updatePlacementShipName() {
    const shipname = document.querySelector('.placement-grid-cell').dataset.shipname;
    const formattedName = shipname.slice(0,1).toUpperCase() + shipname.slice(1);
    const shipNameDisplay = document.querySelector('.placement-shipname-display');
    shipNameDisplay.textContent = `Place your ${formattedName}`;
  }
}

export default App;