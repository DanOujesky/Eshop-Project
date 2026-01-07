import { orderSchema } from "../shared/validation/orderSchema.js";

const cartCountEl = document.getElementById("cart-count");
if (cartCountEl) {
  updateCartCount();
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalQty;
}

const form = document.getElementById("orderForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

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
    return;
  }

  form.submit();
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
