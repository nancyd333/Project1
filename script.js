//== GLOBAL VARIABLES ==/

const canvas = document.querySelector('canvas')
const body = document.querySelector('html')
const leftMain = document.getElementById('left-main')
const resetButton = document.getElementById('resetButton')
const spaceshipImage = document.createElement('img')
const userMessage = document.getElementById('user-message')
const userMessage2 = document.getElementById('user-message2')
const playerOneDiv = document.getElementById('player-one')
const fuelMessage = document.getElementById('fuel')
const astroidMessage = document.getElementById('astroid')
const playerFuelImg = document.createElement('img')
const playerFuelSpan = document.createElement('span')
const playerAstroidImg = document.createElement('img')
const playerAstroidSpan = document.createElement('span')
const ctx = canvas.getContext('2d')
let gradientTrackNum = 0
let gradientChangeValue = 0
let imageHeight = 30
let imageWidth = 30
let astroidTracker = 0
let fuelTracker = 0
let leftMainHeight = leftMain.clientHeight//offsetHeight as opposed to clientHeight
let leftMainWidth = leftMain.clientWidth//offsetWidth as opposed to clientWidth
// let bodyHeight = body.clientHeight
// let bodyWidth = body.clientWidth
let spacePic = '24752-5-spaceship.png'
let spaceAlt = 'spaceship'
let astroidPic = 'astroid1.jpg'
let astroidAlt = 'astroid'
let fuelPic = 'sun.jpeg'
let fuelAlt = 'sun'
let imgArray = []
let imgLocations = []
let intervalList = []


//note: supernovaInterval of 0 is the top of the screen
let supernovaY = leftMainHeight;
let supernovaX = 0;
let supernovaWidth = leftMainWidth;
let supernovaHeight = leftMainHeight;
let moveSuperNovaInterval = ''


//set canvas to the height / width of the div that contains it
//this sets it once and keeps it at that size
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

//use this to clear image before redrawing, or just to remove it altogether
function clearImage(name){
    ctx.clearRect(name.xcord, name.ycord, name.width, name.height)

}
//give two numbers and get random integer between those two numbers (inclusive of the numbers given)
//min 0, max 10 will give random number between 0 and 10
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

//==RESET PARTS OF SCREEN based on the type of event==//

function reset(type){
    removeEventListener('keypress',navigateSpaceship,false)
    ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
    if(type=='supernovaEvent'){
        for(let i = 0; i < imgArray.length; i++){
            clearImage(imgArray[i])
            clearInterval(imgArray[i].intervalId)
            clearImage(spaceshipImage)
            userMessage2.innerText = ''
        }

    } else if (type=='resetGame'){
        for(let i = 0; i < imgArray.length; i++){
            clearImage(imgArray[i])
            clearInterval(imgArray[i].intervalId)
            //checkvalue
            console.log('resetGame',imgArray)
        }
        imgArray = []
        imgLocations =[]
        intervalList=[]
        supernovaY = leftMainHeight;
        supernovaX = 0;
        supernovaWidth = leftMainWidth;
        supernovaHeight = leftMainHeight;
        leftMainHeight = leftMain.clientHeight
        leftMainWidth = leftMain.clientWidth
        bodyHeight = body.clientHeight
        bodyWidth = body.clientWidth
        astroidTracker = 0
        fuelTracker = 0
        clearInterval(moveSuperNovaInterval)
        ctx.clearRect(supernovaX,0,supernovaWidth,supernovaHeight);
        userMessage.innerText = ''
        userMessage2.innerText = ''
        loadGame()
    } else if (type =='winGame'){
        for(let i = 0; i < imgArray.length; i++){
            for(let i = 0; i < imgArray.length; i++){
                clearImage(imgArray[i])
                clearInterval(imgArray[i].intervalId)
                clearInterval(moveSuperNovaInterval)
                ctx.clearRect(supernovaX,0,supernovaWidth,supernovaHeight);
                clearImage(spaceshipImage)
                userMessage2.innerText = ''
            }
            
         }
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
            
        ctx.drawImage(name, name.xcord,name.ycord,name.width,name.height)
        //check value
        // console.log(name,"drawImgValues","x",name.xcord,"y",name.ycord,"width",name.width,"height",name.height)
    }
}


//==SUPERNOVA==//

