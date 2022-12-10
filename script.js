//== GLOBAL VARIABLES ==/

const canvas = document.querySelector('canvas')
const body = document.querySelector('html')
const leftMain = document.getElementById('leftMain')
const resetButton = document.getElementById('resetButton')
const playerImgElement = document.createElement('img')
const userMessage = document.getElementById('userMessage')
const userMessage2 = document.getElementById('userMessage2')
const playerOneDiv = document.getElementById('playerOne')
const playerIncHitId = document.getElementById('playerIncHitId')
const playerDecHitId = document.getElementById('playerDecHitId')
const playerMenuIncHitImgElement = document.createElement('img')
const playerMenuIncHitSpanElement = document.createElement('span')
const playerMenuDecHitImgElement = document.createElement('img')
const playerMenuDecHitSpanElement = document.createElement('span')
const middleTopDiv = document.getElementById('middleTopDiv')
const ctx = canvas.getContext('2d')
let leftMainHeight = leftMain.clientHeight
let leftMainWidth = leftMain.clientWidth
let gameStatus = 0 // gameStatus 1 is in-play ; and 0 is not in-play
let imgArray = []
let imgLocations = []
let incDecHitImgWidth = 30; //game is set to work with set width
let incDecHitImgHeight = 30; //game is set to work with set height
let numImgsRatio = 3; // increasing this number creates more space between inc/decHit images on gameboard (and decreases the number of inc/decHit images). Use number between 1 (gameboard maximum crowding with images) and  5(min crowding). Do not set to 0.
let gameTheme = 1 //set the game theme
let sideImgWidth = 10 //default setting for the hit image on the left side menu
let sideImgHeight = 10 //default setting for the hit image on the left side menu

let minImgIntervalRate = 10 //min rate incHit/decHit image falls from the sky, min number for random setting
let maxImgIntervalRate = 150 //max rate incHit/decHit image falls from the sky, min number for random setting

//== MULTI-PURPOSE functions ==//
 
//use this to clear image 
function clearImage(name){
    ctx.clearRect(name.xcord, name.ycord, name.width, name.height)

}

// use this to draw image
function drawImage(name){
    ctx.drawImage(name,name.xcord, name.ycord, name.width, name.height)

}

// use this to draw a rectangle
function fillRect(name){
 ctx.fillRect(name.xcord,name.ycord,name.width,name.height);

}


//give two numbers and get a random integer between those two numbers (inclusive of the numbers given)
//min 0, max 10 will give random number between 0 and 10 (inclusive)
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


//==CREATE objects==//

// class to create the event that will cause the lose condition for the player
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

//create all the events per game theme
const eventTheme1 = new EventItem()

//set the event to the selected game theme
let event1 = ''//eventTheme1

// class to create objects that increment and decrement the player
class HitItem{
    constructor(name,src,width, height,type,sideImgWidth, sideImgHeight){
        this.name = name; // descriptive name for the incHit / decHit item, this will appear on screen
        this.src = src;
        this.width = width;
        this.height = height;
        this.xcord = 0;
        this.ycord = 0;
        this.type = type.toLowerCase(); // must be set to either 'inc' or 'dec' used in setImageIntervals and effects all other gameplay
        this.displayName = name.charAt(0).toUpperCase() + name.slice(1) ;
        this.alt = name.toLowerCase();
        this.intervalId = '';
        this.imgLocId = '';
        this.counter = 0;
        this.sidePlayerImgWidth = sideImgWidth;
        this.sidePlayerImgHeight = sideImgHeight;
    }

}

//create all the inc/decHitItems per game theme
const incHitItemTheme1 = new HitItem('fuel', './img/sun.jpeg', incDecHitImgWidth, incDecHitImgHeight, 'inc',sideImgWidth,sideImgHeight)
const decHitItemTheme1 = new HitItem('astroid', './img/astroid1.jpg', incDecHitImgWidth, incDecHitImgHeight, 'dec',sideImgWidth+5,sideImgHeight+5)

//set the inc/decHitItems to the selected game theme
let incHitItem = ''//incHitItemTheme1
let decHitItem = ''//decHitItemTheme1


// class to create player
class Player{
    constructor(name,description,src){
        this.name = name;
        this.description = description;
        this.src = src;
        this.width = 60;
        this.height = 100;
        this.xcord = leftMainWidth/2;
        this.ycord = leftMainHeight-175;
        this.alt = description.toLowerCase();
        this.displayName = name.charAt(0).toUpperCase() + name.slice(1);
        this.leftRightSpeed = 50;
        this.HitIncNo = 50;
        this.HitDecNo = 10;
    }

