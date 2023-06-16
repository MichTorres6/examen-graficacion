function setup() {
  createCanvas(windowWidth, windowHeight);
  circle1x = width / 4;
  circle2X = width / 2;
  circle3X = (width / 4) * 3;
  circleY = height / 2;
  r = 100;
}

function draw() {
  background("blue");
  stroke("pink");
  strokeWeight(5);
  circuloPuntoMedio(circle1x, circleY, r);
  circuloPuntoMedio(circle2X, circleY, r);
  circuloPuntoMedio(circle3X, circleY, r);
  n = parseInt(prompt("Ingresa la cantidad de lineas en los circulos: "));
  angle = (2 * PI) / n;
  for (let i = 0; i < n; i++) {
    let xLinea = circle1x + r * cos(i * angle);
    let yLinea = circleY + r * sin(i * angle);
    puntoA = new punto(circle1x, circleY);
    puntoB = new punto(xLinea, yLinea);
    drawPuntos(puntoPendiente(puntoA, puntoB));
  }
  for (let i = 0; i < n; i++) {
    let xLinea = circle2X + r * cos(i * angle);
    let yLinea = circleY + r * sin(i * angle);
    puntoA = new punto(circle2X, circleY);
    puntoB = new punto(xLinea, yLinea);
    lineasDDA(puntoA, puntoB);
  }
  for (let i = 0; i < n; i++) {
    let xLinea = circle3X + r * cos(i * angle);
    let yLinea = circleY + r * sin(i * angle);
    puntoA = new punto(circle3X, circleY);
    puntoB = new punto(xLinea, yLinea);
    lineasBresenham(puntoA, puntoB);
  }
}

function drawPuntos(puntos) {
    for (let punto of puntos) {
      punto.draw();
      print(punto.x);
    }
  }

function puntoPendiente(punto1, punto2) {
  puntos = [];
  aumentoX = 0;
  if (punto1.x > punto2.x) {
    aumentoX = -1;
  } else if (punto1.x < punto2.x) {
    aumentoX = 1;
  }
  if (punto1.x === punto2.x) {
    x = punto1.x;
    if (punto1.y > punto2.y) {
      aumentoY = -1;
    } else {
      aumentoY = 1;
    }
    if (aumentoY == 1) {
      for (let y = punto1.y; y < punto2.y; y += aumentoY) {
        puntos.push(new punto(x, y));
      }
    } else {
      for (let y = punto1.y; y > punto2.y; y += aumentoY) {
        puntos.push(new punto(x, y));
      }
    }
  } else {
    m = (punto2.y - punto1.y) / (punto2.x - punto1.x);
    b = punto1.y - m * punto1.x;
    if (aumentoX == 1) {
      for (let x = punto1.x; x < punto2.x; x += aumentoX) {
        y = m * x + b;
        puntos.push(new punto(x, y));
      }
    } else {
      for (let x = punto1.x; x > punto2.x; x += aumentoX) {
        y = m * x + b;
        puntos.push(new punto(x, y));
      }
    }
  }
  return puntos;
}

function lineasDDA(punto1, punto2) {
  let dx = punto2.x - punto1.x;
  let dy = punto2.y - punto1.y;
  let pasos = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
  let aumentoX = dx / pasos;
  let m = dy / pasos;
  let x = punto1.x;
  let y = punto1.y;
  for (let i = 0; i <= pasos; i++) {
    point(x, y);
    x += aumentoX;
    y += m;
  }
}

function lineasBresenham(punto1, punto2) {
  let dx = abs(punto2.x - punto1.x);
  let dy = abs(punto2.y - punto1.y);
  let aumentoX = punto1.x < punto2.x ? 1 : -1;
  let aumentoY = punto1.y < punto2.y ? 1 : -1;
  let err = dx - dy;
  if (aumentoX == 1) {
    if (aumentoY == 1) {
      while (punto1.x <= punto2.x && punto1.y <= punto2.y) {
        point(punto1.x, punto1.y);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          punto1.x += aumentoX;
        }
        if (e2 < dx) {
          err += dx;
          punto1.y += aumentoY;
        }
      }
    } else if (aumentoY == -1) {
      while (punto1.x <= punto2.x && punto1.y >= punto2.y) {
        point(punto1.x, punto1.y);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          punto1.x += aumentoX;
        }
        if (e2 < dx) {
          err += dx;
          punto1.y += aumentoY;
        }
      }
    }
  } else if (aumentoX == -1) {
    if (aumentoY == 1) {
      while (punto1.x >= punto2.x && punto1.y <= punto2.y) {
        point(punto1.x, punto1.y);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          punto1.x += aumentoX;
        }
        if (e2 < dx) {
          err += dx;
          punto1.y += aumentoY;
        }
      }
    } else if (aumentoY == -1) {
      while (punto1.x >= punto2.x && punto1.y >= punto2.y) {
        point(punto1.x, punto1.y);
        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          punto1.x += aumentoX;
        }
        if (e2 < dx) {
          err += dx;
          punto1.y += aumentoY;
        }
      }
    }
  }
}

function circuloPuntoMedio(x, y, radio) {
  let xAux = 0;
  let yAux = radio;
  let d = 1 - radio;
  while (xAux <= yAux) {
    point(x + xAux, y + yAux);
    point(x + yAux, y + xAux);
    point(x - xAux, y + yAux);
    point(x - yAux, y + xAux);
    point(x + xAux, y - yAux);
    point(x + yAux, y - xAux);
    point(x - xAux, y - yAux);
    point(x - yAux, y - xAux);
    if (d < 0) {
      d += 2 * xAux + 3;
    } else {
      d += 2 * (xAux - yAux) + 5;
      yAux--;
    }
    xAux++;
  }
}