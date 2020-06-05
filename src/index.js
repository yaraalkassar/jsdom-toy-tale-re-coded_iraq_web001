let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  const toyNameInput = document.getElementsByTagName("input")[0];
  const toyImageInput = document.getElementsByTagName("input")[1];
  const createNewToy = document.getElementsByTagName("input")[2];
  const toyCollection = document.querySelector("#toy-collection");

  function fetchData() {
    fetch("http://localhost:3000/toys")
      .then((response) => response.json())
      .then((toys) => toys.forEach((toy) => getToys(toy)));
  }
  function getToys(toy) {
    toyCollection.insertAdjacentHTML(
      "beforeend",
      `
<div class="card">
<h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p class="likes">${toy.likes} Likes </p>
          <button class="like-btn">Like <3</button>
</div>
`
      /* end of insertion */
    );
    let likeButton = document.querySelector(".like-btn");
    likeButton.addEventListener("click", (e) => {
      e.preventDefault();
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "likes": toy.likes + 1 }),
      };
    fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
      /*end of function*/
    });
  }

  createNewToy.addEventListener("click", (e) => {
    e.preventDefault();
    let data = {
      name: toyNameInput.value,
      image: toyImageInput.value,
      likes: 0,
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:3000/toys", configObj)
      .then((response) => response.json())
      .then((toy) => getToys(toy));
  });

  fetchData();
});