    resetEvent(){
        this.xcord = leftMainWidth/2;
        this.ycord = leftMainHeight-175;
    }
}

//create all the players per game theme
const playerTheme1 = new Player('spaceship', 'spaceship', './img/24752-5-spaceship.png')

//set the player to the selected game theme
let player1 = ''//playerTheme1


// sets the IMG values for gameplay
// name is the global IMG variable name
// objectname is the name of the object that has the values set, for example: player1
function setImageValuesFromObjects(name, objectname)  {
    name.src= objectname.src
    name.width = objectname.width
    name.height = objectname.height
    name.xcord = objectname.xcord
    name.ycord = objectname.ycord
    name.alt = objectname.alt
}

// sets the IMG values for gameplay
// use when you need to assign values individually
function setImageValues(name, src, width, height, xcord, ycord, alt)  {
    name.src= src
    name.width = width
    name.height = height
    name.xcord = xcord
    name.ycord = ycord
    name.alt = alt
}

//load player image for gameplay, gets value from player set for the game
function loadPlayerImage(name){
    //generate image on page
    name.onload = function(){
        drawImage(name) 
        //check value
        // console.log(name,"drawImgValues","x",name.xcord,"y",name.ycord,"width",name.width,"height",name.height)
    }
}


function setGameboardSize(){
leftMainHeight = leftMain.clientHeight
leftMainWidth = leftMain.clientWidth
//set canvas to the height / width of the div that contains it
//canvas size is set once and keeps it at that size
canvas.setAttribute('height',leftMainHeight)
canvas.setAttribute('width',leftMainWidth)
}


function setUserMessage(type = 'other'){
    if(type == 'other'){
        userMessage.innerText = `Escape the supernova`
        userMessage.style.color = 'red'
        userMessage2.style.fontSize = 'small'
        userMessage2.innerText = `Your spaceship is caught near a supernova and is running out of fuel.${'\n'}Collect fuel to move forward and escape before the supernova expands and consumes you.${'\n'}Watch out, the astroids knock you backwards!${'\n'}Press 'a' to move left and 's' to move right.`
    } else if (type == 'playerWin'){
        userMessage.innerText = `You were able to escape! ${'\n'}Congratulations!`;
        userMessage2.innerText = ''
    } else if (type == 'eventWin'){
        userMessage.style.color = 'magenta'
        userMessage.innerText = `You were unable to escape. ${'\n'} Game over`
        userMessage2.innerHTML = ''
    } else if (type == 'resetGame'){
        userMessage.innerHTML = ''
        userMessage2.innerHTML = ''
    }

}

function setGameTheme(){
    if(gameTheme == 1){
        player1 = playerTheme1
        incHitItem = incHitItemTheme1
        decHitItem = decHitItemTheme1
        event1 = eventTheme1
    } else if(gameTheme == 2){
        //add code here
    } else if(gameTheme == 3){
        //add code here
    } else if(gameTheme == 4){
        //add code here
    } else {
        console.log('Need to set game theme')
    }

}



//--event--//

//creates the event rectangle drawing
function startEvent(name){
    name.ycord = name.ycord - 1;
    // console.log("start event", "event", name, "ycord",name.ycord)
    fillRect(name)
    gradientEventIncrement(name)
}

//set gradient for event
function gradientEvent(name){
    let gradient = ctx.createLinearGradient(0,name.gradientChangeValue,400,0);
    // console.log("gradient change value", name.gradientChangeValue)
    gradient.addColorStop('0', '#fee440');
    gradient.addColorStop('0.2','orange');
    gradient.addColorStop('0.5','red');
    gradient.addColorStop('0.7','magenta'); 
    gradient.addColorStop('1.0','#390099'); 
    ctx.fillStyle = gradient;
}

//set gradient movement in the event
function gradientEventIncrement(name){
      
    //-- this code moves the gradient back and forth across the screen
    let inc = name.gradientIncNo //amount to increment/decrement by
    let max = name.gradientEndNo 
    if (name.gradientChangeValue >= max){
        name.gradientTrackNum = max
    }
    if (name.gradientChangeValue <= 0){
        name.gradientTrackNum = 0
    }
    if(name.gradientTrackNum == max){
        name.gradientChangeValue -= inc
    }
    if(name.gradientTrackNum == 0){
        name.gradientChangeValue += inc
    }
    // check value
    // console.log("gradientchangevalue", name.gradientChangeValue,"track no", name.gradientTrackNum,"gradientIncrease", inc, "gradient max", name.gradientEndNo )
    gradientEvent(name)
}

