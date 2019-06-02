function renderDogButtons(dogs) {
  $dogBar.innerHTML = ""
  console.log(dogs);
  dogs.forEach(renderDogButton)
}

function renderDogButton(dog) {
  const dogButton = document.createElement('span')
  dogButton.textContent = dog.name
  $dogBar.appendChild(dogButton)
  dogButton.addEventListener('click', () => renderDog(dog))
}

function renderDog(dog) {
  const dogInfo = document.querySelector('#dog-info')
  dogInfo.innerHTML = ''

  const dogImg = document.createElement('img')
  dogImg.src = dog.image
  dogInfo.appendChild(dogImg)

  const dogName = document.createElement('h2')
  dogName.textContent = dog.name
  dogInfo.appendChild(dogName)

  const goodBtn = document.createElement('button')
  goodBtn.textContent = isGoodDogPhrase(dog.isGoodDog)
  dogInfo.appendChild(goodBtn)
  goodBtn.addEventListener('click', () => updateDog(dog))
}

function isGoodDogPhrase(isGoodDog) {
  if (isGoodDog) {
    return "Good Dog!"
  } else {
    return "Bad Dog!"
  }
}
