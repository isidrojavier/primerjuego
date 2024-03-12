const canvas = document.getElementById('canvas1');
ctx = canvas.getContext('2d');
console.log(ctx);

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
//let x = 0;
//Es este el ancho por 6876/12 = 573
//Se divide entre 12 por que es el número de sprites, y son del mismo ancho
//obviamente el número principal es el ancho del png
//ancho y alto de la imagen del png
const spriteWidth = 575;
const spriteHeight = 523;//lo mismo es 5230/10=523
//identificamos dentro del sprite la imagen que queremos
let frameX = 0;
let frameY = 0;
//evita los cuadros vacios
let gameFrame = 0;
//Controla que el resto es igual que para ralentizar la animacion
const staggerFrames = 5;


function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.fillRect(x,50,100,100);
    //x++;
    //mejor forma para redibujar/animar
    //ctx.drawImage(imagen, sx, sy, sw, sh, dx, dy, dw, dh);
    //el 1*spriteWidth indica la imagen del sprite, si cambio a cualquiera de las otras parecerá movimiento
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    if (gameFrame % staggerFrames == 0){
        if (frameX < 6) frameX++;
        else frameX = 0
    }

    gameFrame++;
    requestAnimationFrame(animate);
};

animate();