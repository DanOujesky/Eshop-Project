const cartCountEl = document.getElementById("cart-count");

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

function updateCartCount() {
  if (!cartCountEl) return;
  const cart = getCart();
  cartCountEl.textContent = cart.length;
}

updateCartCount();

const totalProductsEl = document.getElementById("total-products");
const totalOrdersEl = document.getElementById("total-orders");
const totalRevenueEl = document.getElementById("total-revenue");
const topProductEl = document.getElementById("top-product");

const refreshReportBtn = document.getElementById("refreshReportBtn");

async function fetchReport() {
  try {
    const res = await fetch("/api/admin/report");
    if (!res.ok) throw new Error("Nepodařilo se načíst report");

    const data = await res.json();

    totalProductsEl.textContent = data.totalProducts;
    totalOrdersEl.textContent = data.totalOrders;
    totalRevenueEl.textContent = `${data.totalRevenue} Kč`;
    topProductEl.textContent = data.topProduct || "-";
  } catch (err) {
    console.error(err);
    alert("Chyba při načítání reportu");
  }
}

refreshReportBtn.addEventListener("click", fetchReport);

fetchReport();
