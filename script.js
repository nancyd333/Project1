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



//need to randomly generate number and assign to fuel or to astroid

function getRandomInt(n){
    return Math.floor(Math.random() * n)
}

function createNewImage(name,src,width,height,xcord,ycord,alt)  {
        name.src= src
        name.width = width
        name.height = height
        name.xcord = xcord
        name.ycord = ycord
        name.alt = alt
}

function loadImage(name){

    //generate image on page
    name.onload = function(){
        
        ctx.drawImage(name, name.xcord,name.ycord,name.width,name.height)
            //check drawImage values
            console.log(name,"drawImgValues","x",name.xcord,"y",name.ycord,"width",name.width,"height",name.height)
        }
    }
    
//move image && detect collision

function moveImage(name, type){
    ctx.clearRect(name.xcord, name.ycord, name.width, name.height)
    name.ycord += 5
        console.log(name,'move',"xcord",name.xcord, "ycord",name.ycord,"x", name.x, "y", name.y)
    ctx.drawImage(name,name.xcord,name.ycord, name.width, name.height)

    //y: on the same plane so you just need to check one from fuel/astroid and space ship
    //x: one corner from fuel/astroid should be between both corners from spaceship
    //x: other corner from fuel/astroid shold be between both corners from spaceship

    let test1 = (spaceshipImage.ycord <= name.ycord+30)
    let test2 = (spaceshipImage.xcord >=name.xcord &&spaceshipImage.xcord <= name.xcord+30)
    let test3 = (spaceshipImage.xcord+60 >=name.xcord &&spaceshipImage.xcord+60 <= name.xcord+30)
    let test4 = (spaceshipImage.xcord < name.xcord && spaceshipImage.xcord+60 > name.xcord+30)
    if ( (test1 && test2) || (test1 && test3) || (test1 && test4)){
        console.log(type,"hit spaceship")
        clearInterval(name + 'Interval')
        clearFuel()
        moveSpaceship(type)
        
    }

}

//clear image

function clearFuel(name){
    ctx.clearRect(name.xcord, name.ycord, name.width, name.height)

}

//== FUEL ==//

// create the fuel images 

const fuelImage = document.createElement('img')
createNewImage(fuelImage,'sun.jpeg',30,30,getRandomInt(leftMainHeight),0,'sun')

const fuelImage1 = document.createElement('img')
createNewImage(fuelImage1,'sun.jpeg',30,30,getRandomInt(leftMainHeight)+10,10,'sun')

    //check the values are set
    console.log("checksFuelImageCreateValues", "src", fuelImage.src, "img width",fuelImage.width, "img height", fuelImage.height, "img x", fuelImage.xcord, "img y", fuelImage.ycord)

loadImage(fuelImage)
loadImage(fuelImage1)

const fuelImageInterval = setInterval(()=>{moveImage(fuelImage,"fuel")},1000)
const fuelImage1Interval = setInterval(()=>{moveImage(fuelImage1,"fuel")},2000)



//== ASTRIOD ==//

//create new astroids
const astroidImage = document.createElement('img')
createNewImage(astroidImage,'astroid1.jpg',30,30,getRandomInt(leftMainHeight),0,'astroid')

const astroidImage1 = document.createElement('img')
createNewImage(astroidImage1,'astroid1.jpg',30,30,getRandomInt(leftMainHeight),0,'astroid')

    //check the values are set
    console.log("checksAstroidImage1CreateValues", "src", astroidImage1.src, "img width",astroidImage1.width, "img height", astroidImage1.height, "img x", astroidImage1.xcord, "img y", astroidImage1.ycord)

    console.log("checksAstroidImageCreateValues", "src", astroidImage.src, "img width",astroidImage.width, "img height", astroidImage.height, "img x", astroidImage.xcord, "img y", astroidImage.ycord)

loadImage(astroidImage)
loadImage(astroidImage1)

const astroidImageInterval = setInterval(()=>{moveImage(astroidImage,"astroid")},1000)
const astroidImage1Interval = setInterval(()=>{moveImage(astroidImage1,"astroid")},2000)


//== SUPERNOVA ==/

//TODO make the gradient move across the screen back and forth
//changing the 50 value in the gradient will make the line appear to move ctx.createLinearGradient(0,50,150,0);
//this is the supernova
//TODO fiddle with the colors

let gradientChangeValue = 50

let gradient = ctx.createLinearGradient(0,gradientChangeValue,150,0);
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

        //maybe move some of this into a reset function
        clearImage(fuelImage);
        clearImage(fuelImage1);
        clearImage(astroidImage);
        clearImage(astroidImage1);
        ctx.fillRect(supernovaX,0,supernovaWidth,supernovaHeight);
        clearInterval(moveSuperNovaInterval)
        clearInterval(fuelImageInterval)
        clearInterval(fuelImage1Interval)
        clearInterval(astroidImageInterval)
        clearInterval(astroidImage1Interval)
    }

}

const moveSuperNovaInterval = setInterval(moveSuperNova, 800)






