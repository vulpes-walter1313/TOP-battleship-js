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
    this.setPlayerShips();
  }
  setPlayerShips() {
    Controller.cleanElement(this.app);
    const setShipsContainer = document.createElement('div');
    setShipsContainer.classList.add('set-player-ships-container');

    const title = document.createElement('h2');
    title.textContent = 'Place your Carrier';
    title.classList.add('placement-shipname-display');

    const rotateBtn = document.createElement('button');
    rotateBtn.setAttribute('type', 'button');
    rotateBtn.textContent = 'Rotate';
    rotateBtn.setAttribute('data-axis', 'x');

    rotateBtn.addEventListener('click', ()=> {
      const gridCells = document.querySelectorAll('.placement-grid-cell');
      const axisDisplay = document.querySelector('.placement-axis-display');
      const axisBtn = document.querySelector('.set-player-ships-container button');
      if (axisBtn.dataset.axis === 'x') {
        axisBtn.dataset.axis = 'y';
      } else if (axisBtn.dataset.axis === 'y') {
        axisBtn.dataset.axis = 'x';
      }
      gridCells.forEach(cell => {
        if (axisBtn.dataset.axis === 'x') {
          cell.setAttribute('data-orientation', 'x');
          axisDisplay.textContent = 'Placing in X-axis';
        } else {
          cell.setAttribute('data-orientation', 'y');
          axisDisplay.textContent = 'Placing in Y-axis';
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
    this.buildPlacementGrid(boardGrid, firstShip);

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
              const boardGrid = document.querySelector('.placement-grid');
              this.buildPlacementGrid(boardGrid, shipData);
              this.updatePlacementShipName();
            } else {
              this.computer.gameboard.computerPlaceShips();
              console.log(this.computer.gameboard);
              this.startTheGame();
              // this.updatePlaceShipGridAttributes('data-shipname', 'undefined');
            }
          } catch (err) {
            console.log(err);
          }
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
          cellsToHighlight.forEach(cell => cell.classList.add('hovered'));

        } else if (axis === 'y' ){
          const cellsToHighlight = [];
          for (let o = outerI; o < outerI + shiplength; o++) {
           let cell = allCells.find(cell => cell.dataset.outeri === o.toString() && cell.dataset.inneri === innerI.toString());
           if (cell) {
             cellsToHighlight.push(cell);
           }
          }
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
  buildPlacementGrid(gridDisplay, shipInfo) {
    Controller.cleanElement(gridDisplay);

    const axisBtn = document.querySelector('.set-player-ships-container button');
    let axis;
    if (axisBtn) {
      axis = axisBtn.dataset.axis;
    } else {
      axis = 'x';
    }


    for (let outI = 0; outI < 10; outI++) {
      for (let inI = 0; inI < 10; inI++) {
        const cell = document.createElement('div');
        cell.classList.add('placement-grid-cell');
        // Add ship details into attributes
        cell.setAttribute('data-outeri', outI);
        cell.setAttribute('data-inneri', inI);
        cell.setAttribute('data-orientation', axis);
        cell.setAttribute('data-shipname', shipInfo[0]);
        cell.setAttribute('data-shiplength', shipInfo[1]);
        if (this.player1.gameboard.board[outI][inI].hasShip === true) {
          cell.classList.add('ship-placed');
        }
        
        Controller.insertAfter(gridDisplay, cell);
      }
    }
  }

  startTheGame() {
    Controller.cleanElement(this.app);
    const gameboardContainer = document.createElement('div');
    gameboardContainer.classList.add('gameplay-display-container');
    // player1
    const player1DisplayWrapper = document.createElement('div');
    player1DisplayWrapper.classList.add('player1-display-wrapper');

    const player1NameTitle = document.createElement('h2');
    player1NameTitle.textContent = `${this.player1.name}`;

    const player1BoardDisplay = document.createElement('div');
    player1BoardDisplay.classList.add('gameplay-player1-board');

    this.buildGameboard(player1BoardDisplay, this.player1.gameboard.board);
    
    // computer player
    const computerDisplayWrapper = document.createElement('div');
    computerDisplayWrapper.classList.add('computer-display-wrapper');

    const computerName = document.createElement('h2');
    computerName.textContent = `${this.computer.name}`;

    const computerBoardDisplay = document.createElement('div');
    computerBoardDisplay.classList.add('gameplay-computer-board');
    this.buildGameboard(computerBoardDisplay, this.player1.enemyBoard.board);

    computerBoardDisplay.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('gameboard-grid-cell')) {
        e.target.classList.add('cell-hovered');
      }
    });
    computerBoardDisplay.addEventListener('mouseout', (e) => {
      if (e.target.classList.contains('gameboard-grid-cell')) {
        e.target.classList.remove('cell-hovered');
      }
    });
    
    computerBoardDisplay.addEventListener('click', (e) => {
      // console.log(`${e.target.dataset.outeri}, ${e.target.dataset.inneri}`);
      const coords = [
        e.target.dataset.outeri,
        e.target.dataset.inneri
      ];
      this.playerTurn(coords);
    });


    Controller.insertAfter(player1DisplayWrapper, player1NameTitle);
    Controller.insertAfter(player1DisplayWrapper, player1BoardDisplay);
    Controller.insertAfter(computerDisplayWrapper, computerName);
    Controller.insertAfter(computerDisplayWrapper, computerBoardDisplay);
    Controller.insertAfter(gameboardContainer, player1DisplayWrapper);
    Controller.insertAfter(gameboardContainer, computerDisplayWrapper);
    Controller.insertAfter(this.app, gameboardContainer);
  }

  buildGameboard(displayDiv, board) {
    Controller.cleanElement(displayDiv);

    for (let outI = 0; outI < 10; outI++) {
      for (let inI = 0; inI < 10; inI++) {
        const cell = document.createElement('div');
        cell.classList.add('gameboard-grid-cell');
        // Add ship details into attributes
        cell.setAttribute('data-outeri', outI);
        cell.setAttribute('data-inneri', inI);
        if (board[outI][inI].hasShip === true) {
          cell.classList.add('gameboard-ship-placed');
        }
        if (board[outI][inI]['hasBeenShot'] === true && board[outI][inI]['hasShip'] === true) {
          cell.classList.add('grid-cell-hit');
        } else if (board[outI][inI]['hasBeenShot'] === true && board[outI][inI]['hasShip'] === false) {
          cell.classList.add('grid-cell-miss');
        }
        
        Controller.insertAfter(displayDiv, cell);
      }
    }
  }

  playerTurn(coordinates) {
    const [outeri, inneri] = coordinates;
    console.log(outeri, inneri);

    // if coordinate already hit, exit
    if (this.player1.enemyBoard.board[outeri][inneri]['hasBeenShot'] === true) {
      return;
    }

    // player one attacks computer
    const result = this.computer.gameboard.receiveAttack([outeri, inneri]);
    this.player1.enemyBoard.receiveAttack([outeri, inneri]);

    // depending on hit or miss, update player1.enemyBoard accordingly
    if (result === 'hit') {
      this.player1.enemyBoard.board[outeri][inneri]['hasShip'] = true;
      const enemyBoardDisplay = document.querySelector('.gameplay-computer-board');
      this.buildGameboard(enemyBoardDisplay, this.player1.enemyBoard.board);
    } else if (result === 'miss') {
      const enemyBoardDisplay = document.querySelector('.gameplay-computer-board');
      this.buildGameboard(enemyBoardDisplay, this.player1.enemyBoard.board);
    }

    // check if computer player has all ships sunk
    if (this.computer.gameboard.areAllShipsSunk()) {
      this.winnerAnnoucement(this.player1);
    } else {
      // if computer ships not sunk then computer attacks player 1
      const computerMoveCoords = this.computer.computerMove();
      this.player1.gameboard.receiveAttack(computerMoveCoords); // Dont need the return value
      const player1BoardDisplay = document.querySelector('.gameplay-player1-board');
      this.buildGameboard(player1BoardDisplay, this.player1.gameboard.board);
    }

    // check if player1 ships sunk
    if (this.player1.gameboard.areAllShipsSunk()) {
      this.winnerAnnoucement(this.computer)
    }
  }

  winnerAnnoucement(player) {
    const winnerBannerContainer = document.createElement('div');
    winnerBannerContainer.classList.add('winner-banner-container');

    const winnerBanner = document.createElement('div');
    winnerBanner.classList.add('winner-banner');
    const winnerContent = document.createElement('p');
    winnerContent.textContent = `${player.name} Won!!!`;

    const playAgainBtn = document.createElement('button');
    playAgainBtn.setAttribute('type', 'button');
    playAgainBtn.textContent = "Play Again";

    playAgainBtn.addEventListener('click', () => {
      this.restartGame();
    })

    winnerBanner.appendChild(winnerContent);
    winnerBanner.appendChild(playAgainBtn);

    winnerBannerContainer.appendChild(winnerBanner);
    Controller.insertAfter(this.app, winnerBannerContainer);
  }
  restartGame() {
    // reset player1 and computer gameboards and enemyboards
    this.player1.gameboard.resetBoard();
    this.player1.enemyBoard.resetBoard();
    this.computer.gameboard.resetBoard();
    this.computer.enemyBoard.resetBoard();
    this.computer.validMoves = Player.resetMoves();
    // place player 1's ships again
    this.setPlayerShips()
  }
}

export default App;