//--incHit and decHit--//

//determine the number of inc/decHit images for the gameboard, based on screen width and width of inc/decHit img
function getNumberOfHitImgLocs(){
    let num = Math.ceil(leftMainWidth/ (incDecHitImgWidth/numImgsRatio));
    return num;
     
}

//determine the x coord location of the incHit / decHit images and save to locations array
function populateImgLocationsArray(){
    let counter = 30 // creates spacing on gameboard for the first image, 30 seems to be a good distance. If set to 0, the first image will be flush with left side of gameboard and looks crowded.
    for(let i=0; i < getNumberOfHitImgLocs(); i++ ){
        imgLocations[i] = counter
        counter += getNumberOfHitImgLocs()
            //check value
            // console.log("populateImgLocationsArray","counter",counter,"imgLocations", imgLocations,"getNumberOfHitImgLocs", getNumberOfHitImgLocs())
    }
    
}

//array created to track incHit and decHit images
function createImageArray(name, src, width, height, xcord, ycord,alt, type){
    let numstart = 0
    // if the array has been created then numstart is the length of the array, otherwise it's set to 0
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
        imgArray[i].imgLocId = '' //this is the screen x coordinate, which essentially sets the column the image will fall dowm from on, the screen for that game 
        imgArray[i].num = i

        //check value
        //console.log("createImageArray", imgArray[i].name, imgArray[i].src, imgArray[i].width,imgArray[i].height,imgArray[i].xcord,imgArray[i].ycord,imgArray[i].alt,imgArray[i].display,imgArray[i].id ,imgArray[i].intervalId,"numstart",numstart,"locId",imgArray[i].imgLocId, 'i', i)

    }

}

//set image location in incHit/decHit array
function setImageLocations(){
    for(let i = 0; i < getNumberOfHitImgLocs(); i++){
        imgArray[i].xcord = imgLocations[i]
        imgArray[i].imgLocId = imgLocations[i]
        //check value
        // console.log("setImageLocations", "Imgxcord",imgArray[i].xcord,"ImglocId",imgArray[i].imgLocId ,"imgLoc",imgLocations[i])
    }

}

//creates the intervals for each decHit/incHit, the interval is set randomly for each item in the array, the interval id is saved for later use
function setImageIntervals(){
    let interval = 0
    for(let i = 0; i < imgArray.length; i++){
        interval = getRandomInteger(minImgIntervalRate,maxImgIntervalRate)
        imgArray[i].intervalId = setInterval(()=>{moveImage(imgArray[i],imgArray[i].type)},interval)
            //check value
            //console.log("setImageInterval",imgArray[i])
        
    }
}

//create the incHit image, name, counter where Player 1 section is located
function createPlayerMenuIncHitMessage(){
    setImageValues(playerMenuIncHitImgElement, incHitItem.src,incHitItem.sidePlayerImgWidth,incHitItem.sidePlayerImgHeight,'','',incHitItem.alt)  //image variable name, src, width, height, xcord, ycord, alt
    playerIncHitId.append(playerMenuIncHitImgElement)
    playerMenuIncHitSpanElement.id = incHitItem.type + 'Span'
    playerIncHitId.append(playerMenuIncHitSpanElement)
    playerMenuIncHitSpanElement.innerText = `${incHitItem.displayName}: ${incHitItem.counter}`
}

//create the decHit image, name, counter where Player 1 section is located
function createPlayerMenuDecHitMessage(){
    setImageValues(playerMenuDecHitImgElement, decHitItem.src,decHitItem.sidePlayerImgWidth,decHitItem.sidePlayerImgHeight,'','',decHitItem.alt)  //img variable name, src, width, height, xcord, ycord, alt
    playerDecHitId.append(playerMenuDecHitImgElement)
    playerMenuDecHitSpanElement.id = decHitItem.type + 'Span'
    playerDecHitId.append(playerMenuDecHitSpanElement)
    playerMenuDecHitSpanElement.innerText = `${decHitItem.displayName}: ${decHitItem.counter}`
}

//creates a incHit or decHit image, chosen at random
//assumes load game function has run and the locations have been set on the incHit/decHit array, this function will swap out the images randomly in the array which causes an image to appear in the set location at random
function createRandomHitImage(hitItem1, hitItem2){
    for(let i=0; i < getNumberOfHitImgLocs(); i++){
        if(getRandomInteger(0,1)==1){
            createImageArray(hitItem1.name,hitItem1.src,hitItem1.width,hitItem1.height,hitItem1.xcord,hitItem1.ycord,hitItem1.alt,hitItem1.type)
        } else {
            createImageArray(hitItem2.name,hitItem2.src,hitItem2.width,hitItem2.height,hitItem2.width,hitItem2.height,hitItem2.alt,hitItem2.type)
        }
    }
}

