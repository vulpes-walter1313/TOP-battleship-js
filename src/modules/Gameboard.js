import Ship from "./Ship";

class Gameboard {
  constructor() {
    this.board = Gameboard.createBoard();
    this.ships = {};
  }
  static createBoard() {
    let board = [];
    for (let r = 0; r < 10; r++) {
      let row = [];
      for (let i = 0; i < 10; i++) {
        let cell = {
          hasShip: false,
          hasBeenShot: false
        };
        row.push(cell);
      }
      board.push(row);
    }
    return board;
  }
  areAllShipsSunk() {
    // This method will be used to see when to flip the
    // allShipsSunk flag to true. But a test argument can be used
    // Simply to see if it gets called.
    let shipsStatus = [];
    if (Object.keys(this.ships).length === 0) {
      return false;
    }

    for (const ship in this.ships) {
      /*
      pushes a boolean true of false to shipsStatus
      depending is the ship is sunk
      */
      shipsStatus.push(this.ships[ship].isShipSunk);
    }

    if (shipsStatus.every(val => val === true)) {
      // If all ships are sunk, then it returns true
      return true;
    } else { 
      return false;
    }
  
  }

  placeShip(ship, coordinates) {
    if (!this.isPlacementValid([coordinates[0], coordinates[1]], ship.length, coordinates[2])) {
      // If placement is invalid then it throws an error 
      throw new Error('Placement is invalid');
    }
    // prepares a object with ship.name as key that holds an object of information on the ship.

    this.ships[ship.name] = {
      'ship': ship,
      isShipSunk: false,
      locations: []
    };

    if (coordinates[2] === 'x') {
      for (let i = coordinates[1]; i < coordinates[1] + ship.length; i++) {
        this.board[coordinates[0]][i]['hasShip'] = true;
        this.board[coordinates[0]][i]['shipName'] = ship.name;
        this.ships[ship.name].locations.push([coordinates[0], i]);
      }
    } else if (coordinates[2] === 'y') {
      let firstArrIndex = coordinates[0];
      for (let i = 0; i < ship.length; i++) {
        this.board[firstArrIndex][coordinates[1]]['hasShip'] = true;
        this.board[firstArrIndex][coordinates[1]]['shipName'] = ship.name;
        firstArrIndex++;
        this.ships[ship.name].locations.push([firstArrIndex, coordinates[1]]);
      }
    }
  }

  isPlacementValid(coordinates, length, axis) {
    /* 
      Coordinates is an array of two elements:
      [firstArrIndex, secondArrIndex]
    */
    let isValid = true;
    if (axis === 'x') { 
      for (let i = coordinates[1]; i < coordinates[1] + length; i++) {
        if (this.board[coordinates[0]][i] === undefined || this.board[coordinates[0]][i]['hasShip'] === true) {
          isValid = false;
          break;
        }
      }
    } else if (axis === 'y') {
      // Axis is y
      for (let i = coordinates[0]; i < coordinates[0] + length; i++) {
        if (this.board[i] === undefined || this.board[i][coordinates[1]]['hasShip'] === true ) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  }

  receiveAttack(coordinates) {
    /*
      coordinates is an array:
      [firstArrayIndex, secondArrayIndex]
    */
    const [firstIndex, secondIndex] = coordinates;
    
    if (this.board[firstIndex][secondIndex]['hasBeenShot'] === false) {
      this.registerAttack(firstIndex, secondIndex);

      // Condition if location has ship
      if (this.board[firstIndex][secondIndex]['hasShip'] === true) {
        this.registerShipHit(firstIndex, secondIndex);
        return 'hit';
      } else {
        return 'miss';
      }
    } else {
      return 'Cell has already been shot';
    }
  }

  registerAttack(firstIndex, secondIndex) {
    this.board[firstIndex][secondIndex]['hasBeenShot'] = true;
  }

  registerShipHit(firstIndex, secondIndex) {
    let shipName = this.board[firstIndex][secondIndex]['shipName'];
    this.ships[shipName].ship.hit([firstIndex, secondIndex]);
    // checks to see if ship got sunked
    if (this.ships[shipName].ship.isSunk() === true) {
      this.ships[shipName].isShipSunk = true;
    }
  }

  computerPlaceShips() {
    const shipsList = [
      ['carrier', 5],
      ['battleship', 4],
      ['cruiser', 3],
      ['submarine', 3],
      ['destroyer', 2],
    ];

    const ships = shipsList.map(shipInfo => new Ship(shipInfo[1], shipInfo[0]));

    ships.forEach(ship => {
      let shipPlaced = false;
      while (!shipPlaced) {
        const startPoint = this.randomPointGen();
        if (this.isPlacementValid([startPoint[0], startPoint[1]], ship.length, startPoint[2])) {
          this.placeShip(ship, startPoint);
          shipPlaced = true;
        }
      }
    });
    

  }
  randomPointGen() {
    const randomOutI = Math.floor(Math.random() * (9 - 0) + 0);
    const randomInI = Math.floor(Math.random() * (9 - 0) + 0);
    const axis = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
    return [randomOutI, randomInI, axis];
  }
}

export default Gameboard;