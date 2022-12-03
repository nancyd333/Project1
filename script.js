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
        console.log("SpaceshipdrawImgValues","x",spaceshipImage.xcord,"y",spaceshipImage.ycord,"width",spaceshipImage.width,"height",spaceshipImage.height)
      
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
        console.log('move ss right',"xcord",spaceshipImage.xcord,"ycord", spaceshipImage.ycord)
        ctx.drawImage(spaceshipImage,spaceshipImage.xcord,spaceshipImage.ycord,spaceshipImage.width, spaceshipImage.height)
    }

}

document.addEventListener('keydown', navigateSpaceship)

function moveSpaceship(updown){
    //if astroid collision then move spaceship down 1
    //if fuel collision then move spaceship up 1
    
    rememberSpaceShipLocX = spaceshipImage.xcord
    rememberSpaceShipLocY = spaceshipImage.ycord
    
    ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
    
        console.log('move ss right',"xcord",spaceshipImage.xcord,"ycord", spaceshipImage.ycord)
    
    if(updown = "fuel"){
        ctx.drawImage(spaceshipImage,rememberSpaceShipLocX,rememberSpaceShipLocY+10,spaceshipImage.width, spaceshipImage.height)
            console.log("moveSpaceship","x", spaceshipImage.xcord,"y",spaceshipImage.ycord)
    }
    if (updown = "astroid"){
        ctx.drawImage(spaceshipImage,rememberSpaceShipLocX,rememberSpaceShipLocY-10,spaceshipImage.width, spaceshipImage.height)
            console.log("moveSpaceship","x", spaceshipImage.xcord,"y",spaceshipImage.ycord)
    }
}

//== FUEL ==//

//need to randomly generate number and assign to fuel or to astroid

function getRandomInt(n){
    return Math.floor(Math.random() * n)
    
}

const fuelImage = document.createElement('img')
fuelImage.src = 'sun.jpeg'
fuelImage.width = 30
fuelImage.height = 30
fuelImage.xcord = getRandomInt(leftMainHeight)
fuelImage.ycord = 0
fuelImage.alt = 'sun'

//check the values are set
console.log("checksFuelImageCreateValues", "src", fuelImage.src, "img width",fuelImage.width, "img height", fuelImage.height, "img x", fuelImage.xcord, "img y", fuelImage.ycord)


function loadFuel(){

//load spaceship in starting position
fuelImage.onload = function(){
    
    ctx.drawImage(fuelImage, fuelImage.xcord,fuelImage.ycord,fuelImage.width,fuelImage.height)
    //check drawImage values
    console.log("FueldrawImgValues","x",fuelImage.xcord,"y",fuelImage.ycord,"width",fuelImage.width,"height",fuelImage.height)
  
    }
}

loadFuel()


//move fuel && detect collision

function moveFuel(){
    ctx.clearRect(fuelImage.xcord, fuelImage.ycord, fuelImage.width, fuelImage.height)
    fuelImage.ycord += 5
        console.log('move fuel',"xcord",fuelImage.xcord, "ycord",fuelImage.ycord,"x", fuelImage.x, "y", fuelImage.y)
    ctx.drawImage(fuelImage,fuelImage.xcord,fuelImage.ycord, fuelImage.width, fuelImage.height)

    //y: on the same plane so you just need to check one from fuel and space ship
    //x: one corner from fuel should be between both corners from spaceship
    //x: other corner from fuel shold be between both corners from spaceship

    let test1 = (spaceshipImage.ycord <= fuelImage.ycord+30)
    let test2 = (spaceshipImage.xcord >=fuelImage.xcord &&spaceshipImage.xcord <= fuelImage.xcord+30)
    let test3 = (spaceshipImage.xcord+60 >=fuelImage.xcord &&spaceshipImage.xcord+60 <= fuelImage.xcord+30)
    let test4 = (spaceshipImage.xcord < fuelImage.xcord && spaceshipImage.xcord+60 > fuelImage.xcord+30)
    if ( (test1 && test2) || (test1 && test3) || (test1 && test4)){
        console.log("fuel hit spaceship")
        clearInterval(moveFuelInterval)
        clearFuel()
        moveSpaceship("fuel")
        
    }

}

const moveFuelInterval = setInterval(moveFuel,1000)

function clearFuel(){
    ctx.clearRect(fuelImage.xcord, fuelImage.ycord, fuelImage.width, fuelImage.height)

}


//== ASTRIOD ==//

const astroid1Image = document.createElement('img')
astroid1Image.src = 'astroid1.jpg'
astroid1Image.width = 30
astroid1Image.height = 30
astroid1Image.xcord = getRandomInt(leftMainHeight)
astroid1Image.ycord = 0
astroid1Image.alt = 'astriod'

//check the values are set
console.log("checksAstroidImageCreateValues", "src", astroid1Image.src, "img width",astroid1Image.width, "img height", astroid1Image.height, "img x", astroid1Image.xcord, "img y", astroid1Image.ycord)


function loadAstroid(){

//load astroid in starting position
astroid1Image.onload = function(){
    
    ctx.drawImage(astroid1Image, astroid1Image.xcord,astroid1Image.ycord,astroid1Image.width,astroid1Image.height)
    //check drawImage values
    console.log("AstroiddrawImgValues","x",astroid1Image.xcord,"y",astroid1Image.ycord,"width",astroid1Image.width,"height",astroid1Image.height)
  
    }
}

loadAstroid()


//move astroid && detect collision

function moveAstroid(){
    ctx.clearRect(astroid1Image.xcord, astroid1Image.ycord, astroid1Image.width, astroid1Image.height)
    astroid1Image.ycord += 5
        console.log('move astroid',"xcord",astroid1Image.xcord, "ycord",astroid1Image.ycord,"x", astroid1Image.x, "y", astroid1Image.y)
    ctx.drawImage(astroid1Image,astroid1Image.xcord,astroid1Image.ycord, astroid1Image.width, astroid1Image.height)

    //y: on the same plane so you just need to check one from fuel and space ship
    //x: one corner from fuel should be between both corners from spaceship
    //x: other corner from fuel shold be between both corners from spaceship

    let test1 = (spaceshipImage.ycord <= astroid1Image.ycord+30)
    let test2 = (spaceshipImage.xcord >=astroid1Image.xcord &&spaceshipImage.xcord <= astroid1Image.xcord+30)
    let test3 = (spaceshipImage.xcord+60 >=astroid1Image.xcord &&spaceshipImage.xcord+60 <= astroid1Image.xcord+30)
    let test4 = (spaceshipImage.xcord < astroid1Image.xcord && spaceshipImage.xcord+60 > astroid1Image.xcord+30)
    if ( (test1 && test2) || (test1 && test3) || (test1 && test4)){
        console.log("astroid hit spaceship")
        clearInterval(moveAstroidInterval)
        clearAstroid()
        moveAstroid("astroid")
        
    }

}

const moveAstroidInterval = setInterval(moveAstroid,1000)

function clearAstroid(){
    ctx.clearRect(astroid1Image.xcord, astroid1Image.ycord, astroid1Image.width, astroid1Image.height)

}







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
        //cover the screen with the supernova
        ctx.fillRect(supernovaX,0,supernovaWidth,supernovaHeight);
        clearFuel();
    }

}

setInterval(moveSuperNova, 800)






