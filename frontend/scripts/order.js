import { orderSchema } from "../shared/validation/orderSchema.js";

const cartCountEl = document.getElementById("cart-count");
if (cartCountEl) {
  updateCartCount();
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}
function removeCart() {
  localStorage.setItem("cart", "");
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalQty;
}

const form = document.getElementById("orderForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = document.querySelector(".submit-btn");

  submitBtn.disabled = true;
  submitBtn.textContent = "Odesílám...";

  clearErrors();

  const formData = new FormData(form);

  const data = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
  };

  const result = orderSchema.safeParse(data);

  if (!result.success) {
    showErrors(result.error.flatten().fieldErrors);
    submitBtn.disabled = false;
    submitBtn.textContent = "Odeslat objednávku";
    return;
  }

  try {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userData: result.data, orderData: getCart() }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Chyba při odeslání objednávky");
      return;
    }

    alert("Objednávka úspěšně odeslána");
    removeCart();
    updateCartCount();
    form.reset();
  } catch (err) {
    console.error(err);
    alert("Server není dostupný");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Odeslat objednávku";
  }
});

function showErrors(errors) {
  Object.entries(errors).forEach(([field, messages]) => {
    const errorEl = document.querySelector(`[data-error-for="${field}"]`);
    if (errorEl && messages?.length) {
      errorEl.textContent = messages[0];
    }
  });
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((el) => {
    el.textContent = "";
  });
}

updateCartCount();
