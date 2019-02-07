const filteredDogs = document.getElementById('good-dog-filter')
filteredDogs.addEventListener('click', filterDogs)

document.addEventListener('DOMContentLoaded', () => {
  getAllDogs()
  .then(renderAllDogs)
})

function switchDogStatus(dog){
  // console.log(dog)
  // const dogId = event.target.parentElement.dataset.id
  // const dogStatus = event.target.parentElement.querySelector('p')
  const dogId = dog.id
  let dogStatus = dog.isGoodDog
  if(dogStatus === true){
    dogStatus = false;
  }
  if(dogStatus === false){
    dogStatus = true;
  }
  updateDogStatus(dogId, dogStatus)

}
// console.log($filteredDogs)
// filterDogs.addEventListener('click', filterDogs)

function filterDogs(){
  getAllDogs()
  .then(toggleDogs)
}
function toggleDogs(dogs){
  if(filteredDogs.textContent === 'Filter good dogs: OFF'){
    filteredDogs.textContent = 'Filter good dogs: ON'
  dogs = dogs.filter( (dog) => {
    return dog.isGoodDog
  })
  renderAllDogs(dogs)
} else if (filteredDogs.textContent === 'Filter good dogs: ON'){
  filteredDogs.textContent = 'Filter good dogs: OFF'
  getAllDogs()
  .then(renderAllDogs)
  }

}
