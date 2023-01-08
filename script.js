// const planet = document.querySelector('.planet')
const screen = document.querySelector('.screen')
const mouseStat = document.querySelector('.mouse-stat')
const promptVar = document.querySelector('.prompt')
const newPlanetButton = document.querySelector(".menu li")
const clearSpaceButton = document.querySelector(".menu li:last-child")
var state="play"
const gravitationConst = 100000;
promptVar.textContent = "Prompts will appear here."
var planets = [
    // {
    //     speedX:0,
    //     speedY:0,
    //     posX:0,
    //     posY:0,
    //     mass:10,
    //     elementRef:null
    // }
]
screen.addEventListener("mousemove",(event)=>{
    // planet.style.top = `${event.clientY-25}px`;
    // planet.style.left = `${event.clientX-5}px`;

    mouseStat.textContent = `${event.clientX-40}  ${event.clientY-78}`;
})

screen.addEventListener("click",(event)=>{
    if(state==="play"){state="paused"}
    else if(state==="new"){
        // alert("new planet added.")
        promptVar.textContent = `${event.clientX} , ${event.clientY}`
        //creating a planet div
        let newPLanetElement = document.createElement('div')
        newPLanetElement.className = "planet";
        newPLanetElement.style.top = `${event.clientY-78}px`
        newPLanetElement.style.left = `${event.clientX-40}px`
        //adding planet div to screen
        screen.appendChild(newPLanetElement)
        // adding the new planet to planet array
        planets.push({
            speedX:0,
            speedY:0,
            posX:event.clientX-40,
            posY:event.clientY-78,
            mass:10,
            elementRef:newPLanetElement
        })
        state="play"
    }
    else{state="play"}
    promptVar.textContent=`state changed to ${state}`
})

// let rect=planet.getBoundingClientRect()
let inc=0;
window.setInterval(() => {
    if(state==="play"){
        // loop to calculate acceleration and speed components
        for (const index in planets) {
            if(planets.length<=1){break;}
            // console.log(planet)
            let COMx = 0, COMy = 0, COMmass = 0, newSpeedX = 0, newSpeedY = 0, accX,accY,accR,angle;
            for(const i in planets){
                if(i!==index){
                    COMx += planets[i].mass*(planets[i].posX - planets[index].posX)
                    COMy += planets[i].mass*(planets[i].posY - planets[index].posY)
                    COMmass+=planets[i].mass
                }
            }
            COMx=COMx/COMmass;
            COMy=COMy/COMmass;
            // console.log(`for ${index} ComX=${COMx/COMmass}, ComY=${COMy/COMmass},ComM=${COMmass}`)
            // planets[index].elementRef.textContent = `x=${planets[index].posX},y=${planets[index].posY},i=${index} ComX=${COMx}, ComY=${COMy},ComM=${COMmass}`

            // calculating acceleration components
            accR = gravitationConst*COMmass/(Math.pow(COMx,2)+Math.pow(COMy,2))
            accX = accR*COMx/(Math.pow(COMx,2)+Math.pow(COMy,2))
            accY = accR*COMy/(Math.pow(COMx,2)+Math.pow(COMy,2))
            // console.log(`for ${index} a=${accR} ax=${accX} ay=${accY}`)

            //calculating new newSpeed components
            planets[index].speedX = planets[index].speedX + accX*0.1
            planets[index].speedY = planets[index].speedY + accY*0.1
            // console.log(`for ${index} ax=${accX} ay=${accY} iSpeedX=${planets[index].speedX} iSpeedY=${planets[index].speedY}`)

        }
        
        // loop to displace the planet
        if(planets.length>1){
            planets.forEach(planet => {
                //calculating planets displacements
                planet.posX = planet.posX + planet.speedX
                planet.posY = planet.posY + planet.speedY
    
                //moving the planet to new position
                planet.elementRef.style.left = `${planet.posX}px`
                planet.elementRef.style.top = `${planet.posY}px`
    
                planet.elementRef.textContent = `speedX=${Math.round(planet.speedX*100)/100} speedY=${Math.round(planet.speedY*100)/100}`
            });
        }

        // loop to check planet collisions
        for (const index in planets){
            if(planets.length<=1){break;}
            for(const i in planets){
                if(index===i){continue;}
                let distanceX = planets[i].posX-planets[index].posX
                let distanceY = planets[i].posY-planets[index].posY
                if(Math.sqrt(Math.pow(distanceX,2)+Math.pow(distanceY,2))<80){
                    // here collision occurs between planets[index] and planets[i]
                    console.log(`collision between ${index} and ${i}`)
                    let newMass = planets[index].mass + planets[i].mass
                    let newPosX = (planets[index].mass*planets[index].posX + planets[i].mass*planets[i].posX)/newMass
                    let newPosY = (planets[index].mass*planets[index].posY + planets[i].mass*planets[i].posY)/newMass
                    let newSpeedX = (planets[index].mass*planets[index].speedX + planets[i].mass*planets[i].speedX)/newMass
                    let newSpeedY = (planets[index].mass*planets[index].speedY + planets[i].mass*planets[i].speedY)/newMass

                    planets[index].mass = newMass
                    planets[index].posX = newPosX
                    planets[index].posY = newPosY
                    planets[index].speedX = newSpeedX
                    planets[index].speedY = newSpeedY
                    planets[index].elementRef.style.left = `${newPosX}px`
                    planets[index].elementRef.style.top = `${newPosY}px`

                    planets[i].elementRef.remove()
                    planets.splice(i,1)
                }
            }
        }

        console.log(planets)
    }
}, 1000);

newPlanetButton.addEventListener("click",()=>{
    state="new";
    promptVar.textContent = "Click to add a new planet."
})

clearSpaceButton.addEventListener("click",()=>{
    planets=[];
    screen.innerHTML = "";
})