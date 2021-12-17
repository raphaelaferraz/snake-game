let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;

function criarFundo() {
  context.fillStyle = '#256458';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

criarFundo();
