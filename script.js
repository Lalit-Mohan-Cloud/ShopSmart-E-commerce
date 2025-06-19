let products = [
  { id: 1, name: "Smartphone", price: 699, image: "https://via.placeholder.com/250x200?text=Smartphone", category: "Electronics" },
  { id: 2, name: "Laptop", price: 999, image: "https://via.placeholder.com/250x200?text=Laptop", category: "Electronics" },
  { id: 3, name: "Headphones", price: 199, image: "https://via.placeholder.com/250x200?text=Headphones", category: "Accessories" }
];

const cart = [];

function renderProducts(filtered = products) {
  const container = document.getElementById("product-container");
  container.innerHTML = '';
  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(product) {
  cart.push(product);
  document.getElementById("cart-count").textContent = cart.length;
  showToast(`${product.name} added to cart!`);
}

function showCart() {
  const cartEl = document.getElementById("cart");
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
    cartItems.appendChild(li);
    total += item.price;
  });

  document.getElementById("total").textContent = total.toFixed(2);
  cartEl.style.display = "block";
}

function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById("cart-count").textContent = cart.length;
  showCart();
}

function filterCategory(category) {
  if (category === 'All') {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

function searchProducts() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

function checkout() {
  alert("Checkout feature coming soon!");
}

// Admin Feature: Add a new product
function addNewProduct(name, price, image, category) {
  const id = products.length + 1;
  products.push({ id, name, price, image, category });
  renderProducts();
  showToast(`${name} added to store!`);
}

function toggleSearch() {
  document.querySelector('.search-box').classList.toggle('active');
}

// Render on Load
renderProducts();
