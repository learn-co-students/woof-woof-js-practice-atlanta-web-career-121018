
document.addEventListener('DOMContentLoaded', setup)

function setup() {
  $filterBtn = document.querySelector('#good-dog-filter')
  $filterBtn.dataset.on = 0

  $dogBar = document.querySelector('#dog-bar')

  getDogs().then(renderDogButtons)
  $filterBtn.addEventListener('click', toggleFilter)
}

function updateDog(dog) {
  dog.isGoodDog = !dog.isGoodDog
  event.target.textContent = isGoodDogPhrase(dog.isGoodDog)

  patchDog(dog)
}

function toggleFilter() {
  if (parseInt($filterBtn.dataset.on)) {
    $filterBtn.dataset.on = 0
    $filterBtn.textContent = 'Filter good dogs: OFF'
    getDogs().then(renderDogButtons)
  } else {
    $filterBtn.dataset.on = 1
    $filterBtn.textContent = 'Filter good dogs: ON'
    getDogs().then(filterAndRenderDogButtons)
  }
}

function filterAndRenderDogButtons(dogs) {
  dogs = dogs.filter((dog) => {
    return dog.isGoodDog
  })
  renderDogButtons(dogs)
}