//creates the supernova drawing
function createSuperNova(){
    supernovaY -= 1;
    ctx.fillRect(supernovaX,supernovaY,supernovaWidth,supernovaHeight);
    gradientSuperNovaIncrement()
        //check value
        // console.log("movesupernova: ","supernovaY",supernovaY,"spaceshipY",spaceshipImage.ycord, "supernovaX",supernovaX ,  "supernovaWidth",supernovaWidth,"supernovaHeight",supernovaHeight);
}

//set gradient for supernova
function gradientSuperNova(num){
    gradientChangeValue = num
    let gradient = ctx.createLinearGradient(0,gradientChangeValue,400,0); //150,0
    gradient.addColorStop('0', '#fee440');
    gradient.addColorStop('0.2',"orange");
    gradient.addColorStop('0.5',"red");
    gradient.addColorStop('0.7',"magenta"); 
    gradient.addColorStop('1.0',"#390099"); 
    ctx.fillStyle = gradient;
}

//set gradient movement in the supernova
function gradientSuperNovaIncrement(){
    
    //-- this code will continue to move the gradient in one direction
    // let inc = 10
    // gradientChangeValue += inc
    // gradientSuperNova(gradientChangeValue)
    
    //-- this code moves the gradient back and forth across the screen
    let inc = 20
    let max = 400
    if (gradientChangeValue == max){
        gradientTrackNum = max
    }
    if (gradientChangeValue == 0){
        gradientTrackNum = 0
    }
    if(gradientTrackNum == max){
        gradientChangeValue -= inc
    }
    if(gradientTrackNum == 0){
        gradientChangeValue += inc
    }
    
    console.log("changevalue", gradientChangeValue,"num", gradientTrackNum, )
    gradientSuperNova(gradientChangeValue)
}

//==ASTROIDS AND FUEL==//

// base object used to create astroid and fuel objects
const baseImageArray= {
    name: '',
    src: '',
    width: '',
    height: '',
    xcord: '',
    ycord: '',
    alt: '',
    type: '',
    intervalId: '',
    imgLocId: ''
}

// stores information about fuel
    const fuelImg = Object.create(baseImageArray);
    fuelImg.name = 'fuelImage' 
    fuelImg.src = fuelPic
    fuelImg.width = imageWidth
    fuelImg.height = imageHeight
    fuelImg.xcord = 0
    fuelImg.ycord = 0
    fuelImg.alt = fuelAlt
    fuelImg.type = 'fuel'
    fuelImg.intervalId = ''
    fuelImg.imgLocId = ''

// stores information about astroid
    const astroidImg = Object.create(baseImageArray);
    astroidImg.name = 'astroidImage' 
    astroidImg.src = astroidPic
    astroidImg.width = imageWidth
    astroidImg.height = imageHeight
    astroidImg.xcord = 0
    astroidImg.ycord = 0
    astroidImg.alt = astroidAlt
    astroidImg.type = 'astroid'
    astroidImg.intervalId = ''
    astroidImg.imgLocId = ''



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
        imgArray[i].display = "none"
        imgArray[i].type = type
        imgArray[i].intervalId = ''
        imgArray[i].imgLocId = ''
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
        interval = getRandomInteger(200,1000)
        imgArray[i].intervalId = setInterval(()=>{moveImage(imgArray[i],imgArray[i].type)},interval)
            //check value
            //console.log("setImageInterval",imgArray[i])
        
    }
}

//create the Player 1 section for Fuel with image
function createPlayerFuelMessage(){
    playerFuelImg.src = fuelPic
    playerFuelImg.alt = fuelAlt
    playerFuelImg.width = 10
    playerFuelImg.height = 10
    fuelMessage.append(playerFuelImg)
    playerFuelSpan.id = 'fuelSpan'
    fuelMessage.append(playerFuelSpan)
    playerFuelSpan.innerText = `Fuel: ${fuelTracker}`
}

//create the Player 1 section for Astroid with image
function createPlayerAstroidMessage(){
    playerAstroidImg.src = astroidPic
    playerAstroidImg.alt = astroidAlt
    playerAstroidImg.width = 15
    playerAstroidImg.height = 15
    astroidMessage.append(playerAstroidImg)
    playerAstroidSpan.id = 'astroidSpan'
    astroidMessage.append(playerAstroidSpan)
    playerAstroidSpan.innerText = `Astroid: ${astroidTracker}`
}

