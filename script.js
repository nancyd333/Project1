//== GLOBAL VARIABLES ==/

const canvas = document.querySelector('canvas')
const body = document.querySelector('html')
const leftMain = document.getElementById('left-main')
const resetButton = document.getElementById('resetButton')
const spaceshipImage = document.createElement('img')
const userMessage = document.getElementById('user-message')
const userMessage2 = document.getElementById('user-message2')
const playerOneDiv = document.getElementById('player-one')
const playerIncHitId = document.getElementById('playerIncHitId')
const playerDecHitId = document.getElementById('playerDecHitId')
const playerMenuIncHitImgElement = document.createElement('img')
const playerMenuIncHitSpanElement = document.createElement('span')
const playerMenuDecHitImgElement = document.createElement('img')
const playerMenuDecHitSpanElement = document.createElement('span')
const middleTopDiv = document.getElementById('middleTopDiv')
const ctx = canvas.getContext('2d')
let leftMainHeight = leftMain.clientHeight//offsetHeight as opposed to clientHeight
let leftMainWidth = leftMain.clientWidth//offsetWidth as opposed to clientWidth
// let gradientTrackNum = 0
// let gradientIncNo = 20
// let gradientEndNo = leftMainWidth -200
// let gradientChangeValue = 0
let imageHeight = 30
let imageWidth = 30
let spaceshipHeight = 100
let spaceshipWidth = 60
let spaceshipLeftRightSpeed = 50
let spaceshipHitMoveUpNo = 50 
let spaceshipHitMoveDownNo = 10
let gameStatus = 0 // gameStatus 1 is in-play and 0 is not in-play
// let bodyHeight = body.clientHeight
// let bodyWidth = body.clientWidth
let spacePic = '24752-5-spaceship.png'
let spaceAlt = 'spaceship'
let decHitItemPic = 'astroid1.jpg'
let incHitItemPic = 'sun.jpeg'
let imgArray = []
let imgLocations = []
let intervalList = []

//need to fix this to use class
let minImgIntervalRate = 10 //set rate at which astroids and fuel drop from the sky
let maxImgIntervalRate = 150 //set rate at which astroids and fuel drop from the sky


// class to create the event that is impeding doom on the player
class EventItem{
    constructor(){
        this.xcord = 0;
        this.ycord = leftMainHeight;
        this.width = leftMainWidth;
        this.height = leftMainHeight;
        this.intervalId = '';
        this.intervalRate = 200;
        this.gradientTrackNum = 0;
        this.gradientIncNo = 20;
        this.gradientEndNo = leftMainWidth -200;
        this.gradientChangeValue = 0;
    }

    resetEvent(){
        this.xcord = 0;
        this.ycord = leftMainHeight;
        this.width = leftMainWidth;
        this.height = leftMainHeight;
        this.intervalId = '';
        this.intervalRate = 200;
        this.gradientTrackNum = 0;
        this.gradientIncNo = 20;
        this.gradientEndNo = leftMainWidth -200;
        this.gradientChangeValue = 0;
    }

}
const event1 = new EventItem()

// class to create objects that increment and decrement the player
class HitItem{
    constructor(name,src,width, height,xcord,ycord,type,intervalId, imgLocId){
        this.name = name;
        this.src = src;
        this.width = width;
        this.height = height;
        this.xcord = xcord;
        this.ycord = ycord;
        this.type = type.toLowerCase();
        this.displayName = type.charAt(0).toUpperCase() + type.slice(1) 
        this.alt = type.toLowerCase();
        this.intervalId = intervalId;
        this.imgLocId = imgLocId;
        this.counter = 0
    }

}

const incHitItem = new HitItem('fuelImage', incHitItemPic, imageWidth, imageHeight, 0,0, 'fuel','','')
const decHitItem = new HitItem('astroidImage', decHitItemPic, imageWidth, imageHeight, 0,0, 'astroid','','')

