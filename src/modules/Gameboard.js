class Gameboard {
  constructor() {
    this.board = Gameboard.createBoard();
    this.allShipsSunk = false;
    this.shipLocations = {};
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
  areAllShipsSunk(test=false) {
    // This method will be used to see when to flip the
    // allShipsSunk flag to true. But a test argument can be used
    // Simply to see if it gets called.
    if (test === true) {
      this.allShipsSunk = true;
    }
  }

  placeShip(ship, coordinates) {
    if (!this.isPlacementValid([coordinates[0], coordinates[1]], ship.length, coordinates[2])) {
      // If placement is invalid then it throws an error 
      throw new Error('Placement is invalid');
    }

    this.shipLocations[ship.name] = {
      locations: []
    };

    if (coordinates[2] === 'x') {
      for (let i = coordinates[1]; i < coordinates[1] + ship.length; i++) {
        this.board[coordinates[0]][i]['hasShip'] = true;
        this.board[coordinates[0]][i]['shipName'] = ship.name;
        this.shipLocations[ship.name]['locations'].push([coordinates[0], i]);
      }
    } else if (coordinates[2] === 'y') {
      let firstArrIndex = coordinates[0];
      for (let i = 0; i < ship.length; i++) {
        this.board[firstArrIndex][coordinates[1]]['hasShip'] = true;
        this.board[firstArrIndex][coordinates[1]]['shipName'] = ship.name;
        firstArrIndex++;
        this.shipLocations[ship.name]['locations'].push([firstArrIndex, coordinates[1]]);
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
}

export default Gameboard;