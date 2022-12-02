const canvas = document.querySelector('canvas')
const leftMain = document.getElementById('left-main')
const ctx = canvas.getContext('2d')

//set canvas to the height / width of the div that contains it
//this sets it once and keeps it at that size
//TODO once you start the game you can't resize!!!
canvas.setAttribute('height',leftMain.clientHeight)
canvas.setAttribute('width',leftMain.clientWidth)

// console.log(ctx)
// console.log(leftMain.clientWidth)
// console.log(leftMain.clientHeight)

//images
const fuelImage= new Image();
fuelImage.src='sun.jpeg'
fuelImage.onload=function(){
    ctx.drawImage(fuelImage, 0,750, 35,35);
}

const astroid1Image= new Image();
astroid1Image.src='astroid1.jpg'
astroid1Image.onload=function(){
    ctx.drawImage(astroid1Image, 0,50, 45,45);
}

const spaceshipImage= new Image();
spaceshipImage.src='spaceship.png'
spaceshipImage.onload=function(){
    ctx.drawImage(spaceshipImage, 0,200, 100,100);
}

ctx.beginPath();
ctx.moveTo(0,28)
ctx.bezierCurveTo(0,28,31,7,70,8);
ctx.bezierCurveTo(109,9,313,99,425,90);
ctx.bezierCurveTo(516,82.5,536,55,536,55);
ctx.stroke();










