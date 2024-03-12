//Crearemos una variable que indique que está haciendo la imagen: quieto, corriendo, saltando, etc.
let playerState = "idle";

const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
}

)

const canvas = document.getElementById('canvas1');
ctx = canvas.getContext('2d');
//console.log(ctx);

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
//let frameX = 0;
//let frameY = 0;
//evita los cuadros vacios
let gameFrame = 0;
//Controla que el resto es igual que para ralentizar la animacion
const staggerFrames = 5;//mayor numero más lento

const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'gethit',
        frames: 4,
    }
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});

//console.log(spriteAnimations);

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //divido el gameFrame entre staggeredFrames, lo meto en el math para que no de decimales y obtengo el resto de dividirlo entre 6
    // es 6 por que tengo 6 fotogramas
    //cambio por SpriteAnimations.loc que es el que tendrá el número de imagenes que crea esa animacion
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    //let position = Math.floor(gameFrame/staggerFrames) % 6;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    //console.log(frameX + ", " + frameY);
    //mejor forma para redibujar/animar
    //ctx.drawImage(imagen, sx, sy, sw, sh, dx, dy, dw, dh);
    //el 1*spriteWidth indica la imagen del sprite, si cambio a cualquiera de las otras parecerá movimiento
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);



    gameFrame++;
    requestAnimationFrame(animate);
};

animate();