//creates a astroid or fuel image, chosen at random
//num is the number of total images you want to create
//assumes screen position will be assigned at this step, such as on game load
function createRandomImage(num){
    for(let i=0; i < num; i++){
        if(getRandomInteger(0,1)==1){
            createImageArray(fuelImg.name,fuelImg.src,fuelImg.width,fuelImg.height,fuelImg.xcord,fuelImg.ycord,fuelImg.alt,fuelImg.type)
        } else {
            createImageArray(astroidImg.name,astroidImg.src,astroidImg.width,astroidImg.height,astroidImg.width,astroidImg.height,astroidImg.alt,astroidImg.type)
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
            array.name = astroidImg.name + array.num
            array.src = astroidImg.src
            array.width = astroidImg.width
            array.height = astroidImg.height
            array.ycord = 0
            array.alt = astroidImg.alt
            array.type = astroidImg.type
            clearInterval(array.intervalId)
            interval = getRandomInteger(200,1000)
            array.intervalId = setInterval(()=>{moveImage(array,array.type)},interval)
            ctx.drawImage(array,array.xcord,array.ycord, array.width, array.height)
            //check value
            // console.log("recycleImage after",array)
        } else {
            array.name = fuelImg.name + array.num
            array.src = fuelImg.src
            array.width = fuelImg.width
            array.height = fuelImg.height
            array.ycord = 0
            array.alt = fuelImg.alt
            array.type = fuelImg.type
            clearInterval(array.intervalId)
            interval = getRandomInteger(200,1000)
            array.intervalId = setInterval(()=>{moveImage(array,array.type)},interval)
            ctx.drawImage(array,array.xcord,array.ycord, array.width, array.height)
            //check value
            // console.log("recycleImage after",array)
        }
    }

}


//== LOAD GAME ==//

// loads the game
function loadGame(){
    //create objects for fuel and astroid
    // createBaseFuelObject()
    // createBaseAstroidObject()
    userMessage.style.fontSize = 'medium'
    userMessage.innerText = `Escape the supernova`
    userMessage2.style.fontSize = 'small'
    userMessage2.innerText = `Your spaceship is caught near a supernova is running out of fuel.${'\n'} Collect fuel to reach the screen top and escape, before the supernova expands and consumes you.${'\n'} Watch out, the astroids knock you back.${'\n'} Pressing 'a' to move left and 's' to move right.`

    //populate Player 1 messages
    createPlayerFuelMessage()
    createPlayerAstroidMessage()

    //==SPACESHIP==>

    //create spaceship image
    createSpaceshipImage(spaceshipImage, spacePic,60,100,leftMainWidth/2,leftMainHeight-175, spaceAlt)
    
        //check value
        console.log("checkspaceshipImageCreateValues", "src", spaceshipImage.src, "img width",spaceshipImage.width, "img height", spaceshipImage.height, "img x", spaceshipImage.xcord, "img y", spaceshipImage.ycord)

    //loads spaceship image
    loadSpaceshipImage(spaceshipImage)

  
    //== FUEL AND ASTROIDS ==//

    // create fuel and astroid images
    createRandomImage(10)

    //populates the image locations so they know where display on screen
    populateImgLocationsArray()

    //set image location on the img array
    setImageLocations()

    // set image intervals on the image array
    setImageIntervals()

    //== SUPERNOVA ==//

    createSuperNova()
    moveSuperNovaInterval = setInterval(moveSuperNova, 1000)
    


}

loadGame()

//==SPACESHIP==/

