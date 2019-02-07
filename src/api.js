function getAllDogs() {
  return fetch('http://localhost:3000/pups')
  .then(res => res.json())
}

function updateDogStatus(dogId, dogStatus){
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: 'PATCH',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({isGoodDog: dogStatus})
  })
}
