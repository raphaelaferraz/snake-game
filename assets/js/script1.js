let canvas = document.getElementById('snake'); //Elemento responsável pela animação do jogo
let context = canvas.getContext('2d');
let box = 32;
let snake = []; //A cobrinha é criada como uma lista, pois ela será constituída por uma série de coordenadas que serão pintadas, formando os quadradinhos
snake[0] = {
  x: 8 * box,
  y: 8 * box
};
let direction = 'right';
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};
let pointHTML = document.getElementById('points');
let point = 0;
pointHTML.innerText = `Punctuation: ${point}`;

function createBackground() {
  context.fillStyle = '#267602';
  context.fillRect(0, 0, 16 * box, 16 * box); //cria o retângulo através do x, y, largura e altura
}

function createSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = '#A1CF46';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = '#dd1f1f';
  context.fillRect(food.x, food.y, box, box);
}

//responsável por captar todos os acontecimentos, neste caso, todos os acontecimentos do teclado
document.addEventListener('keydown', update);

//responsável por atribuir os movimentos à cobrinha
function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left';
  if (event.keyCode == 38 && direction != 'down') direction = 'up';
  if (event.keyCode == 39 && direction != 'left') direction = 'right';
  if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function gameStart() {
  //Condicionais que permitem que a cobrinha "atravesse" o espaço setado da animação
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

  //laço responsável por definir quando a tamanho da cobrinha aumenta ou permanece o mesmo, e quando o jogo acaba
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert(`Game over :( Total of points: ${totalPoints}`);
      location = location;
    }
  }

  createBackground();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == 'right') snakeX += box;
  if (direction == 'left') snakeX -= box;
  if (direction == 'up') snakeY -= box;
  if (direction == 'down') snakeY += box;

  //condicional responsável por fazer com que a comida da cobrinha apareça em lugares aleatórios
  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    point = point + 1;
    totalPoints = point;
    pointHTML.innerText = `Punctuation: ${point}`;
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  //variável responsável por criar a cabeça da cobrinha
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  snake.unshift(newHead);
}

let game = setInterval(gameStart, 120);

gameStart();
