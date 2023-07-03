const cartContainer = document.getElementById("cart-container");
const displayCart = (cart) => {
    cart.forEach((item) => {
        const { productId, cartId, price, quantity, title } = item;
        const tr = document.createElement("tr");
        cartContainer.innerHTML += `
                <td class="mr-4">${title}</td>
                <td>${"$" + price}</td>
                <td>
                    <button data-id=${cartId} class="plus border p-1 rounded-l-md">+</button>
                    <span class="border-t border-b p-1 mx-0">${quantity}</span>
                    <button data-id=${cartId} class="minus border p-1 rounded-r-md">-</button>
                </td>
                <td>
                    $${quantity * price}
                </td>
                <td data-id=${cartId} class="delete cursor-pointer border p-1 rounded-md">
                    <i data-id=${cartId} class="delete fa-regular fa-trash-can"></i>
                </td>
            `;
        cartContainer.appendChild(tr);
      });
      displayTotal(cart);
}

const displayTotal = (cart)=> {
    const currentTotal = parseFloat(document.getElementById("total").innerText.slice(8));
    const newTotal = cart.reduce((sum, item)=> sum+item.price*(item.quantity?item.quantity:1),0).toFixed(2)
    document.getElementById("total").innerText = 'Total: $'+newTotal;  
}

