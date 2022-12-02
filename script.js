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
        console.log('move ss left',spaceshipImage.xcord, spaceshipImage.ycord)
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



//TODO make the gradient move across the screen back and forth
//changing the 50 value in the gradient will make the line appear to move ctx.createLinearGradient(0,50,150,0);
//this is the supernova
//TODO fiddle with the colors
let gradient = ctx.createLinearGradient(0,60,150,0);
gradient.addColorStop('0',"purple");
gradient.addColorStop('0.2',"orange");
gradient.addColorStop('0.5',"magenta");
gradient.addColorStop('0.7',"blue");
gradient.addColorStop('1.0',"green");
ctx.fillStyle = gradient;
//to move the supernova up the screen change the second value, when the second value is 0 it's the top of the screen
ctx.fillRect(0,leftMainHeight-20,leftMainWidth,leftMainHeight);
console.log(leftMainHeight-20,leftMainWidth,leftMainHeight);






// fuelImage.onload = function(){
//     let a = 0
//     let b = 0
//     if (fuelImage.y < canvas.height){   
//             () => {
//             b++
//             console.log('hi')
//             ctx.drawImage(fuelImage, a,b,fuelImage.width,fuelImage.height)
//             }
//         }
        

    
//     }





