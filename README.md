# Escape the Supernova

You are in a spaceship and a star is going supernova! You are in a race against time to escape obliteration from the impact of the supernova. 

The supernova is always growing but as you collect fuel packets, it propels you farther into space, and farther away from the deadly supernova. 

Unfortunately, space is cluttered with astroids that damage your spaceship and effect your propulsion. 

Win by escaping distruction!

[Play online](https://nancyd333.github.io/Project1/)
</br>
</br>

## Mockup
---
![mockup for game](mockup2.png)
</br>
</br>

## Tech Being Used


- HTML
- CSS
- JavaScript (including canvas)
</br>
</br>

## Sources Used
---
- astroid images: https://www.freeimages.com/photo/asteroid-7-1337597
- sun image used for fuel: https://photojournal.jpl.nasa.gov/catalog/PIA21212
- spaceship image: https://freepngimg.com/png/24752-spaceship
- twinkling sky: https://github.com/Carla-Codes/starry-night-css-animation/blob/master/index.html 
</br>
</br>

## MVP Checklist
---
- Basic gameboard layout<br>
- Section for Player<br>
- Section for displaying win/lose status<br>
- On screen tracker for resources<br>
- Keyboard controls for moving the spaceship<br>
- Detection and subsequent action when collision between spaceship and objects occur<br>
- Ability to reset the game
</br>
</br>

## Stretch Goals
---
- Make a landing page with instructions 
    - backstory and instructions may display as an opening crawl
- Refine graphics
    - have background look like outerspace (mimic twinkling stars against a black background)
    - render objects in more detail 
- Add micro-movements to objects
    - spaceship shakes when it's hit by an astroid
- Implement additional tokens (identified as 'TBD token' in mockup)
- Allow user to choose a game theme and difficulty level
</br>
</br>

## Potential Roadblocks
---
- Getting all the pieces to work together as expected
- Testing different scenarios
</br>
</br>

## Approach Taken
---
- Set daily goals for completion
- Completed MVP
    -  Divided project into sections
    -  Started with getting one item to work, then expanded it out to get multiples
        - One example of this approach was getting:
            1. one astroid to fall from sky
            2. multiple astroids to fall
            3. astroids and fuel to fall
            4. astroids and fuel to be randomly chosen to fall
            5. astroids and fuel to fall at different rates
- Iterated on styling and game flow
</br>
</br>

## Post Project Reflection
---
As I refactored code to make it more succinct, and iterated on development ideas, it became clear the variable and function names were not generalized, which limited it's flexiblity. This made it helpful to conceptualize initially, but needed to be changed in the end. Lessons learned:
- Use variable and function names that are descriptive of the action but general enough to allow for flexibility
- Create functions that have specific responsibly, so they can be reused
</br>
</br>
