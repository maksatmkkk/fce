const titleInp = document.querySelector("#title");
const descriptionInp = document.querySelector("#description");
const priceInp = document.querySelector("#price");
const form = document.querySelector(".form");
const updateBtn = document.querySelector("#update");

const products = document.querySelector(".products");

function getData() {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((res) => {
      displayData(res);
    });
}

function displayData(data) {
  data.forEach((item, i) => {
    products.innerHTML += `
      <div class="product">
        <img src='${item.image}' />
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <b>${item.price}</b>
        <button id="${item.id}" class="btn">Edit</button>
      </div>
    `;
  });
  const btns = document.querySelectorAll(".btn");
  btns.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(button.id);
      const existingItem = data?.find((item) => +item.id === +button.id);
      editProduct(existingItem);
    });
  });
  console.log(btns);
}
getData();

function editProduct(item) {
  console.log(item);
  titleInp.value = item?.title;
  descriptionInp.value = item?.description;
  priceInp.value = item?.price;

  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    updateProduct(item.id);
  });
}

function updateProduct(id) {
  const obj = {
    id: id,
    title: titleInp.value,
    price: priceInp.value,
    description: descriptionInp.value,
  };
  fetch(`http://localhost:3000/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
  getData();
}

// npm install
