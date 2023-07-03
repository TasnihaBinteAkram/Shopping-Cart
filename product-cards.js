import products from "./products.js";

const container = document.getElementById("product-container");
const cartContainer = document.getElementById("cart-container");
let cart = [];
container.innerHTML = "";
products.forEach((p) => {
  const { id, title, image, price } = p;
  container.innerHTML += `
    <div class="shadow-lg rounded-lg h-[300px]">
        <div class="h-1/2 px-2 py-4">
        <img class="w-full h-full object-contain overflow-hidden" src=${image} alt="">
        </div>
        <div class="mt-2 px-4">
            <h1>${title}</h1>
            <p>Price: ${"$" + price}</p>
            <button data-id = ${id} class="buy-button bg-yellow-500 text-white px-4 py-1 mt-2 rounded-lg">Add to Cart</button>
        </div>
    </div>
    `;
});

const handleBuy = (e) => {
  cartContainer.innerHTML = "";
  const title = e.target.parentNode.children[0].innerText;
  const price = parseFloat(e.target.parentNode.children[1].innerText.slice(8));
  let quantity = 0;
  const productId = e.target.dataset.id;
  const cartId = "cart" + productId;
  const currentItem = cart.find((item) => item.productId == productId);

  if (currentItem) {
    quantity = currentItem.quantity + 1;
  } else {
    quantity = quantity + 1;
  }

  const cartItem = { cartId, productId, title, price, quantity };
  const restItems = cart.filter((item) => item.productId !== productId);
  cart = [...restItems, cartItem];
  bottomBar.classList.remove("hidden");
  displayCart(cart);
};

const bottomBar = document.getElementById("bottom-total");
if (cart.length < 1) {
  bottomBar.classList.add("hidden");
} else {
  bottomBar.classList.remove("hidden");
}

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("buy-button")) {
    handleBuy(event);
  }
});

//plus quantity
cartContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("plus")) {
    const price =
      event.target.parentNode.parentNode.children[1].innerText.slice(1);
    const currentQuantity = parseInt(
      event.target.parentNode.children[1].innerText
    );
    event.target.parentNode.children[1].innerText = currentQuantity + 1;
    const newQuantity = event.target.parentNode.children[1].innerText;
    event.target.parentNode.parentNode.children[3].innerText = `$${
      price * newQuantity
    }`;

    //update the quantity of cart on clicking + icon
    const itemId = event.target.dataset.id;
    const updatedItem = cart.find((item) => item.cartId == itemId);
    updatedItem.quantity = newQuantity;
    const restItems = cart.filter((item) => item.cartId !== itemId);
    cart = [...restItems, updatedItem];
    displayTotal(cart);
  }
});

//minus quantity
cartContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("minus")) {
    const currentQuantity = parseInt(
      event.target.parentNode.children[1].innerText
    );
    const price =
      event.target.parentNode.parentNode.children[1].innerText.slice(1);
    if (currentQuantity > 1) {
      event.target.parentNode.children[1].innerText = currentQuantity - 1;
      const newQuantity = event.target.parentNode.children[1].innerText;
      event.target.parentNode.parentNode.children[3].innerText = `$${
        price * newQuantity
      }`;
      const itemId = event.target.dataset.id;
      const updatedItem = cart.find((item) => item.cartId == itemId);
      updatedItem.quantity = newQuantity;
      const restItems = cart.filter((item) => item.cartId !== itemId);
      cart = [...restItems, updatedItem];
      displayTotal(cart);
    }
  }
});

//delete row
cartContainer.addEventListener("click", (event) => {
  if (event.target.parentNode.classList.contains("delete")) {
    event.target.parentNode.parentNode.remove();
    const itemId = event.target.dataset.id;
    const remaining = cart.filter((item) => item.cartId !== itemId);
    cart = [...remaining];
    displayTotal(cart);
    if (cart.length < 1) {
      bottomBar.classList.add("hidden");
    }
  } else if (event.target.classList.contains("delete")) {
    event.target.parentNode.remove();
    const itemId = event.target.dataset.id;
    const remaining = cart.filter((item) => item.cartId !== itemId);
    cart = [...remaining];
    displayTotal(cart);
    if (cart.length < 1) {
      bottomBar.classList.add("hidden");
    }
  }
});

document.getElementById("clear-cart").addEventListener('click', function(){
    cart = [];
    displayTotal(cart);
    cartContainer.innerHTML = "";
    bottomBar.classList.add("hidden");
})
