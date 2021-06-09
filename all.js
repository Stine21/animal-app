
document.addEventListener("DOMContentLoaded", function(){
    const pokelistElm = document.querySelector(".alledyr")
    const pokefooter = document.querySelector(".navigation")

    if (pokelistElm){
        let url = new URLSearchParams(window.location.search);

        let offset = url.get("offset") ? url.get("offset") : 0;
        let nextOffset;
        let prevOffset;



        fetch(`https://stine-my-api.herokuapp.com/api/v1/animals?offset=${offset}&limit=5`)
        .then(responce => responce.json())
        .then(data => {
            

            let maxOffset = data.count - data.count % 5

            nextOffset = offset >= maxOffset ? maxOffset : parseInt(offset) + 5
            prevOffset = offset <= 0 ? 0 : parseInt(offset) - 5

            data.result.forEach(animals => {
                let li = document.createElement('li')
                li.classList.add("animal__container")
                li.innerHTML=`
                <h2 class="animal__name">${animals.name}</h2>
                <h3 class="animal__type">${animals.type}</h3>
                <a class="detailes__btn" href="">Details</a>
                <a class="update__btn" href="">Update</a>

                `
                pokelistElm.appendChild(li)
            });

            let prev = document.createElement("a")
            prev.classList.add("btn", "animate__animated", "animate__slideInDown");
            if(offset == 0){prev.classList.add("btn__disabled")}
            prev.setAttribute("href", `?offset=${prevOffset}`)
            let prevNode = document.createTextNode("Previous");
            prev.appendChild(prevNode)
            pokefooter.appendChild(prev)

            let next = document.createElement("a")
            next.classList.add("btn", "animate__animated", "animate__slideInDown");
            if(offset >= maxOffset){next. classList.add("btn__disabled")}
            next.setAttribute("href", `?offset=${nextOffset}`)
            let nextNode = document.createTextNode("Next")
            next.appendChild(nextNode)
            pokefooter.appendChild(next)
        })
    }

})