//set canvas to the height / width of the div that contains it
//canvas size is sets once and keeps it at that size
canvas.setAttribute('height',leftMainHeight)
canvas.setAttribute('width',leftMainWidth)




    //check value
    // console.log("heightOfCanvas",leftMainHeight)
    // console.log("widthOfCanvas", leftMainWidth)
    // console.log("widthOfBody", bodyWidth)
    // console.log("heightOfBody", bodyHeight)
    // console.log(ctx)
    // console.log(leftMain.clientWidth)
    // console.log(leftMain.clientHeight)


//== MULTI-PURPOSE FUNCTIONS ==//
 
//==CLEAR IMAGE from screen==/

//use this to clear image 
function clearImage(name){
    ctx.clearRect(name.xcord, name.ycord, name.width, name.height)

}

// use this to draw image
function drawImage(name){
    ctx.drawImage(name,name.xcord, name.ycord, name.width, name.height)

}

// use this to fill rectangle? not being used yet
// need to write code here
function fillRect(name){
 ctx.fillRect(name.xcord,name.ycord,name.width,name.height);

}


//give two numbers and get random integer between those two numbers (inclusive of the numbers given)
//min 0, max 10 will give random number between 0 and 10
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

//==RESET PARTS OF SCREEN based on the type of event==//

function reset(type){
    // need to remove event listener
    // removeEventListener('keypress',navigateSpaceship,false)
    gameStatus = 0
    // ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
    clearImage(spaceshipImage)

    if(type=='supernovaEvent'){
        for(let i = 0; i < imgArray.length; i++){
            clearImage(imgArray[i])
            clearInterval(imgArray[i].intervalId)
        }
        clearImage(spaceshipImage)
        userMessage2.innerText = ''
        ctx.fillRect(event1.xcord,0,event1.width,event1.height)
    } else if (type=='resetGame'){
        for(let i = 0; i < imgArray.length; i++){
            clearImage(imgArray[i])
            clearInterval(imgArray[i].intervalId)
            //checkvalue
            console.log('resetGame',imgArray)
        }
        ctx.clearRect(0,0, event1.width, event1.height)
        clearInterval(event1.intervalId)
        event1.resetEvent()
        imgArray = []
        imgLocations =[]
        intervalList=[]
        leftMainHeight = leftMain.clientHeight
        leftMainWidth = leftMain.clientWidth
        bodyHeight = body.clientHeight //is this used?
        bodyWidth = body.clientWidth // is this used?
        incHitItem.counter = 0
        decHitItem.counter = 0      
        userMessage.innerText = ''
        userMessage2.innerText = ''
        loadGame()
    } else if (type =='winGame'){
        for(let i = 0; i < imgArray.length; i++){
            clearImage(imgArray[i])
            clearInterval(imgArray[i].intervalId)
        }   
        ctx.clearRect(0, 0, event1.width, event1.height)
        clearInterval(event1.intervalId)
        event1.resetEvent()
        clearImage(spaceshipImage)
        userMessage2.innerText = ''
    }
}

//used by button to reset game
function onResetClick(){
    reset('resetGame')
    
    //check value
    console.log('reset clicked')

}

//==SPACESHIP==> 

//create spaceship image
 function createSpaceshipImage(name, src,width,height,xcord,ycord,alt)  {
    name.src= src
    name.width = width
    name.height = height
    name.xcord = xcord
    name.ycord = ycord
    name.alt = alt
}

//load spaceship image
function loadSpaceshipImage(name){
    //generate image on page
    name.onload = function(){
        drawImage(name) 
        // ctx.drawImage(name, name.xcord,name.ycord,name.width,name.height)
        //check value
        // console.log(name,"drawImgValues","x",name.xcord,"y",name.ycord,"width",name.width,"height",name.height)
    }
}


//==SUPERNOVA==//

