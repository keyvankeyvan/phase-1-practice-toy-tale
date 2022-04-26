let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  buttonHideNSeek()
  
  toyFetcher()

  const submitForm = document.querySelector("form")
  submitForm.addEventListener('submit', (e) => newToy(e))

  // const submitLike = document.querySelector("form")
  // submitForm.addEventListener('submit', (e) => newToy(e))
});


function buttonHideNSeek() {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}

function toyFetcher() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => {
      const toyDiv = document.getElementById('toy-collection')
      for (toy of data) {
        newCard = document.createElement('div')
        newCard.className = ('card')
        newCard.innerHTML = (`<h2>${toy['name']}</h2>
      <img src="${toy['image']}" class="toy-avatar" />
      <p id="${toy['name']}likes">0 Likes</p>
      <button class="like-btn" id="${toy['name']}">Like ❤️</button>`)
        newCard.addEventListener('click', (e) => liker(e))
        toyDiv.appendChild(newCard)
      }
    })
}

function newToy(event) {
  event.preventDefault()

  const formData = {
    "name": event.target.name.value,
    "image": event.target.image.value,
    "likes": 0
  };

  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch('http://localhost:3000/toys', configObject)
    .then((response) => response.json())
    .then((data) => {
      const toyDiv = document.getElementById('toy-collection')
      newCard = document.createElement('div')
        newCard.className = ('card')
        newCard.innerHTML = (`<h2>${data['name']}</h2>
      <img src="${data['image']}" class="toy-avatar" />
      <p id="${data['name']}likes">0 Likes</p>
      <button class="like-btn" id="${data['name']}">Like ❤️</button>`)
      newCard.addEventListener('click', (e) => liker(e))
      toyDiv.appendChild(newCard)
    })
}

function liker(event){
  event.preventDefault()
  const likeText = document.getElementById(`${event.target.id}likes`)
  const splitInner = likeText.innerText.split(" ")
  let totalLikes = parseInt(splitInner[0])
  splitInner[0] = (totalLikes += 1)
  likeText.innerText = splitInner.join(" ")
}