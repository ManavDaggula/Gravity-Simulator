// const planet = document.querySelector('.planet')
const screen = document.querySelector('.screen')
const mouseStat = document.querySelector('.mouse-stat')
const promptVar = document.querySelector('.prompt')
const newPlanetButton = document.querySelector(".menu li")
var state="play"
promptVar.textContent = "Prompts will appear here."
var planets = [
    // {
    //     speedX:0,
    //     speedY:0,
    //     posX:0,
    //     posY:0,
    //     elementRef:null
    // }
]
screen.addEventListener("mousemove",(event)=>{
    // planet.style.top = `${event.clientY-25}px`;
    // planet.style.left = `${event.clientX-5}px`;

    mouseStat.textContent = event.clientX + " " + event.clientY;
})

screen.addEventListener("click",(event)=>{
    if(state==="play"){state="paused"}
    else if(state==="new"){
        // alert("new planet added.")
        promptVar.textContent = `${event.clientX} , ${event.clientY}`
        state="play"
        let newPLanetElement = document.createElement('div')
        newPLanetElement.className = "planet";
        newPLanetElement.style.top = `${event.clientY-53}px`
        newPLanetElement.style.left = `${event.clientX-15}px`
        screen.appendChild(newPLanetElement)
        planets.push({
            speedX:0,
            speedY:0,
            posX:event.clientY-43,
            posY:event.clientX-5,
            elementRef:newPLanetElement
        })
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

        for (const index in planets) {
            // console.log(planet)
            let COMx = 0
            let COMy = 0
            let COMmass = 0
            newSpeedX = 0;
            newSpeedY = 0;
            for(const i in planets){
                if(i===index){continue;}
                COMx += (planets[index].posX - planets[i].posX)
                COMy += (planets[index].posY - planets[i].posY)
                COMmass+=10
            }
            

        }

    }
}, 1000);

newPlanetButton.addEventListener("click",()=>{
    state="new";
    promptVar.textContent = "Click to add a new planet."
})