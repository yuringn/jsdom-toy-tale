let addToy = false;
const divCollection = document.querySelector("div#toy-collection")


document.addEventListener("DOMContentLoaded", () => {
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

});

//Deliverable 1 + 2: Fetch Andy's Toys & Add Toy Info to the Card

const renderOneToy = toyObj => {
  const divCard = document.createElement("div")
  divCard.className = "card"
  divCard.dataset.id = toyObj.id

  divCard.innerHTML=`
    <h2>${toyObj.name}</h2>
    <img src=${toyObj.image} class="toy-avatar" />
    <p>${toyObj.likes} Likes </p>
    <button class="like-btn">Like <3</button>`

  divCollection.append(divCard)
  console.log(divCard)
}

  fetch("http://localhost:3000/toys")
  .then (response => response.json())
  .then (arrayOfToys => arrayOfToys.forEach(toyObj =>
    renderOneToy(toyObj)
    ))


//Deliverable 2: Add a New Toy

const newForm = document.querySelector(".add-toy-form")
console.log("hi", newForm)
newForm.addEventListener("submit", event => {
  event.preventDefault()
  const newObj = {
    name: event.target[0].value,
    image: event.target[1].value,
    likes :0
  }

  fetch("http://localhost:3000/toys", {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newObj)
  })
  .then (response => response.json())
  .then (newObj => renderOneToy(newObj))
  newForm.reset()

})

//Deliverable 3: Increase Toy's Likes

divCollection.addEventListener("click", event =>{
  if (event.target.matches(".like-btn")){
    const cardDiv = event.target.closest("div")
    let likesDisplay = event.target.previousElementSibling
    let currentLikes = parseInt(likesDisplay.textContent)
  
  fetch (`http://localhost:3000/toys/${cardDiv.dataset.id}`,{
    method:"PATCH", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: ++currentLikes})
  })
  .then (response => response.json())
  .then (newLikes => {
    likesDisplay.textContent = `${newLikes.likes} Likes`
  })
}
})