import Gameboard from "./Gameboard";

class Player {
  constructor(name) {
    this.name = name || 'computer';
    this.gameboard = new Gameboard();
    this.enemyBoard = new Gameboard();
  }

  computerMove() {
    let firstIndex = this.randomNumGen();
    let secondIndex = this.randomNumGen();

    while (this.enemyBoard.board[firstIndex][secondIndex].hasBeenShot === true) {
      firstIndex = this.randomNumGen();
      secondIndex = this.randomNumGen();
    }
    this.enemyBoard.receiveAttack([firstIndex, secondIndex]);
    
    return [firstIndex, secondIndex];
  }

  randomNumGen() {
    const randomNumber = Math.floor(Math.random() * (9 - 0) + 0);
    return randomNumber;
  }
}

export default Player;