//keys to move the spaceship, clear image and redraw image when moved
function navigateSpaceship(e){
    
    if (e.key == 'a'){
        ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
        spaceshipImage.xcord -= 20
            // check value
            // console.log('move ss left',"xcord",spaceshipImage.xcord, "ycord",spaceshipImage.ycord,"x", spaceshipImage.x, "y", spaceshipImage.y)
        ctx.drawImage(spaceshipImage,spaceshipImage.xcord,spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
    }   
    if (e.key == 's'){
        ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
        spaceshipImage.xcord += 20
            //check value
            // console.log('move ss right',"xcord",spaceshipImage.xcord,"ycord", spaceshipImage.ycord)
        ctx.drawImage(spaceshipImage,spaceshipImage.xcord,spaceshipImage.ycord,spaceshipImage.width, spaceshipImage.height)
    }

}

// event listener to control the spaceship
document.addEventListener('keydown', navigateSpaceship,false)

// moves spaceship based on rules for fuel / astroid collision
function moveSpaceship(updown){
    
    rememberSpaceShipLocX = spaceshipImage.xcord
    rememberSpaceShipLocY = spaceshipImage.ycord
    
    ctx.clearRect(rememberSpaceShipLocX, rememberSpaceShipLocY, spaceshipImage.width, spaceshipImage.height)
        //check value
        console.log('clear spaceship',"xcord",spaceshipImage.xcord, "rem", rememberSpaceShipLocX, "ycord", spaceshipImage.ycord, "rem", rememberSpaceShipLocY)    
    if(updown == "fuel"){
        ctx.drawImage(spaceshipImage,rememberSpaceShipLocX,rememberSpaceShipLocY-50,spaceshipImage.width, spaceshipImage.height)
        spaceshipImage.ycord -= 50
        fuelTracker+=1
        createPlayerFuelMessage()
            //check value  
            console.log("moveSpaceshipfuel","x", spaceshipImage.xcord,"y",spaceshipImage.ycord)
    }
    if (updown == "astroid"){
        ctx.drawImage(spaceshipImage,rememberSpaceShipLocX,rememberSpaceShipLocY+10,spaceshipImage.width, spaceshipImage.height)
        spaceshipImage.ycord +=10
        astroidTracker+=1
        createPlayerAstroidMessage()
            //check value
            console.log("moveSpaceshipastroid","x", spaceshipImage.xcord,"y",spaceshipImage.ycord)
    }
}

//== COLLISIONS ==//

// collision between the spaceship and the fuel/astroid
function detectShipCollision(name,type){
    //y: on the same plane so you just need to check one from fuel/astroid and space ship
    //x: one corner from fuel/astroid should be between both corners from spaceship
    //x: other corner from fuel/astroid shold be between both corners from spaceship

    let test1 = (spaceshipImage.ycord <= name.ycord+30)
    let test2 = (spaceshipImage.xcord >=name.xcord &&spaceshipImage.xcord <= name.xcord+30)
    let test3 = (spaceshipImage.xcord+60 >=name.xcord &&spaceshipImage.xcord+60 <= name.xcord+30)
    let test4 = (spaceshipImage.xcord < name.xcord && spaceshipImage.xcord+60 > name.xcord+30)
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
        userMessage.innerText = `You were able to escape! ${'\n'}Congratulations!`
        //remove astroid/fuel images
        clearInterval(moveSuperNovaInterval)
        clearInterval(moveSpaceship)
        reset('winGame')

        //change gameboard color to blue
        // ctx.fillStyle = "blue";
        
    }
        
}

//collision between the supernova and the fuel/astroid
//new fuel/astroid generated
function detectSuperNovaCollision(array){
    if(supernovaY <= array.ycord+60){
        recycleRandomImage(array)
    }

}


//moves astroid and fuel images and detects collisions with ship or supernova
function moveImage(name, type){
    ctx.clearRect(name.xcord, name.ycord, name.width, name.height)
    name.ycord += 5
        //check value
        //console.log("moveImage", name,"xcord",name.xcord, "ycord",name.ycord,"x", name.x, "y", name.y)
    ctx.drawImage(name,name.xcord,name.ycord, name.width, name.height)
    detectShipCollision(name,type)
    detectSuperNovaCollision(name)
    detectShipWinCollision()

}



//== SUPERNOVA ==/

//initiates supernova creation
//detects lose condition, supernova hits spaceship
function moveSuperNova(){
    createSuperNova()
    if(spaceshipImage.ycord+100 >= supernovaY){
        //check condition
        console.log("supernova hit spaceship")
        
        //cover the screen with the supernova, clear all other images
        userMessage.innerText = `You were unable to escape the supernova ${'\n'} Game over`
        reset('supernovaEvent')
        ctx.fillRect(supernovaX,0,supernovaWidth,supernovaHeight);
        clearInterval(moveSuperNovaInterval)
                
    }
 

}

//==RESET BUTTON==//


resetButton.addEventListener("click", onResetClick)








