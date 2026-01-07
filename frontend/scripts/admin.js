const importProductsFile = document.getElementById("importProductsFile");
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

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chyba při importu");

    alert("Produkty úspěšně importovány");
  } catch (err) {
    console.error(err);
    alert("Chyba při importu produktů");
  }
});

const importUsersFile = document.getElementById("importUsersFile");
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

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Chyba při importu");

    alert("Zákazníci úspěšně importováni");
  } catch (err) {
    console.error(err);
    alert("Chyba při importu zákazníků");
  }
});

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
