document.addEventListener("DOMContentLoaded", setupPage)
let dogBar = document.querySelector('#dog-bar')
let dogContainer = document.querySelector('#dog-info')

function setupPage() {
  renderAllDogs()
} 

function renderAllDogs() { 
    dogBar.innerHTML = ""
    let url = `http://localhost:3000/pups`;
    getDog(url).then(function (data) {
        data.forEach(dogSpan)
    })
}  

function getDog(url) { 
    return fetch(url).then(res => res.json())
}  

function dogSpan(dog) {
    let element = document.createElement('span')
    element.textContent = dog.name 
    element.dataset.id = dog.id
    element.addEventListener("click", renderDogInfo)
    dogBar.appendChild(element)
} 

function renderDogInfo() {
    dogContainer.innerHTML = ""
    let id = parseInt(event.target.dataset.id)
    let url = `http://localhost:3000/pups/${id}`; 
    getDog(url).then(dogInfo)
}

function dogInfo(dog) {
    let dogImg = document.createElement('img')
    dogImg.src = dog.image 
    dogContainer.appendChild(dogImg)

    let dogName = document.createElement('h2')
    dogName.textContent = dog.name
    dogContainer.appendChild(dogName) 
    
    let dogStatus = document.createElement('button')
    dogStatus.dataset.id = dog.id
    if (dog.isGoodDog) {
        dogStatus.textContent = "Good doggo!" 
    } else {
        dogStatus.textContent = "Bad doggo!"
    }
    dogStatus.addEventListener("click", changeStatus)
    dogContainer.appendChild(dogStatus) 
}

function changeStatus() {
    let status = event.target.textContent
    let update = true 
    let id  = event.target.dataset.id
    if (status == "Good doggo!") {
        event.target.textContent = "Bad doggo!"
        update = false
    } else {
        event.target.textContent = "Good doggo!"
        update = true
    } 
    updateStatus(id, update)
}

function updateStatus(id, update) {
    return fetch(`http://localhost:3000/pups/${id}`,{
      method: 'PATCH',
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, 
      body: JSON.stringify({
        isGoodDog: update
      })
    })     
}
