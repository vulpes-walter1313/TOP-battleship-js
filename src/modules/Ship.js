class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
    this.sunk = false;
  }
  hit(position) {
    this.hits.push(position);
  }
  isSunk() {
    if (this.hits.length === this.length) {
      return true;
    } else {
      return false;
    }
  }
}

export default Ship;