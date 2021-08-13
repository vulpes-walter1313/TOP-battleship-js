class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
    this.hits = [];
    this.sunk = false;
  }
  hit(position) {
    this.hits.push(position);
  }
  isSunk() {
    if (this.hits.length === this.length) {
      this.sunk = true;
      return true;
    } else {
      return false;
    }
  }
}

export default Ship;