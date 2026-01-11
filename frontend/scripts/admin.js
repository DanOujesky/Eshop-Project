const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const availableInput = document.getElementById("available");
const descriptionInput = document.getElementById("description");
const categoryIdInput = document.getElementById("categoryId");

const productList = document.getElementById("productList");
const saveBtn = document.getElementById("saveBtn");

const importProductsFile = document.getElementById("importProductsFile");
const importUsersFile = document.getElementById("importUsersFile");

const totalProductsEl = document.getElementById("total-products");
const totalOrdersEl = document.getElementById("total-orders");
const totalRevenueEl = document.getElementById("total-revenue");
const topProductEl = document.getElementById("top-product");
const refreshReportBtn = document.getElementById("refreshReportBtn");

let editId = null;

importProductsFile.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/admin/import/products", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error();
    alert("Produkty úspěšně importovány");
    loadProducts();
  } catch {
    alert("Chyba při importu produktů");
  }
});

importUsersFile.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/admin/import/users", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error();
    alert("Zákazníci úspěšně importováni");
  } catch {
    alert("Chyba při importu zákazníků");
  }
});

async function fetchReport() {
  try {
    const res = await fetch("/api/admin/report");
    if (!res.ok) throw new Error();

    const data = await res.json();
    totalProductsEl.textContent = data.totalProducts;
    totalOrdersEl.textContent = data.totalOrders;
    totalRevenueEl.textContent = `${data.totalRevenue} Kč`;
    topProductEl.textContent = data.topProduct || "-";
  } catch {
    alert("Chyba při načítání reportu");
  }
}

refreshReportBtn.addEventListener("click", fetchReport);
fetchReport();

async function loadProducts() {
  const res = await fetch("/api/product");
  const products = await res.json();

  productList.innerHTML = "";

  products.forEach((p) => {
    const li = document.createElement("li");
    li.className = "product-item";

    li.innerHTML = `
      <div>
        <strong>${p.name}</strong><br>
        ${p.price} Kč |
        ${p.available === 1 ? "Aktivní" : "Neaktivní"}
      </div>
      <div class="product-actions">
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    li.querySelector(".edit-btn").addEventListener("click", () =>
      editProduct(p.id)
    );

    li.querySelector(".delete-btn").addEventListener("click", () =>
      deleteProduct(p.id)
    );

    productList.appendChild(li);
  });
}

document.getElementById("saveBtn").addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const categoryId = parseInt(categoryIdInput.value, 10);
  const available = availableInput.value === "ACTIVE" ? 1 : 0;
  const description = descriptionInput.value.trim();

  if (!name || isNaN(price) || isNaN(categoryId)) {
    alert("Vyplň všechna pole správně");
    return;
  }

  const product = { name, price, available, categoryId, description };

  const url = editId ? `/api/product/${editId}` : "/api/product";
  const method = editId ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(err);
    alert("Chyba při ukládání produktu");
    return;
  }

  editId = null;
  loadProducts();
});

async function editProduct(id) {
  const res = await fetch(`/api/product/${id}`);
  if (!res.ok) return;

  const p = await res.json();

  nameInput.value = p.name;
  priceInput.value = p.price;
  availableInput.value = p.available === 1 ? "ACTIVE" : "INACTIVE";
  descriptionInput.value = p.description || "";
  categoryIdInput.value = p.category_id;

  editId = p.id;
}

async function deleteProduct(id) {
  if (!confirm("Opravdu smazat produkt?")) return;

  const res = await fetch(`/api/product/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    alert("Chyba při mazání produktu");
    return;
  }

  loadProducts();
}

function clearForm() {
  nameInput.value = "";
  priceInput.value = "";
  availableInput.value = "ACTIVE";
  descriptionInput.value = "";
  categoryIdInput.value = "";
  editId = null;
}

loadProducts();
