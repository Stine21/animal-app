
document.addEventListener("DOMContentLoaded", function(){
    const pokelistElm = document.querySelector(".alledyr")
    const pokefooter = document.querySelector(".navigation")

    if (pokelistElm){
        let url = new URLSearchParams(window.location.search);

        let offset = url.get("offset") ? url.get("offset") : 0;
        let nextOffset;
        let prevOffset;

        fetch(`https://stine-my-api.herokuapp.com/api/v1/animals?offset=${offset}`)
        .then(responce => responce.json())
        .then(data => {
            console.log(data)

            let maxOffset = data.count - data.count % 5

            nextOffset = offset >= maxOffset ? maxOffset : parseInt(offset) + 5
            prevOffset = offset <= 0 ? 0 : parseInt(offset) - 5

            data.forEach(animals => {
                let li = document.createElement('li')
                li.innerHTML=`
                <h2>${animals.name}</h2>
                <h3>${animals.type}</h3>
                `
                pokelistElm.appendChild(li)
            });

            let prev = document.createElement("a")

            if(offset == 0){prev.classList.add("btn__disabled")}
            prev.setAttribute("href", `?offset=${prevOffset}`)
            let prevNode = document.createTextNode("Previous");
            prev.appendChild(prevNode)
            pokefooter.appendChild(prev)

            let next = document.createElement("a")

            if(offset >= maxOffset){next. classList.add("btn__disabled")}
            next.setAttribute("href", `?offset${nextOffset}`)
            let nextNode = document.createTextNode("Next")
            next.appendChild(nextNode)
            pokefooter.appendChild(next)
        })
    }

})