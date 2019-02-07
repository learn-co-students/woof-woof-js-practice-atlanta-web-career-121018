const URL = 'http://localhost:3000/pups/'

function getDogs() {
  return fetch(URL)
    .then(res => res.json())
}

function patchDog(dog) {
  fetch(URL + dog.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: dog.isGoodDog
    })
  })
}
