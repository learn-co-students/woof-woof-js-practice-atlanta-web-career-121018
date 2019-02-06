

console.log('%c Woof Woof!', 'color: firebrick')
document.addEventListener("DOMContentLoaded", setupPage)

function filterDogs(){
    fetchDogs().then((dogs) => {
        let filteredDogs = dogs.filter(function(dog) {
            return dog.isGoodDog
        })
        renderAllDogs(filteredDogs)
    })
}



function filterGoodDogs(){
    if (event.target.textContent === 'Filter good dogs: OFF' ){
        event.target.textContent = 'Filter good dogs: ON'
        filterDogs()
    } else {
        event.target.textContent = 'Filter good dogs: OFF'
        helperDogs()
    }

    // console.log(event.target.textContent)
}



function addFilterEventListener(){
    let filterButton = document.querySelector('#good-dog-filter')
    filterButton.addEventListener('click', filterGoodDogs);
}




function updateIsGoodDog(dog) {
    dog.isGoodDog = !dog.isGoodDog
    event.target.textContent = (dog.isGoodDog === true) ? "Good Dog!" : "Bad Dog!";

    return fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({isGoodDog: dog.isGoodDog}),
        // body: JSON.stringify({
        //     isGoodDog: dog.isGoodDog
        // })
    })
    .then(res => res.json())
}




function showDog(dog) {
    console.log(dog)
    let divDogInfo = document.querySelector('#dog-info')
    divDogInfo.innerHTML = ""
    let dogImg = document.createElement('img')
    dogImg.src = dog.image

    let dogHeading = document.createElement('h2')
    dogHeading.textContent = dog.name

    let dogBtn = document.createElement('button')
    dogBtn.id = dog.id
        if (dog.isGoodDog === true){
            dogBtn.textContent = "Good Dog!"
        } else {
            dogBtn.textContent = "Bad Dog!"
        }
    dogBtn.addEventListener('click', () => updateIsGoodDog(dog));

    divDogInfo.appendChild(dogImg)
    divDogInfo.appendChild(dogHeading)
    divDogInfo.appendChild(dogBtn)

    // return divDogInfo;
}


function renderAllDogs(dogs){
    // console.log(dogs)
    let divDogBar = document.querySelector('#dog-bar')
    divDogBar.innerHTML = ""
    dogs.forEach(function (dog){
        let dogSpan = document.createElement('span')
        dogSpan.textContent = dog.name
        dogSpan.addEventListener('click', () => showDog(dog));
        divDogBar.appendChild(dogSpan)

    });
    // return div;
}

function helperDogs() {
    fetchDogs().then(renderAllDogs)
}

function fetchDogs(){
    // fetch('http://localhost:3000/toys').then(res => res.json()).then(res => {renderToys(res)});
    const URL = "http://localhost:3000/pups"
    return fetch(URL)
    .catch(error => console.log(error))
    .then(res => res.json())
    // .then(renderAllDogs)
}



function setupPage() {
    helperDogs()
    addFilterEventListener()
}