//creates the supernova drawing
function startEvent(){
    event1.ycord -= 1;
    fillRect(event1)
    gradientEventIncrement(event1)
        //check value
        // console.log("movesupernova: ","supernovaY",supernovaY,"spaceshipY",spaceshipImage.ycord, "supernovaX",supernovaX ,  "supernovaWidth",supernovaWidth,"supernovaHeight",supernovaHeight);
}

//set gradient for supernova
function gradientEvent(name){
    let gradient = ctx.createLinearGradient(0,name.gradientChangeValue,400,0); //150,0
    gradient.addColorStop('0', '#fee440');
    gradient.addColorStop('0.2',"orange");
    gradient.addColorStop('0.5',"red");
    gradient.addColorStop('0.7',"magenta"); 
    gradient.addColorStop('1.0',"#390099"); 
    ctx.fillStyle = gradient;
}

//set gradient movement in the supernova
function gradientEventIncrement(name){
      
    //-- this code moves the gradient back and forth across the screen
    let inc = name.gradientIncNo
    let max = name.gradientEndNo
    if (name.gradientChangeValue == max){
        name.gradientTrackNum = max
    }
    if (name.gradientChangeValue == 0){
        name.gradientTrackNum = 0
    }
    if(name.gradientTrackNum == max){
        name.gradientChangeValue -= inc
    }
    if(name.gradientTrackNum == 0){
        name.gradientChangeValue += inc
    }
    
    // console.log("changevalue", gradientChangeValue,"num", gradientTrackNum, )
    gradientEvent(name)
}

//==ASTROIDS AND FUEL==//


//image array to track images
//this is only called on set up
//numstart allows for loading of fuel and then astroid
//num is the number of items you want to create in the array
function createImageArray(name, src, width, height, xcord, ycord,alt, type){
    // let pixelCounter = 0
    let numstart = 0
    if(!imgArray.length){
        numstart = 0
    } else numstart=imgArray.length

    for(let i=numstart; i<numstart+1; i++){
        imgArray.push(new Image())
        imgArray[i].name = name  + i
        imgArray[i].src = src
        imgArray[i].width = width
        imgArray[i].height = height
        imgArray[i].xcord = xcord
        imgArray[i].ycord = ycord
        imgArray[i].alt = alt
        imgArray[i].type = type
        imgArray[i].intervalId = ''
        imgArray[i].imgLocId = '' //this is the screen "column", the x coordinate that the image will always fall from
        imgArray[i].num = i

        //check value
        console.log("createImageArray", imgArray[i].name, imgArray[i].src, imgArray[i].width,imgArray[i].height,imgArray[i].xcord,imgArray[i].ycord,imgArray[i].alt,imgArray[i].display,imgArray[i].id ,imgArray[i].intervalId,"numstart",numstart,"locId",imgArray[i].imgLocId, 'i', i)

    }

}

//get the positions for the current browser screen and use to determine the location of the images
//need all images added to array before this can be calcualted
function populateImgLocationsArray(){
    let counter = 0
    imgLoc = Math.floor(leftMainWidth * .90 / imgArray.length)   
        //check value
        console.log("imgLoc",imgLoc, imgArray.length)

    for(let i=0; i < imgArray.length; i++ ){
        counter += imgLoc
        imgLocations[i] = counter
            //check value
            console.log("setcoords",counter, imgLocations)
    }
    
}

//set image location to the images array
function setImageLocations(){
    for(let i = 0; i < imgArray.length; i++){
        imgArray[i].xcord = imgLocations[i]
        imgArray[i].imgLocId = imgLocations[i]
    }
        //check value
        // console.log('check xcord assignment')    

}

//creates the intervals for the astroid and fuel and saves the interval id for later use
function setImageIntervals(){
    let interval = 0
    for(let i = 0; i < imgArray.length; i++){
        interval = getRandomInteger(minImgIntervalRate,maxImgIntervalRate)
        imgArray[i].intervalId = setInterval(()=>{moveImage(imgArray[i],imgArray[i].type)},interval)
            //check value
            //console.log("setImageInterval",imgArray[i])
        
    }
}

