const CATEGORIES = [
  "Casa e decoração", "Beleza e cuidados pessoais", "Eletrônicos",
  "Moda e acessórios", "Cozinha", "Organização", "Ofertas variadas"
];

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const clearSearch = document.querySelector("#clear-search");
const categorySelect = document.querySelector("#category-select");
const chips = document.querySelector("#category-chips");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const noResults = document.querySelector("#no-results");
let allProducts = [];
let activeCategory = "Todas";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}
function validHttpUrl(value) {
  try { const u = new URL(value); return u.protocol === "https:" || u.protocol === "http:"; }
  catch { return false; }
}
function formatPrice(value) {
  if (value === "" || value === null || value === undefined) return "";
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return "";
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function renderCategoryControls() {
  const cats = ["Todas", ...CATEGORIES];
  categorySelect.innerHTML = cats.map(c => `<option value="${escapeHtml(c)}">${c === "Todas" ? "Todas as categorias" : escapeHtml(c)}</option>`).join("");
  chips.innerHTML = cats.map(c => `<button class="chip ${c === activeCategory ? "active" : ""}" data-category="${escapeHtml(c)}" type="button">${c === "Todas" ? "✦ Todos os achadinhos" : escapeHtml(c)}</button>`).join("");
}
function cardMarkup(p) {
  const price = formatPrice(p.price);
  const oldPrice = formatPrice(p.oldPrice);
  const discount = (p.oldPrice && p.price && Number(p.oldPrice) > Number(p.price))
    ? `${Math.round((1 - Number(p.price) / Number(p.oldPrice)) * 100)}% OFF` : "";
  const image =(validHttpUrl(p.image) || String(p.image || "").startsWith("data:image/")) '<img class="product-image" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><div class="product-placeholder" hidden>✦</div>`
    : `<div class="product-placeholder" aria-hidden="true">✦</div>`;
  return `<article class="product-card">
    <div class="product-image-wrap">${image}${p.badge ? `<span class="product-badge">${escapeHtml(p.badge)}</span>` : ""}</div>
    <div class="product-info">
      <span class="product-category">${escapeHtml(p.category || "Ofertas variadas")}</span>
      <h3 class="product-name">${escapeHtml(p.name)}</h3>
      ${p.description ? `<p class="product-description">${escapeHtml(p.description)}</p>` : ""}
      <div class="price-row">${oldPrice ? `<span class="old-price">${oldPrice}</span>` : ""}${price ? `<span class="current-price">${price}</span>` : ""}${discount ? `<span class="discount">${discount}</span>` : ""}</div>
      <a class="offer-button" href="${escapeHtml(p.link)}" target="_blank" rel="sponsored nofollow noopener noreferrer">Ver oferta <span aria-hidden="true">↗</span></a>
    </div>
  </article>`;
}
function render() {
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  clearSearch.hidden = !query;
  const products = allProducts.filter(p => {
    const matchesCategory = activeCategory === "Todas" || p.category === activeCategory;
    const searchable = `${p.name || ""} ${p.category || ""} ${p.description || ""} ${p.badge || ""}`.toLocaleLowerCase("pt-BR");
    return matchesCategory && searchable.includes(query);
  });
  grid.innerHTML = products.map(cardMarkup).join("");
  const hasAny = allProducts.length > 0;
  emptyState.hidden = hasAny;
  noResults.hidden = !hasAny || products.length > 0;
  grid.hidden = products.length === 0;
  resultCount.textContent = `${products.length} ${products.length === 1 ? "achadinho" : "achadinhos"}`;
  chips.querySelectorAll(".chip").forEach(btn => btn.classList.toggle("active", btn.dataset.category === activeCategory));
  categorySelect.value = activeCategory;
}
async function loadProducts() {
  try {
    const response = await fetch("products.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Não foi possível carregar products.json");
    const data = await response.json();
    allProducts = Array.isArray(data) ? data.filter(p => p && p.name && p.category && validHttpUrl(p.link)) : [];
  } catch (error) {
    allProducts = [];
    console.error(error);
  }
  renderCategoryControls();
  render();
}
searchInput.addEventListener("input", render);
clearSearch.addEventListener("click", () => { searchInput.value = ""; render(); searchInput.focus(); });
categorySelect.addEventListener("change", () => { activeCategory = categorySelect.value; render(); });
chips.addEventListener("click", e => { const btn = e.target.closest("[data-category]"); if (!btn) return; activeCategory = btn.dataset.category; render(); });
document.querySelector("#reset-filters").addEventListener("click", () => { searchInput.value = ""; activeCategory = "Todas"; render(); });
document.querySelector("#year").textContent = new Date().getFullYear();
// Replace with the public Instagram profile URL for Garimpei.
const INSTAGRAM_URL = "https://www.instagram.com/";
document.querySelector("#instagram-link").href = INSTAGRAM_URL;
loadProducts();