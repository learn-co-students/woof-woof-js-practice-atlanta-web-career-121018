const dogBar = document.querySelector('#dog-bar')
const dogCard = document.querySelector('#dog-info')
// const filteredDogs = document.getElementById('#good-dog-filter')

function renderAllDogs(dogs){
  dogBar.innerHTML = ''
  dogs.forEach(renderDog)
}

function renderDog(dog){
  const dogBtn = document.createElement('span')
  dogBtn.dataset.id = dog.id
  dogBtn.textContent = dog.name
  dogBar.appendChild(dogBtn)
  dogBtn.addEventListener('click', () => {
    showDog(dog)
  })

}

function showDog(dog){
  const dogImage = document.createElement('img')
  dogImage.src = dog.image
  dogCard.appendChild(dogImage)

  const dogName = document.createElement('h2')
  dogName.textContent = dog.name
  dogCard.appendChild(dogName)

  const dogStatus = document.createElement('p')
  dogStatus.textContent = dog.isGoodDog
  dogCard.appendChild(dogStatus)
  // console.log(dog.isGoodDog)
  switch(dog.isGoodDog){
  case true:
    const dogButton1 = document.createElement('button')
    dogButton1.textContent = "Good dog!"
    dogCard.appendChild(dogButton1)
    dogButton1.addEventListener('click', () => {
      dog.isGoodDog = false;
      dogButton1.textContent = "Bad dog!"
      switchDogStatus(dog)
    })
    break
  case false:
    const dogButton2 = document.createElement('button')
    dogButton2.textContent = "Bad Dog!"
    dogCard.appendChild(dogButton2)
    dogButton2.addEventListener('click', () => {
      dog.isGoodDog = true;
      dogButton2.textContent = "Good dog!"
      switchDogStatus(dog)
    })
    break
  }


}
