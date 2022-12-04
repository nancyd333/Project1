//== GLOBAL VARIABLES ==/

const canvas = document.querySelector('canvas')
const body = document.querySelector('html')
const leftMain = document.getElementById('left-main')
const ctx = canvas.getContext('2d')
let leftMainHeight = leftMain.clientHeight//offsetHeight as opposed to clientHeight
let leftMainWidth = leftMain.clientWidth//offsetWidth as opposed to clientWidth
let bodyHeight = body.clientHeight
let bodyWidth = body.clientWidth
let spacePic = '24752-5-spaceship.png'
let spaceAlt = 'spaceship'
let astroidPic = 'astroid1.jpg'
let astroidAlt = 'astroid'
let fuelPic = 'sun.jpeg'
let fuelAlt = 'sun'
let imgArray = []
let imgLocations = []
let intervalList = []


//set canvas to the height / width of the div that contains it
//this sets it once and keeps it at that size
canvas.setAttribute('height',leftMainHeight)
canvas.setAttribute('width',leftMainWidth)
// html.setAttribute('height',leftMainHeight)
// html.setAttribute('width',leftMainWidth)



    //check value
    console.log("heightOfCanvas",leftMainHeight)
    console.log("widthOfCanvas", leftMainWidth)
    console.log("widthOfBody", bodyWidth)
    console.log("heightOfBody", bodyHeight)
    // console.log(ctx)
    // console.log(leftMain.clientWidth)
    // console.log(leftMain.clientHeight)

//== GENERIC FUNCTIONS ==//

  
//clear image

function clearImage(name){
    ctx.clearRect(name.xcord, name.ycord, name.width, name.height)

}

//==SPACESHIP==>

//only used for spaceship
function createNewImage(name, src,width,height,xcord,ycord,alt)  {
    name.src= src
    name.width = width
    name.height = height
    name.xcord = xcord
    name.ycord = ycord
    name.alt = alt
}

//create spaceship
const spaceshipImage = document.createElement('img')
createNewImage(spaceshipImage, spacePic,60,100,leftMainWidth/2,leftMainHeight-175, spaceAlt)
   
    //check value
    console.log("checkspaceshipImageCreateValues", "src", spaceshipImage.src, "img width",spaceshipImage.width, "img height", spaceshipImage.height, "img x", spaceshipImage.xcord, "img y", spaceshipImage.ycord)

//load spaceship
function loadImage(name){

    //generate image on page
    name.onload = function(){
        
        ctx.drawImage(name, name.xcord,name.ycord,name.width,name.height)
            //check value
            // console.log(name,"drawImgValues","x",name.xcord,"y",name.ycord,"width",name.width,"height",name.height)
        }
}
loadImage(spaceshipImage)

//keys to move the spaceship, clear image and redraw image when moved
function navigateSpaceship(e){
    
    if (e.key == 'a'){
        ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
        spaceshipImage.xcord -= 5
            // check value
            // console.log('move ss left',"xcord",spaceshipImage.xcord, "ycord",spaceshipImage.ycord,"x", spaceshipImage.x, "y", spaceshipImage.y)
        ctx.drawImage(spaceshipImage,spaceshipImage.xcord,spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
    }   
    if (e.key == 's'){
        ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
        spaceshipImage.xcord += 5
            //check value
            // console.log('move ss right',"xcord",spaceshipImage.xcord,"ycord", spaceshipImage.ycord)
        ctx.drawImage(spaceshipImage,spaceshipImage.xcord,spaceshipImage.ycord,spaceshipImage.width, spaceshipImage.height)
    }

}

// event listener to control the spaceship
document.addEventListener('keydown', navigateSpaceship)

// moves spaceship based on rules for fuel / astroid collision
function moveSpaceship(updown){
    
    rememberSpaceShipLocX = spaceshipImage.xcord
    rememberSpaceShipLocY = spaceshipImage.ycord
    
    ctx.clearRect(spaceshipImage.xcord, spaceshipImage.ycord, spaceshipImage.width, spaceshipImage.height)
        //check value
        // console.log('move ss right',"xcord",spaceshipImage.xcord,"ycord", spaceshipImage.ycord)
    
    if(updown = "fuel"){
        ctx.drawImage(spaceshipImage,rememberSpaceShipLocX,rememberSpaceShipLocY+10,spaceshipImage.width, spaceshipImage.height)
            //check value  
            // console.log("moveSpaceship","x", spaceshipImage.xcord,"y",spaceshipImage.ycord)
    }
    if (updown = "astroid"){
        ctx.drawImage(spaceshipImage,rememberSpaceShipLocX,rememberSpaceShipLocY-10,spaceshipImage.width, spaceshipImage.height)
            //check value
            // console.log("moveSpaceship","x", spaceshipImage.xcord,"y",spaceshipImage.ycord)
    }
}


function detectCollision(name,type){
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
        clearInterval(name + 'Interval')
        clearImage(name)
        moveSpaceship(type)
    }
}