//create the Player 1 section for Fuel with image
function createPlayerMenuIncHitMessage(){
    playerMenuIncHitImgElement.src = incHitItem.src
    playerMenuIncHitImgElement.alt = incHitItem.alt
    playerMenuIncHitImgElement.width = 10
    playerMenuIncHitImgElement.height = 10
    playerIncHitId.append(playerMenuIncHitImgElement)
    playerMenuIncHitSpanElement.id = incHitItem.type + 'Span'
    playerIncHitId.append(playerMenuIncHitSpanElement)
    playerMenuIncHitSpanElement.innerText = `${incHitItem.displayName}: ${incHitItem.counter}`
}

//create the Player 1 section for Astroid with image
function createPlayerMenuDecHitMessage(){
    playerMenuDecHitImgElement.src = decHitItem.src
    playerMenuDecHitImgElement.alt = decHitItem.alt
    playerMenuDecHitImgElement.width = 15
    playerMenuDecHitImgElement.height = 15
    playerDecHitId.append(playerMenuDecHitImgElement)
    playerMenuDecHitSpanElement.id = decHitItem.type + 'Span'
    playerDecHitId.append(playerMenuDecHitSpanElement)
    playerMenuDecHitSpanElement.innerText = `${decHitItem.displayName}: ${decHitItem.counter}`
}

//creates a astroid or fuel image, chosen at random
//num is the number of total images you want to create
//assumes screen position will be assigned at this step, such as on game load
function createRandomImage(num, hitItem1, hitItem2){
    for(let i=0; i < num; i++){
        if(getRandomInteger(0,1)==1){
            createImageArray(hitItem1.name,hitItem1.src,hitItem1.width,hitItem1.height,hitItem1.xcord,hitItem1.ycord,hitItem1.alt,hitItem1.type)
        } else {
            createImageArray(hitItem2.name,hitItem2.src,hitItem2.width,hitItem2.height,hitItem2.width,hitItem2.height,hitItem2.alt,hitItem2.type)
        }
    }
}

//once astroid/fuel hits supernova a random fuel/astroid needs to be added to that array location and fall from the ycord 0 but the same xcord as the one that hit the supernova
function recycleRandomImage(array){
    clearImage(array)
    //check value
    // console.log("recycleImage before", array)
    for(let i=0; i < 1; i++){
        if(getRandomInteger(0,1)==1){
            array.name = incHitItem.name + array.num
            array.src = incHitItem.src
            array.width = incHitItem.width
            array.height = incHitItem.height
            array.ycord = 0
            array.alt = incHitItem.alt
            array.type = incHitItem.type
            clearInterval(array.intervalId)
            interval = getRandomInteger(minImgIntervalRate,maxImgIntervalRate)
            array.intervalId = setInterval(()=>{moveImage(array,array.type)},interval)
            drawImage(array)
            // ctx.drawImage(array,array.xcord,array.ycord, array.width, array.height)
            //check value
            // console.log("recycleImage after",array)
        } else {
            array.name = decHitItem.name + array.num
            array.src = decHitItem.src
            array.width = decHitItem.width
            array.height = decHitItem.height
            array.ycord = 0
            array.alt = decHitItem.alt
            array.type = decHitItem.type
            clearInterval(array.intervalId)
            interval = getRandomInteger(minImgIntervalRate,maxImgIntervalRate)
            array.intervalId = setInterval(()=>{moveImage(array,array.type)},interval)
            drawImage(array)
            //ctx.drawImage(array,array.xcord,array.ycord, array.width, array.height)
            //check value
            // console.log("recycleImage after",array)
        }
    }

}


//== LOAD GAME ==//