//==RESET parts of screen based on the type of event==//

function reset(type){
    gameStatus = 0 // changes the game status to be NOT in-play
    clearImage(playerImgElement)

    if(type=='eventWin'){ // the event will cover the screen and all other images will be removed
        for(let i = 0; i < imgArray.length; i++){
            clearImage(imgArray[i])
            clearInterval(imgArray[i].intervalId)
        }
        clearImage(playerImgElement)
        ctx.fillRect(event1.xcord,0,event1.width,event1.height) //this makes the event cover the screen
    } else if (type=='resetGame'){ // screen will return to start stettings
        for(let i = 0; i < imgArray.length; i++){
            clearImage(imgArray[i])
            clearInterval(imgArray[i].intervalId)
            //checkvalue
            //console.log('resetGame',imgArray)
        }
        ctx.clearRect(0,0, event1.width, event1.height)
        clearInterval(event1.intervalId)
        setGameboardSize()
        event1.resetEvent()
        imgArray = []
        imgLocations =[]
        incHitItem.counter = 0
        decHitItem.counter = 0  
        player1.resetEvent()    
        loadGame()
    } else if (type =='playerWin'){ // the player, event, and hitInc and hitDec are removed from the screen
        for(let i = 0; i < imgArray.length; i++){
            clearImage(imgArray[i])
            clearInterval(imgArray[i].intervalId)
        }   
        ctx.clearRect(0, 0, event1.width, event1.height)
        clearInterval(event1.intervalId)
        event1.resetEvent()
        clearImage(playerImgElement)
    }
}

//used by button to reset game
function onResetClick(){
    setUserMessage('resetGame')
    reset('resetGame') 
    //check value
    //console.log('reset clicked')

}

//== Game Play Functions ==//

//once incHit/decHit hits event a random incHit/decHit is added to that array location 
function recycleRandomHitImage(array){
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
            //check value
            // console.log("recycleImage after",array)
        }
    }

}


//--player--/

//keys to move the player image, clear image and redraw image when moved
//event listener for keyboard keys only work if the game status is set to in-play (value 1)
function navigatePlayer(e){
    
    if (e.key == 'a' && gameStatus == 1){
        ctx.clearRect(playerImgElement.xcord, playerImgElement.ycord, playerImgElement.width, playerImgElement.height)
        playerImgElement.xcord -= player1.leftRightSpeed
            // check value
            // console.log('move player image left',"xcord",playerImgElement.xcord, "ycord",playerImgElement.ycord,"x", playerImgElement.x, "y", playerImgElement.y)
        drawImage(playerImgElement)
    }   
    if (e.key == 's' && gameStatus == 1){
        ctx.clearRect(playerImgElement.xcord, playerImgElement.ycord, playerImgElement.width, playerImgElement.height)
        playerImgElement.xcord += player1.leftRightSpeed
            //check value
            // console.log('move player image right',"xcord",playerImgElement.xcord,"ycord", playerImgElement.ycord)
        drawImage(playerImgElement)
    }

}

// event listener to control the player image
document.addEventListener('keydown', navigatePlayer,false)

// moves player image based on rules for incHit/decHit collision
// need to remove the image from it's current location location and redraw the image in the new location
function movePlayer(type){

    rememberPlayerLocX = playerImgElement.xcord
    rememberPlayerLocY = playerImgElement.ycord
    
    ctx.clearRect(rememberPlayerLocX, rememberPlayerLocY, playerImgElement.width, playerImgElement.height)
        //check value
        //console.log('clear player image',"xcord",playerImgElement.xcord, "remX", rememberPlayerLocX, "ycord", playerImgElement.ycord, "remY", rememberPlayerLocY)    
    if(type == 'inc'){
        playerImgElement.ycord -= player1.HitIncNo
        ctx.drawImage(playerImgElement,rememberPlayerLocX,rememberPlayerLocY-player1.HitIncNo,playerImgElement.width, playerImgElement.height)
        incHitItem.counter += 1
        createPlayerMenuIncHitMessage()
            //check value  
            //console.log("move player due to inc hit","x", playerImgElement.xcord,"y",playerImgElement.ycord,"incHitno", player1.HitIncNo)
    }
    if (type == 'dec'){
        playerImgElement.ycord += player1.HitDecNo
        ctx.drawImage(playerImgElement,rememberPlayerLocX,rememberPlayerLocY+player1.HitDecNo,playerImgElement.width, playerImgElement.height)
        decHitItem.counter +=1
        createPlayerMenuDecHitMessage()
            //check value
            //console.log("move player due to dec hit","x", playerImgElement.xcord,"y",playerImgElement.ycord)
    }

}


