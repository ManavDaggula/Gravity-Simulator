// const planet = document.querySelector('.planet')
const screen = document.querySelector('.screen')
const mouseStat = document.querySelector('.mouse-stat')
const promptVar = document.querySelector('.prompt')
const newPlanetButton = document.querySelector(".menu li")
const clearSpaceButton = document.querySelector(".menu li:last-child")
var state="play"
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
    // promptVar.textContent=`state changed to ${state}`
})

// let rect=planet.getBoundingClientRect()
let inc=0;
window.setInterval(() => {
    if(state==="play"){
        // let rect=planet.getBoundingClientRect()
        // console.log(`top:${rect.y}px\nleft:${rect.x}px`)
        // planet.style.top = `${inc}px`;
        // planet.style.left = `${inc}px`;
        // inc+=10;
        // console.log(planets)
        for (const index in planets) {
            if(planets.length<=1){break;}
            // console.log(planet)
            let COMx = 0, COMy = 0, COMmass = 0, newSpeedX = 0, newSpeedY = 0, accX=0,accY=0;
            for(const i in planets){
                if(i!==index){
                    COMx += planets[i].mass*(planets[i].posX - planets[index].posX)
                    COMy += planets[i].mass*(planets[i].posY - planets[index].posY)
                    COMmass+=planets[i].mass
                }
            }
            console.log(`for ${index} ComX=${COMx/COMmass}, ComY=${COMy/COMmass},ComM=${COMmass}`)
            planets[index].elementRef.textContent = `x=${planets[index].posX},y=${planets[index].posY},i=${index} ComX=${COMx/COMmass}, ComY=${COMy/COMmass},ComM=${COMmass}`

            // calculating acceleration components
            // accX = 1000*COMmass*Math.sign(COMx)/Math.pow(COMx/COMmass,2)
            // accY = 1000*COMmass*Math.sign(COMy)/Math.pow(COMy/COMmass,2)
            // planets[index].elementRef.textContent = `${accX},${accY}`

            //calculating new newSpeed components
            // planets[index].speedX += accX
            // planets[index].speedY += accY
            // console.log(index,planets[index].posX,planets[index].posY,planets[index].elementRef,planets[index].speedX,planets[index].speedY)

            //calculating planets displacements
            // planets[index].posX = planets[index].posX + planets[index].speedX
            // planets[index].posY = planets[index].posY + planets[index].speedY

            //moving the planet to new position
            // planets[index].elementRef.style.left = `${planets[index].posX}px`
            // planets[index].elementRef.style.top = `${planets[index].posY}px`
        }
        // console.log(planets)
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