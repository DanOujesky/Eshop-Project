const productContainer = document.querySelector(".product-container");
const cartCountEl = document.getElementById("cart-count");

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalQty;
}

async function loadProducts() {
  try {
    const res = await fetch("/api/product");
    if (!res.ok) {
      throw new Error("Nepodařilo se načíst data");
    }

    const data = await res.json();

    productContainer.innerHTML = data
      .map(
        (p) => `
        <div class="product-card">
          <h3>${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          <div class="product-price">${p.price} Kč</div>

          <div class="product-controls">
            <div class="quantity-wrapper">
              <input type="number" min="1" value="1" id="qty-${p.id}">
              <span>ks</span>
            </div>

            <button class="add-to-cart-btn" onclick="addToCart(${p.id})">
              Přidat do košíku
            </button>
          </div>
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error(err);
  }
}
function addToCart(productId) {
  const cart = getCart();
  const qtyInput = document.getElementById(`qty-${productId}`);
  const quantity = Number(qtyInput.value);

  const productCard = qtyInput.closest(".product-card");
  const name = productCard.querySelector("h3").textContent;
  const price = Number(
    productCard.querySelector(".product-price").textContent.replace(" Kč", "")
  );

  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name,
      price,
      quantity,
    });
  }

  saveCart(cart);
}

updateCartCount();
loadProducts();
