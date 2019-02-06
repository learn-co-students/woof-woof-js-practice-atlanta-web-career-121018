document.addEventListener("DOMContentLoaded", setupPage)

function setupPage() {
  renderAllDogs()
  const filterBtn = document.querySelector('#good-dog-filter')
  filter = false
  filterBtn.addEventListener('click', function() {
    filter = !filter
      if (filter) {
        filterBtn.innerText = 'Filter good dogs: ON'
      } else {
        filterBtn.innerText = 'Filter good dogs: OFF'
      }
    badDogErasure()
  })
}

function renderAllDogs() {
  let dogBar = document.querySelector("#dog-bar")
  while (dogBar.firstChild) {
    dogBar.removeChild(dogBar.firstChild)
  }
  fetchDogs().then( (dogs) => {
    dogs.forEach(renderDog);
    })
}

function fetchDogs() {
  url = "http://localhost:3000/pups";

  return fetch(url).then(res => res.json())
}

function renderDog(dog) {
  // console.log(dog)
  let dogBar = document.querySelector("#dog-bar")
  let dogName = document.createElement("span")
  dogName.textContent = dog.name
  dogName.addEventListener('click', function() {dogView(dog)})
  dogBar.appendChild(dogName)
}

function dogView(dog) {
  // debugger
  // console.log(dog)
  dogInfo = document.querySelector("#dog-info")
  while (dogInfo.firstChild) {
    dogInfo.removeChild(dogInfo.firstChild)
  }
  dogPic = document.createElement("img")
  dogPic.src = dog.image
  doggo = document.createElement("h2")
  doggo.textContent = dog.name
  alignment = document.createElement("button")
  if (dog.isGoodDog) {
    alignment.innerText = 'Good Dog!'
  } else {
    alignment.innerText = 'Bad Dog!'
  }
  alignment.addEventListener('click', function() {
    dog.isGoodDog = !dog.isGoodDog
    dynamicDogBehavior(dog)
    // dogView(dog)
    // whoops
    //send new info to db
    badDogErasure()
  })
  dogInfo.appendChild(dogPic)
  dogInfo.appendChild(doggo)
  dogInfo.appendChild(alignment)
}

function dynamicDogBehavior(dog) {
  console.log(dog)
  fetch(url + `/${dog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      isGoodDog: dog.isGoodDog
    })
  })
  // console.log(dog)
  dogView(dog)
}

function badDogErasure() {
  if (filter) {
    let dogBar = document.querySelector("#dog-bar")
    while (dogBar.firstChild) {
      dogBar.removeChild(dogBar.firstChild)
    }
    fetchDogs().then((dogs) => {
      dogs.filter(function(d) {
        return d.isGoodDog === true
      }).forEach(renderDog)
    })
  } else {
    renderAllDogs()
  }
  const filterBtn = document.querySelector('#good-dog-filter')
  if (filter) {
    filterBtn.innerText = 'Filter good dogs: ON'
  } else {
    filterBtn.innerText = 'Filter good dogs: OFF'
  }
}
