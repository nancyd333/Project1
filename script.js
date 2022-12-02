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
console.log(leftMainHeight)
console.log(leftMainWidth)
canvas.setAttribute('height',leftMainHeight)
canvas.setAttribute('width',leftMainWidth)

// console.log(ctx)
// console.log(leftMain.clientWidth)
// console.log(leftMain.clientHeight)


//create images
const fuelImage = new Image()
fuelImage.src = 'sun.jpeg'
fuelImage.alt = 'sun'
fuelImage.width= 35
fuelImage.height=35
console.log("checkfuelImage", fuelImage.src, fuelImage.width, fuelImage.height)

const astroid1Image = new Image()
astroid1Image.src = 'astroid1.jpg'
astroid1Image.alt = 'astroid'
astroid1Image.width = 35
astroid1Image.height = 35
console.log("checkastroid1Image", astroid1Image.src, astroid1Image.width, astroid1Image.height)

const spaceshipImage = new Image()
spaceshipImage.src = 'spaceship.png'
spaceshipImage.width = 60
spaceshipImage.height = 100
spaceshipImage.alt = 'spaceship'
console.log("checkspaceshipImage", spaceshipImage.src, spaceshipImage.width, spaceshipImage.height)

//this draws the spaceship in a static spot
spaceshipImage.onload = function(){
    ctx.drawImage(spaceshipImage, 0,100,spaceshipImage.width,spaceshipImage.height)
}

console.log(fuelImage.y, canvas.height)

fuelImage.onload = function(){
    let a = 0
    let b = 0
    if (fuelImage.y < canvas.height){   
            () => {
            b++
            console.log('hi')
            ctx.drawImage(fuelImage, a,b,fuelImage.width,fuelImage.height)
            }
        }
        

    
    }




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





