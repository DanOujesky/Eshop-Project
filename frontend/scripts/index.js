const productContainer = document.querySelector(".product-container");

async function loadProducts() {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) {
      throw new Error("Nepodařilo se načíst data");
    }

    const data = await res.json();

    productContainer.innerHTML = data
      .map(
        (p) => `<article class="product-card">
          <h3>${p.name}</h3>
          <p class="product-desc">${p.description}.
          </p>
          <div class="product-price">${p.price}</div>
          <div class="product-controls">
            <div class="quantity-wrapper">
              <label>Počet:</label>
              <input type="number" value="1" min="1" />
            </div>
            <button class="add-to-cart-btn">Přidat do košíku</button>
          </div>
        </article>`
      )
      .join("");
  } catch (error) {
    console.error("Chyba:", error);
  }
}

loadProducts();