// loads the game
function loadGame(){
    gameStatus = 1
    //create objects for fuel and astroid
    // createBaseFuelObject()
    // createBaseAstroidObject()
    userMessage.innerText = `Escape the supernova`
    userMessage.style.color = "red"
    userMessage2.style.fontSize = 'small'
    userMessage2.innerText = `Your spaceship is caught near a supernova and is running out of fuel.${'\n'}Collect fuel to move forward and escape before the supernova expands and consumes you.${'\n'}Watch out, the astroids knock you backwards!${'\n'}Press 'a' to move left and 's' to move right.`

    //populate Player 1 messages
    createPlayerMenuIncHitMessage()
    createPlayerMenuDecHitMessage()

    //==SPACESHIP==>

    //create spaceship image
    createSpaceshipImage(spaceshipImage, spacePic,spaceshipWidth,spaceshipHeight,leftMainWidth/2,leftMainHeight-175, spaceAlt)
    
        //check value
        console.log("checkspaceshipImageCreateValues", "src", spaceshipImage.src, "img width",spaceshipImage.width, "img height", spaceshipImage.height, "img x", spaceshipImage.xcord, "img y", spaceshipImage.ycord)

    //loads spaceship image
    loadSpaceshipImage(spaceshipImage)

  
    //== FUEL AND ASTROIDS ==//

    // create fuel and astroid images
    createRandomImage(10,incHitItem, decHitItem)

    //populates the image locations so they know where display on screen
    populateImgLocationsArray()

    //set image location on the img array
    setImageLocations()

    // set image intervals on the image array
    setImageIntervals()

    //== SUPERNOVA ==//

    startEvent()
    
   event1.intervalId = setInterval(moveEvent, event1.intervalRate)
    


}

loadGame()

//==SPACESHIP==/

//keys to move the spaceship, clear image and redraw image when moved
//event listener for keys only work if the game status is set to in-play
function navigateSpaceship(e){
    
    if (e.key == 'a' && gameStatus == 1){
        ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
        spaceshipImage.xcord -= spaceshipLeftRightSpeed
            // check value
            // console.log('move ss left',"xcord",spaceshipImage.xcord, "ycord",spaceshipImage.ycord,"x", spaceshipImage.x, "y", spaceshipImage.y)
        drawImage(spaceshipImage)
        //ctx.drawImage(spaceshipImage,spaceshipImage.xcord,spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
    }   
    if (e.key == 's' && gameStatus == 1){
        ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
        spaceshipImage.xcord += spaceshipLeftRightSpeed
            //check value
            // console.log('move ss right',"xcord",spaceshipImage.xcord,"ycord", spaceshipImage.ycord)
        drawImage(spaceshipImage)
        // ctx.drawImage(spaceshipImage,spaceshipImage.xcord,spaceshipImage.ycord,spaceshipImage.width, spaceshipImage.height)
    }

    if (gameStatus == 0){
        //do nothing
    }

}

// event listener to control the spaceship 
document.addEventListener('keydown', navigateSpaceship,false)

// moves spaceship based on rules for fuel / astroid collision
function moveSpaceship(type){
    // adding event listener here to TEST location and effect, in this location you can't move the spaceship until it's hit by an astroid or fuel
    // document.addEventListener('keydown', navigateSpaceship,false)

    rememberSpaceShipLocX = spaceshipImage.xcord
    rememberSpaceShipLocY = spaceshipImage.ycord
    
    ctx.clearRect(rememberSpaceShipLocX, rememberSpaceShipLocY, spaceshipImage.width, spaceshipImage.height)
        //check value
        console.log('clear spaceship',"xcord",spaceshipImage.xcord, "remX", rememberSpaceShipLocX, "ycord", spaceshipImage.ycord, "remY", rememberSpaceShipLocY)    
    if(type == "fuel"){
        spaceshipImage.ycord -= spaceshipHitMoveUpNo
        ctx.drawImage(spaceshipImage,rememberSpaceShipLocX,rememberSpaceShipLocY-spaceshipHitMoveUpNo,spaceshipImage.width, spaceshipImage.height)
        incHitItem.counter += 1
        createPlayerMenuIncHitMessage()
            //check value  
            console.log("moveSpaceshipfuel","x", spaceshipImage.xcord,"y",spaceshipImage.ycord)
    }
    if (type == "astroid"){
        spaceshipImage.ycord += spaceshipHitMoveDownNo
        ctx.drawImage(spaceshipImage,rememberSpaceShipLocX,rememberSpaceShipLocY+spaceshipHitMoveDownNo,spaceshipImage.width, spaceshipImage.height)
        decHitItem.counter +=1
        createPlayerMenuDecHitMessage()
            //check value
            console.log("moveSpaceshipastroid","x", spaceshipImage.xcord,"y",spaceshipImage.ycord)
    }

}

