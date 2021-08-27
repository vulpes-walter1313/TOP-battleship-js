import Gameboard from "./Gameboard";

class Player {
  constructor(name) {
    this.name = name || 'computer';
    this.gameboard = new Gameboard();
    this.enemyBoard = new Gameboard();
    this.validMoves = Player.resetMoves();
  }

  computerMove() {
    const randomNumber = Math.floor(Math.random() * this.validMoves.length);
    const [firstIndex, secondIndex] = this.validMoves[randomNumber];
    this.validMoves.splice(randomNumber, 1);
    return [firstIndex, secondIndex];
  }

  randomNumGen() {
    const randomNumber = Math.floor(Math.random() * (9 - 0) + 0);
    return randomNumber;
  }

  static resetMoves() {
    let moves = [];
    for (let outI = 0; outI < 10; outI++) {
      for (let inI = 0; inI < 10; inI ++) {
        const point = [outI, inI];
        moves.push(point);
      }
    }
    return moves;
  }
}

export default Player;