//== COLLISION detection ==//

// detects collision between the event and the incHit and decHit items
function detectPlayerCollision(name,type){
    //y: test1: items are on the same plane so you just need to check one from incHit/decHit and player image
    //x: test2: one corner from incHit/decHit should be between both corners from player image
    //x: test3: other corner from incHit/decHit should be between both corners from player image
    //x: test4: outer corner of player image to inner corner of incHit/decHit (scenario where incHit/decHit image is directly above player image)

    let test1 = (playerImgElement.ycord <= name.ycord+name.width)
    let test2 = (playerImgElement.xcord >=name.xcord &&playerImgElement.xcord <= name.xcord+name.width)
    let test3 = (playerImgElement.xcord+playerImgElement.width >=name.xcord &&playerImgElement.xcord+playerImgElement.width <= name.xcord+name.width)
    let test4 = (playerImgElement.xcord < name.xcord && playerImgElement.xcord+playerImgElement.width > name.xcord+name.width)
    if ( (test1 && test2) || (test1 && test3) || (test1 && test4)){
            //check value
            // console.log(name,type,"hit spaceship")
        recycleRandomHitImage(name)
        movePlayer(type)
        
    }
}


//collision between the player and the incHit/decHit items
function detectEventCollision(array){
    if(event1.ycord <= array.ycord+playerImgElement.height){
        recycleRandomHitImage(array)
    }

}

//moves incHit/decHit image & detects collisions with either player or event
//clears and redraws the incHit/decHit image on an interval, interval is set on the individual image and stored in the image array
function moveImage(name, type){
    ctx.clearRect(name.xcord, name.ycord, name.width, name.height)
    name.ycord += 5 // number of spaces down incHit/decHit image is moved per interval
        //check value
        //console.log("move incHit/decHit image", name,"xcord",name.xcord, "ycord",name.ycord,"x", name.x, "y", name.y)
    drawImage(name)
    detectPlayerCollision(name,type)
    detectEventCollision(name)
    detectWinCollision()

}


//win condition detection
//player 1 image reaches top of screen
function detectWinCollision(){
    let test1 = playerImgElement.ycord
    if(test1 <= 0){
        //change user message to win
        setUserMessage('playerWin')
        //remove incHit/decHit images, player image, and event from gameboard
        reset('playerWin')
        
    }
        
}


//lose condition detection, event hits player
//cover the screen with the supernova, clear all other images
//initiates event creation
function moveEvent(name){
    startEvent(name)
    if(playerImgElement.ycord+playerImgElement.height >= event1.ycord){
        //check condition
        //console.log("event hit player")       
        setUserMessage('eventWin')
        reset('eventWin')
    }
}


//== LOAD GAME ==//

// loads the game
function loadGame(){
    gameStatus = 1 //sets game status to 'in-play' 
    setGameboardSize()
    setGameTheme() //set the game theme to player,event,inc/decHitItems
    //load user message
    setUserMessage()

    //populate Player 1 messages on side menu
    createPlayerMenuIncHitMessage()
    createPlayerMenuDecHitMessage()

    //==PLAYER==>

    //create and load player image
    //playerImgElement is set globally and passed here to set the player IMG values for the selected theme
    setImageValuesFromObjects(playerImgElement,player1) 
    loadPlayerImage(playerImgElement) 
  
    //== incHIT / decHIT ==//

    // create 'incHit/decHit array'
    createRandomHitImage(incHitItem, decHitItem)

    //create an 'array of set locations' for the incHit/decHit images to travel along, this is the x coord on the screen based on the screen width
    populateImgLocationsArray()

    //set the incHit/decHit locations in the 'incHit/decHit array' based on the 'array of set locations'
    setImageLocations()

    // set intervals for each incHit/decHit location and store in 'incHit/decHit array'
    setImageIntervals()

    //== EVENT ==//

    startEvent(event1)
    event1.intervalId = setInterval(()=>{moveEvent(event1)}, event1.intervalRate)
    // console.log("event interval","event", event1, "event interval id", event1.intervalId, "event interval rate", event1.intervalRate)
    
}

loadGame()


//==RESET BUTTON==//

resetButton.addEventListener('click', onResetClick)








