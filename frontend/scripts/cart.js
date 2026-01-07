const cartItemsEl = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const checkoutButton = document.getElementById("checkout-btn");

checkoutButton.addEventListener("click", () => {
  window.location.href = "/order";
});

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const cart = getCart();
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Košík je prázdný.</p>";
    totalPriceEl.textContent = "0 Kč";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <h3>${item.name}</h3>
      <strong>${item.price} Kč</strong>
      <input type="number" min="1" value="${item.quantity}">
      <button class="remove-btn">✖</button>
    `;

    div.querySelector("input").addEventListener("change", (e) => {
      const val = Number(e.target.value);
      cart[index].quantity = val < 1 ? 1 : val;
      saveCart(cart);
      renderCart();
    });

    div.querySelector(".remove-btn").addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
    });

    cartItemsEl.appendChild(div);
  });

  totalPriceEl.textContent = `${total} Kč`;
}

renderCart();
