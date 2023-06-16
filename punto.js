class punto {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    stroke("#000");
    point(this.x, this.y);
  }
}