//== COLLISIONS ==//

// collision between the spaceship and the fuel/astroid
function detectShipCollision(name,type){
    //y: test1: on the same plane so you just need to check one from fuel/astroid and space ship
    //x: test2: one corner from fuel/astroid should be between both corners from spaceship
    //x: test3: other corner from fuel/astroid shold be between both corners from spaceship
    //x: test4: outer corner of spaceship to inner corner of fuel/astroid (scenario where fuel/astroid is directly above spaceship)

    let test1 = (spaceshipImage.ycord <= name.ycord+imageWidth)
    let test2 = (spaceshipImage.xcord >=name.xcord &&spaceshipImage.xcord <= name.xcord+imageWidth)
    let test3 = (spaceshipImage.xcord+spaceshipWidth >=name.xcord &&spaceshipImage.xcord+spaceshipWidth <= name.xcord+imageWidth)
    let test4 = (spaceshipImage.xcord < name.xcord && spaceshipImage.xcord+spaceshipWidth > name.xcord+imageWidth)
    if ( (test1 && test2) || (test1 && test3) || (test1 && test4)){
            //check value
            // console.log(name,type,"hit spaceship")
        recycleRandomImage(name)
        moveSpaceship(type)
        
    }
}


//spaceship reaches top of screen
//win condition detected
function detectShipWinCollision(){
    let test1 = spaceshipImage.ycord
    if(test1 <= 0){
        //change user message to win
        userMessage.innerText = `You were able to escape! ${'\n'}Congratulations!`;
        //remove astroid/fuel images
        reset('winGame')
        
    }
        
}

//collision between the supernova and the fuel/astroid
//new fuel/astroid generated
function detectEventCollision(array){
    if(event1.ycord <= array.ycord+spaceshipHeight){
        recycleRandomImage(array)
    }

}


//moves astroid and fuel images and detects collisions with ship or supernova
//moves 5 spaces on an interval
//clears and redraws the image on an interval, interval is set on the individual image and stored in the image array
function moveImage(name, type){
    ctx.clearRect(name.xcord, name.ycord, name.width, name.height)
    name.ycord += 5
        //check value
        //console.log("moveImage", name,"xcord",name.xcord, "ycord",name.ycord,"x", name.x, "y", name.y)
    drawImage(name)
    // ctx.drawImage(name,name.xcord,name.ycord, name.width, name.height)
    detectShipCollision(name,type)
    detectEventCollision(name)
    detectShipWinCollision()

}



//== SUPERNOVA ==/

//initiates supernova creation
//detects lose condition, supernova hits spaceship
function moveEvent(){
    startEvent()
    if(spaceshipImage.ycord+spaceshipHeight >= event1.ycord){
        //check condition
        console.log("supernova hit spaceship")
        //cover the screen with the supernova, clear all other images
        userMessage.style.color = 'magenta'
        userMessage.innerText = `You were unable to escape the supernova ${'\n'} Game over`
        reset('supernovaEvent')
        //ctx.fillRect(event1.xcord,0,event1.width,event1.height); //ycord of 0 makes image go to top of screen
        //clearInterval(event1.interval)
                
    }
 

}

//==RESET BUTTON==//


resetButton.addEventListener("click", onResetClick)