//move images && detect collision with astroid or fuel
function moveImage(name, type){
    ctx.clearRect(name.xcord, name.ycord, name.width, name.height)
    name.ycord += 5
        //check value
        // console.log(name,'move',"xcord",name.xcord, "ycord",name.ycord,"x", name.x, "y", name.y)
    ctx.drawImage(name,name.xcord,name.ycord, name.width, name.height)

    detectCollision(name,type)

}

//== FUEL ==//

//image array to track images
//numstart allows for loading of fuel and then astroid
//num is the number of items you want to create in the array
function createImageArray(num, name, src, width, height, xcord, ycord,alt, type){
    let pixelCounter = 0
    let numstart = 0
    if(!imgArray.length){
        numstart = 0
    } else numstart=imgArray.length-1 

    for(let i=numstart; i<num; i++){
        imgArray.push(new Image())
        imgArray[i].name = name  + i
        imgArray[i].src = src
        imgArray[i].width = width
        imgArray[i].height = height
        imgArray[i].xcord = xcord
        imgArray[i].ycord = ycord
        imgArray[i].alt = alt
        imgArray[i].display = "none"
        imgArray[i].id = name + i
        imgArray[i].type = type

        //check value
        console.log("createImageArray", imgArray[i].name, imgArray[i].src, imgArray[i].width,imgArray[i].height,imgArray[i].xcord,imgArray[i].ycord,imgArray[i].alt,imgArray[i].display,imgArray[i].id )

    }


}

// create fuel images 
createImageArray(3,'fuelImage',fuelPic,30,30,0,0,fuelAlt,'fuel')
// create astroid images
createImageArray(6,'fuelImage',astroidPic,30,30,0,0,astroidAlt,'astroid')

//get the positions for the current screen and use to determine the location of the images
//need all images added to array before this can be calcualted
function populateImgLocationsArray(){
    let counter = 0
    imgLoc = Math.floor(leftMainWidth * .90 / imgArray.length)   
        //check value
        console.log("imgLoc",imgLoc)

    for(let i=0; i < imgArray.length; i++ ){
        counter += imgLoc
        imgLocations[i] = counter
            //check value
            console.log("setcoords",counter, imgLocations)
    }
    
}

populateImgLocationsArray()


function swapImageLocations(loc1, loc2){
    val1 = imgArray[loc1].xcord
    val2 = imgArray[loc2].xcord
    
    imgArray[loc1].xcord = val2
    imgArray[loc2].xcord = val1
    
}

// need to not have this go in order
function setImageLocations(){
   
   for(let i = 0; i < imgArray.length; i++){
        imgArray[i].xcord = imgLocations[i]
    }
        //check value
        // console.log('check xcord assignment')    

}

setImageLocations()

rand1 = Math.floor(Math.random() * imgLocations.length)
rand2 = Math.floor(Math.random() * imgLocations.length)
    //check value
    console.log("random values", rand1, rand2)
swapImageLocations(rand1,rand2)
swapImageLocations(rand1,rand2)

function setImageIntervals(){
    let interval = 500
    for(let i = 0; i < imgArray.length; i++){
        intervalList[i] = setInterval(()=>{moveImage(imgArray[i],imgArray[i].type)},interval)
        interval += 500
    }
}

setImageIntervals()

//== SUPERNOVA ==/

//TODO make the gradient move across the screen back and forth
//changing the 50 value in the gradient will make the line appear to move ctx.createLinearGradient(0,50,150,0);
//this is the supernova

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
        //check value
        // console.log("movesupernova: ","supernovaY",supernovaY,"spaceshipY",spaceshipImage.ycord, "supernovaX",supernovaX ,  "supernovaWidth",supernovaWidth,"supernovaHeight",supernovaHeight); 
    
    if(spaceshipImage.ycord+100 == supernovaY){
        //check condition
        console.log("supernova hit spaceship")
        
        //cover the screen with the supernova, clear all other images
        reset('supernovaEvent')
        ctx.fillRect(supernovaX,0,supernovaWidth,supernovaHeight);
        clearInterval(moveSuperNovaInterval)
         
    }

}

function reset(type){
    if(type=='supernovaEvent'){
        for(let i = 0; i < imgArray.length; i++){
            clearImage(imgArray[i])
            clearInterval(intervalList[i])
        }

    }
}


const moveSuperNovaInterval = setInterval(moveSuperNova, 800)






