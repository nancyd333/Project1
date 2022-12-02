const canvas = document.querySelector('canvas')
const leftMain = document.getElementById('left-main')
const ctx = canvas.getContext('2d')
let leftMainHeight = leftMain.offsetHeight
// clientHeight
let leftMainWidth = leftMain.offsetWidth
// clientWidth


//set canvas to the height / width of the div that contains it
//this sets it once and keeps it at that size
//TODO once you start the game you can't resize!!!
canvas.setAttribute('height',leftMainHeight)
canvas.setAttribute('width',leftMainWidth)

//check canvas width height
console.log("heightOfCanvas",leftMainHeight)
console.log("widthOfCanvas", leftMainWidth)

// console.log(ctx)
// console.log(leftMain.clientWidth)
// console.log(leftMain.clientHeight)

//==SPACESHIP==>

// const spaceshipImage = new Image()
    const spaceshipImage = document.createElement('img')
    spaceshipImage.src = 'spaceship.png'
    spaceshipImage.width = 60
    spaceshipImage.height = 100
    spaceshipImage.xcord = leftMainWidth/2
    spaceshipImage.ycord = leftMainHeight-175
    spaceshipImage.alt = 'spaceship'
    
    //check the values are set
    console.log("checkspaceshipImageCreateValues", "src", spaceshipImage.src, "img width",spaceshipImage.width, "img height", spaceshipImage.height, "img x", spaceshipImage.xcord, "img y", spaceshipImage.ycord)


function loadSpaceship(){
 
    //load spaceship in starting position
    spaceshipImage.onload = function(){
        
        ctx.drawImage(spaceshipImage, spaceshipImage.xcord,spaceshipImage.ycord,spaceshipImage.width,spaceshipImage.height)
        //check drawImage values
        console.log("drawImgValues","x",spaceshipImage.xcord,"y",spaceshipImage.ycord,"width",spaceshipImage.width,"height",spaceshipImage.height)
      
        }
    }

loadSpaceship()

function navigateSpaceship(e){
    
    if (e.key == 'a'){
        ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
        spaceshipImage.xcord -= 5
        console.log('move ss left',"xcord",spaceshipImage.xcord, "ycord",spaceshipImage.ycord,"x", spaceshipImage.x, "y", spaceshipImage.y)
        ctx.drawImage(spaceshipImage,spaceshipImage.xcord,spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
    }   
    if (e.key == 's'){
        ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
        spaceshipImage.xcord += 5
        console.log('move ss right',spaceshipImage.xcord, spaceshipImage.ycord)
        ctx.drawImage(spaceshipImage,spaceshipImage.xcord,spaceshipImage.ycord,spaceshipImage.width, spaceshipImage.height)
    }

}

document.addEventListener('keydown', navigateSpaceship)

function spaceshipResources(){
    //if astroid collision then move spaceship down 1
    //if fuel collision then move spaceship up 1
}

//== FUEL ==//

const fuelRectX = 20 // this can be randomly generated between 2 nos and determins which "column" fuel drops from, THIS IS THE ONLY VALUE THAT NEED TO CHANGE
const fuelRectY = 20 // this will increase on increment to move down the screen, however the orb Y needs to move with it, THIS IS THE ONLY VALUE THAT NEED TO CHANGE
const fuelRectWidth = 40 // this is static
const fuelRectHeight = fuelRectWidth // this is static

const fueliX= fuelRectX*2 // this will be part of the random generation to get it on the proper column
const fueliY= fuelRectY*2 // this has to increase when the orb moves down the screen
const fueliRad= 2 // this is static

const fueloX= fuelRectX*2 // this will be part of the random generation to get it on the proper column
const fueloY= fuelRectY*2 // this has to increase when the orb moves down the screen
const fueloRad= 20 // this is static



function createFuel(){
    // Create a radial gradient
    // The inner circle is at x=110, y=90, with radius=30
    // The outer circle is at x=100, y=100, with radius=70
    // const gradientFuel = ctx.createRadialGradient(55, 45, 5, 50, 50, 20);
    const gradientFuel = ctx.createRadialGradient(fueliX, fueliY, fueliRad, fueloX, fueloY, fueloRad);
    // Add three color stops
    gradientFuel.addColorStop(0, "blue");
    gradientFuel.addColorStop(0.9, "white");
    gradientFuel.addColorStop(1, "black");

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradientFuel;
    ctx.fillRect(fuelRectX, fuelRectY, fuelRectWidth, fuelRectHeight);
}

createFuel()


//--HOW DO YOU MOVE FUEL??==//

// function changeFuel(){
//     gradientFuel = ctx.createRadialGradient(fueliX, fueliY, fueliRad, fueloX, fueloY, fueloRad);
//     ctx.fillRect(fuelRectX, fuelRectY, fuelRectWidth, fuelRectHeight);
// }






//== SUPERNOVA ==/

//TODO make the gradient move across the screen back and forth
//changing the 50 value in the gradient will make the line appear to move ctx.createLinearGradient(0,50,150,0);
//this is the supernova
//TODO fiddle with the colors

let gradient = ctx.createLinearGradient(0,50,150,0);
gradient.addColorStop('0',"purple");
gradient.addColorStop('0.2',"orange");
gradient.addColorStop('0.5',"magenta");
gradient.addColorStop('0.7',"blue");
gradient.addColorStop('1.0',"green");
ctx.fillStyle = gradient;


//this slowly makes the supernova grow, note: supernoveInterval of 0 is the top of the screen
let supernovaY = leftMainHeight;
let supernovaX = 0;
let supernovaWidth = leftMainWidth;
let supernovaHeight = leftMainHeight;

function moveSuperNova(){
    
    supernovaY -= 1;
    ctx.fillRect(supernovaX,supernovaY,supernovaWidth,supernovaHeight);
    
    console.log("movesupernova: ","supernovaY",supernovaY,"spaceshipY",spaceshipImage.ycord, "supernovaX",supernovaX ,  "supernovaWidth",supernovaWidth,"supernovaHeight",supernovaHeight); 
    
    if(spaceshipImage.ycord+100 == supernovaY){
        console.log("supernova hit spaceship")
        // NEED TO ADD END OF GAME OUT LOGIC
    }

}
// setInterval(moveSuperNova, 800)




