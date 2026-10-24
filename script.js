/* =========================================================
   KREZ STORE — script.js
   Демонстрационная логика магазина.
   Данные хранятся локально (localStorage), на сервер ничего
   не отправляется. Реальная оплата не подключена.
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. ДАННЫЕ ТОВАРОВ
     Меняйте цены, названия, изображения — всё здесь.
     --------------------------------------------------------- */
  const PRODUCTS = [
    {
      id: "p01",
      title: "Чохол Silicone Soft",
      category: "Силиконові чохли",
      price: 249,
      oldPrice: null,
	  stock:0,
      isNew: false,
      isSale: false,
      image: "images/case-silicone.jpg",
      brand: "Apple",
      models: ["iPhone 13", "iPhone 14", "iPhone 15"],
      colors: [
        { name: "Чорний", hex: "#111111" },
        { name: "Білий", hex: "#F5F5F5" },
        { name: "Лайм", hex: "#C6FF00" }
      ],
      description:
        "М'який силіконовий чохол із приємною на дотик текстурою. Захищає корпус від подряпин та дрібних ударів. Внутрішня підкладка з мікрофібри."
    },
    {
      id: "p02",
      title: "Чохол Clear Transparent",
      category: "Прозорі чохли",
      price: 199,
      oldPrice: null,
	  stock: 0,
      isNew: true,
      isSale: false,
      image: "images/case-clear.jpg",
      brand: "Samsung",
      models: ["Galaxy S23", "Galaxy S24", "Galaxy A54"],
      colors: [
        { name: "Прозорий", hex: "#E5E5E5" }
      ],
      description:
        "Прозорий чохол, який показує оригінальний дизайн смартфона. Стійкий до пожовтіння, з м'якими кутами та захистом камери."
    },
    {
      id: "p03",
      title: "Чохол Armor Shockproof",
      category: "Протиударні чохли",
      price: 399,
      oldPrice: 549,
	  stock: 0,
      isNew: false,
      isSale: true,
      image: "images/case-armor.jpg",
      brand: "Xiaomi",
      models: ["Redmi Note 12", "Redmi Note 13", "Xiaomi 13"],
      colors: [
        { name: "Чорний", hex: "#111111" },
        { name: "Сірий", hex: "#555555" }
      ],
      description:
        "Протиударний чохол із посиленими кутами та жорстким задником. Тестований на падіння з висоти до 1,5 м (демонстраційні дані)."
    },
    {
      id: "p04",
      title: "Чохол Matte Finish",
      category: "Матові чохли",
      price: 289,
	  stock: 0,
      oldPrice: null,
      isNew: false,
      isSale: false,
      image: "images/case-matte.jpg",
      brand: "Apple",
      models: ["iPhone 14", "iPhone 15", "iPhone 15 Pro"],
      colors: [
        { name: "Графіт", hex: "#2E2E2E" },
        { name: "Хакі", hex: "#5A6B3A" }
      ],
      description:
        "Матове покриття приємне на дотик і не збирає відбитки пальців. Тонкий профіль, бездротова зарядка сумісна."
    },
    {
      id: "p05",
      title: "Захисне скло 9H",
      category: "Захисні стекла",
      price: 199,
	  stock: 0,
      oldPrice: null,
      isNew: false,
      isSale: false,
      image: "images/glass-protect.jpg",
      brand: "Samsung",
      models: ["Galaxy S23", "Galaxy S24", "Galaxy A54"],
      colors: [
        { name: "Прозорий", hex: "#E5E5E5" }
      ],
      description:
        "Захисне скло товщиною 0,33 мм із твердістю 9H. Олеофобне покриття, чіткість і точність відгуку збережено."
    },
    {
      id: "p06",
      title: "Кабель USB-C Braided",
      category: "Кабелі та аксесуари",
      price: 189,
	  stock: 0,
      oldPrice: null,
      isNew: true,
      isSale: false,
      image: "images/cable-usb.jpg",
      brand: "Xiaomi",
      models: ["Універсальний (USB-C)"],
      colors: [
        { name: "Чорний", hex: "#111111" }
      ],
      description:
        "Кабель USB-C із нейлоновою опліткою. Довжина 1 м, стійкий до зламів. Демонстраційні характеристики, не є специфікацією постачальника."
		},
    {
      id: "p07",
      title: "Чохол Lime Pop",
      category: "Силиконові чохли",
      price: 279,
	  stock: 0,
      oldPrice: null,
      isNew: true,
      isSale: false,
      image: "images/case-lime.jpg",
      brand: "Apple",
      models: ["iPhone 14", "iPhone 15"],
      colors: [
        { name: "Лайм", hex: "#C6FF00" },
        { name: "Чорний", hex: "#111111" }
      ],
      description:
        "Яскравий лаймовий чохол для тих, хто хоче виділитися. М'який на дотик матеріал із тонким профілем."
    },
    {
      id: "p08",
      title: "Чохол Black Out",
      category: "Матові чохли",
      price: 319,
	  stock: 0,
      oldPrice: null,
      isNew: false,
      isSale: false,
      image: "images/case-black.jpg",
      brand: "Samsung",
      models: ["Galaxy S23", "Galaxy S24"],
      colors: [
        { name: "Чорний", hex: "#111111" }
      ],
      description:
        "Мінімалістичний чорний чохол із м'яким матовим покриттям. Захист камери, бездротова зарядка підтримується."
    },
    {
      id: "p09",
      title: "Чохол Graffiti Street",
      category: "Матові чохли",
      price: 349,
      oldPrice: 449,
	  stock: 0,
      isNew: false,
      isSale: true,
      image: "images/case-graffiti.jpg",
      brand: "Apple",
      models: ["iPhone 13", "iPhone 14", "iPhone 15"],
      colors: [
        { name: "Мікс", hex: "#7A4DFF" }
      ],
      description:
        "Streetwear-принт у стилі bubble graffiti. Якісний друк, стійкий до стирання. Демонстраційний дизайн."
    },
    {
      id: "p10",
      title: "Кабель Type-C Fast",
      category: "Кабелі та аксесуари",
      price: 229,
	  stock: 0,
      oldPrice: null,
      isNew: false,
      isSale: false,
      image: "images/cable-type-c.jpg",
      brand: "Xiaomi",
      models: ["Універсальний (USB-C)"],
      colors: [
        { name: "Сірий", hex: "#666666" },
        { name: "Чорний", hex: "#111111" }
      ],
      description:
        "Швидкісний кабель USB-C для зарядки та передачі даних. Довжина 1,2 м. Демонстраційні параметри."
    },
    {
      id: "p11",
      title: "Скло Privacy Filter",
      category: "Захисні стекла",
      price: 249,
	  stock: 0,
      oldPrice: null,
      isNew: true,
      isSale: false,
      image: "images/glass-privacy.jpg",
      brand: "Samsung",
      models: ["Galaxy S23", "Galaxy S24"],
      colors: [
        { name: "Прозорий", hex: "#E5E5E5" }
      ],
      description:
        "Захисне скло з ефектом приватності: зображення видно лише під кутом зору власника. Твердість 9H."
    },
    {
      id: "p12",
      title: "Чохол MagSafe Clear",
      category: "Прозорі чохли",
      price: 429,
	  stock: 0,
      oldPrice: null,
      isNew: true,
      isSale: false,
      image: "images/case-magsafe.jpg",
      brand: "Apple",
      models: ["iPhone 14", "iPhone 15", "iPhone 15 Pro"],
      colors: [
        { name: "Прозорий", hex: "#E5E5E5" }
      ],
      description:
        "Прозорий чохол із вбудованим кільцем MagSafe. Сумісний із бездротовою зарядкою та аксесуарами MagSafe."
    }
  ];

  /* ---------------------------------------------------------
     2. ХРАНИЛИЩА
     --------------------------------------------------------- */
  const STORAGE_FAV = "krez_fav_v1";
  const STORAGE_CART = "krez_cart_v1";
  const MAKE_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/29236787/49y7rgt/"
  const state = {
    favorites: loadJSON(STORAGE_FAV, []),
    cart: loadJSON(STORAGE_CART, []),
    filters: {
      search: "",
      category: "",
      brand: "",
      model: "",
      price: "",
      sort: "default"
    }
  };

  /* ---------------------------------------------------------
     3. УТИЛИТЫ
     --------------------------------------------------------- */
  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // localStorage может быть недоступен (приватный режим)
    }
  }
  function $(id) {
    return document.getElementById(id);
  }

  function formatPrice(value) {
    return new Intl.NumberFormat("uk-UA").format(value) + " ₴";
  }

  function el(tag, opts) {
    const node = document.createElement(tag);
    if (!opts) return node;
    if (opts.className) node.className = opts.className;
    if (opts.text != null) node.textContent = String(opts.text);
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(function (k) {
        const v = opts.attrs[k];
        if (v === true) node.setAttribute(k, "");
        else if (v !== false && v != null) node.setAttribute(k, v);
      });
    }
    if (opts.dataset) {
      Object.keys(opts.dataset).forEach(function (k) {
        node.dataset[k] = opts.dataset[k];
      });
    }
    if (opts.children) {
      opts.children.forEach(function (child) {
        if (child) node.appendChild(child);
      });
    }
    if (opts.onClick) node.addEventListener("click", opts.onClick);
    return node;
  }

  function getProduct(id) {
    return PRODUCTS.find(function (p) { return p.id === id; });
  }

  function unique(arr) {
    return arr.filter(function (v, i) { return arr.indexOf(v) === i; });
  }

  function allCategories() {
    return unique(PRODUCTS.map(function (p) { return p.category; })).sort();
  }

  function allBrands() {
    return unique(PRODUCTS.map(function (p) { return p.brand; })).sort();
  }

  function modelsForBrand(brand) {
    if (!brand) return [];
    const models = [];
    PRODUCTS.forEach(function (p) {
      if (p.brand === brand) {
        p.models.forEach(function (m) {
          if (!models.includes(m)) models.push(m);
        });
      }
    });
    return models.sort();
  }

  function toast(message) {
    const t = $("toast");
    if (!t) return;
    t.textContent = message;
    t.classList.add("is-visible");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      t.classList.remove("is-visible");
    }, 2200);
  }

  /* ---------------------------------------------------------
     4. ЛОГОТИП: img + фолбэк
     --------------------------------------------------------- */
  function initLogo() {
    const img = $("logoImg");
    const text = $("logoText");
    if (!img || !text) return;

    img.setAttribute("hidden", "");
    text.removeAttribute("aria-hidden");

    img.addEventListener("load", function () {
      if (img.naturalWidth > 0) {
        img.removeAttribute("hidden");
        text.setAttribute("hidden", "");
        text.setAttribute("aria-hidden", "true");
      }
    });
    img.addEventListener("error", function () {
      img.setAttribute("hidden", "");
      text.removeAttribute("aria-hidden");
    });
  }

  /* ---------------------------------------------------------
     5. РЕНДЕР КАРТОЧКИ ТОВАРА
     --------------------------------------------------------- */
  function createCard(product) {
    const card = el("article", { className: "card" });

    const media = el("div", { className: "card-media" });
    const img = el("img", {
      attrs: {
        src: product.image,
        alt: product.title,
        loading: "lazy"
      }
    });
    img.addEventListener("error", function () {
      img.style.display = "none";
      if (!media.querySelector(".img-fallback")) {
        media.appendChild(el("div", { className: "img-fallback", text: "KREZ STORE" }));
      }
    });
    media.appendChild(img);

const tags = el("div", { className: "tags" });
if (product.isNew) tags.appendChild(el("span", { className: "tag tag--new", text: "Новинка" }));
if (product.isSale) tags.appendChild(el("span", { className: "tag tag--sale", text: "Знижка" }));
// НЕТ В НАЛИЧИИ — серый бейдж
if (!product.stock) tags.appendChild(el("span", { className: "tag tag--out", text: "Немає" }));
if (tags.children.length) media.appendChild(tags);

    const isFav = state.favorites.indexOf(product.id) !== -1;
    const favBtn = el("button", {
	className: "card-fav" + (isFav ? " is-active" : ""),
      attrs: { type: "button", "aria-label": isFav ? "Прибрати з обраного" : "Додати в обране" },
      text: "♥",
      onClick: function (e) {
        e.stopPropagation();
        toggleFavorite(product.id);
      }
    });
    media.appendChild(favBtn);

    const openBtn = el("button", {
      className: "card-open",
      attrs: { type: "button", "aria-label": "Відкрити товар: " + product.title },
      onClick: function () { openProductModal(product.id); }
    });
    media.appendChild(openBtn);

    card.appendChild(media);

    const body = el("div", { className: "card-body" });
    body.appendChild(el("span", { className: "card-cat", text: product.category }));
    body.appendChild(el("h3", { className: "card-title", text: product.title }));

    const prices = el("div", { className: "card-prices" });
    prices.appendChild(el("span", { className: "price", text: formatPrice(product.price) }));
    if (product.oldPrice && product.oldPrice > product.price) {
      prices.appendChild(el("span", { className: "price-old", text: formatPrice(product.oldPrice) }));
    }
    body.appendChild(prices);

    const actions = el("div", { className: "card-actions" });
    actions.appendChild(el("button", {
      className: "btn btn--ghost btn--sm",
      attrs: { type: "button" },
      text: "Детальніше",
      onClick: function () { openProductModal(product.id); }
    }));
    actions.appendChild(el("button", {
      className: "btn btn--lime btn--sm",
      attrs: { type: "button" },
      text: "У кошик",
      onClick: function () { quickAdd(product.id); }
    }));
    body.appendChild(actions);

    card.appendChild(body);
    return card;
  }

  function quickAdd(productId) {
    const p = getProduct(productId);
    if (!p) return;
    if (p.models.length > 1 || p.colors.length > 1) {
      openProductModal(productId);
      return;
    }
    addToCart({
      productId: p.id,
      model: p.models[0] || "",
      color: p.colors[0] ? p.colors[0].name : ""
    });
  }

  /* ---------------------------------------------------------
     6. ФИЛЬТРАЦИЯ И СОРТИРОВКА
     --------------------------------------------------------- */
  function applyFilters() {
    const f = state.filters;
    let list = PRODUCTS.slice();

    if (f.search) {
      const q = f.search.toLowerCase().trim();
      list = list.filter(function (p) {
        return p.title.toLowerCase().indexOf(q) !== -1 ||
               p.category.toLowerCase().indexOf(q) !== -1;
      });
    }
    if (f.category) list = list.filter(function (p) { return p.category === f.category; });
    if (f.brand) list = list.filter(function (p) { return p.brand === f.brand; });
    if (f.model) list = list.filter(function (p) { return p.models.indexOf(f.model) !== -1; });

    if (f.price) {
      const parts = f.price.split("-").map(Number);
      const min = parts[0];
      const max = parts[1];
      list = list.filter(function (p) { return p.price >= min && p.price <= max; });
    }

    if (f.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
    else if (f.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
    else if (f.sort === "new") {
      list.sort(function (a, b) {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      });
    }
    return list;
  }

  function renderCatalog() {
    const grid = $("productsGrid");
    const empty = $("catalogEmpty");
    const status = $("catalogStatus");
    if (!grid) return;
    grid.textContent = "";

    const list = applyFilters();
    if (status) status.textContent = "Знайдено товарів: " + list.length;
    if (!list.length) {
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;

    const frag = document.createDocumentFragment();
    list.forEach(function (p) { frag.appendChild(createCard(p)); });
    grid.appendChild(frag);
  }
  /* ---------------------------------------------------------
     7. НОВИНКИ И СКИДКИ
     --------------------------------------------------------- */
  function renderNew() {
    const grid = $("newGrid");
    const empty = $("newEmpty");
    if (!grid) return;
    grid.textContent = "";
    const list = PRODUCTS.filter(function (p) { return p.isNew; });
    if (!list.length) { if (empty) empty.hidden = false; return; }
    if (empty) empty.hidden = true;
    const frag = document.createDocumentFragment();
    list.forEach(function (p) { frag.appendChild(createCard(p)); });
    grid.appendChild(frag);
  }

  function renderSale() {
    const grid = $("saleGrid");
    const empty = $("saleEmpty");
    if (!grid) return;
    grid.textContent = "";
    const list = PRODUCTS.filter(function (p) { return p.isSale || (p.oldPrice && p.oldPrice > p.price); });
    if (!list.length) { if (empty) empty.hidden = false; return; }
    if (empty) empty.hidden = true;
    const frag = document.createDocumentFragment();
    list.forEach(function (p) { frag.appendChild(createCard(p)); });
    grid.appendChild(frag);
  }

  /* ---------------------------------------------------------
     8. ИЗБРАННОЕ
     --------------------------------------------------------- */
  function toggleFavorite(productId) {
    const idx = state.favorites.indexOf(productId);
    if (idx === -1) {
      state.favorites.push(productId);
      toast("Додано в обране");
    } else {
      state.favorites.splice(idx, 1);
      toast("Прибрано з обраного");
    }
    saveJSON(STORAGE_FAV, state.favorites);
    renderFavorites();
    renderFavDrawer();
    updateCounters();
    renderCatalog();
    renderNew();
    renderSale();
  }

  function renderFavorites() {
    const grid = $("favGrid");
    const empty = $("favEmpty");
    if (!grid) return;
    grid.textContent = "";
    const list = state.favorites.map(getProduct).filter(Boolean);

    if (!list.length) {
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    const frag = document.createDocumentFragment();
    list.forEach(function (p) { frag.appendChild(createCard(p)); });
    grid.appendChild(frag);
  }

  /* ---------------------------------------------------------
     9. КОРЗИНА
     --------------------------------------------------------- */
  function cartKey(item) {
    return item.productId + "|" + item.model + "|" + item.color;
  }

  function addToCart(item) {
    const p = getProduct(item.productId);
    if (!p) return;
    if (!item.model) { toast("Оберіть модель"); return; }
    if (!item.color) { toast("Оберіть колір"); return; }

    const key = cartKey(item);
    const existing = state.cart.find(function (c) { return cartKey(c) === key; });
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({
        productId: item.productId,
        model: item.model,
        color: item.color,
        qty: 1
      });
    }
    saveJSON(STORAGE_CART, state.cart);
    renderCart();
    updateCounters();
    toast("Додано в кошик");
  }

  function changeQty(item, delta) {
    const key = cartKey(item);
    const target = state.cart.find(function (c) { return cartKey(c) === key; });
    if (!target) return;
    target.qty += delta;
    if (target.qty <= 0) {
      state.cart = state.cart.filter(function (c) { return cartKey(c) !== key; });
    }
    saveJSON(STORAGE_CART, state.cart);
    renderCart();
    updateCounters();
  }

  function removeFromCart(item) {
    const key = cartKey(item);
    state.cart = state.cart.filter(function (c) { return cartKey(c) !== key; });
    saveJSON(STORAGE_CART, state.cart);
    renderCart();
    updateCounters();
  }

  function cartTotal() {
    return state.cart.reduce(function (sum, item) {
      const p = getProduct(item.productId);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  }

  function renderCart() {
    const body = $("cartBody");
    const totalEl = $("cartTotal");
    if (!body) return;
    body.textContent = "";
	if (!state.cart.length) {
      body.appendChild(el("p", { className: "empty-message", text: "Кошик порожній." }));
      if (totalEl) totalEl.textContent = formatPrice(0);
      return;
    }

    const frag = document.createDocumentFragment();
    state.cart.forEach(function (item) {
      const p = getProduct(item.productId);
      if (!p) return;

      const row = el("div", { className: "cart-item" });

      const thumb = el("div", { className: "cart-thumb" });
      const img = el("img", { attrs: { src: p.image, alt: p.title } });
      img.addEventListener("error", function () { img.style.display = "none"; });
      thumb.appendChild(img);
      row.appendChild(thumb);

      const info = el("div", { className: "cart-info" });
      info.appendChild(el("strong", { text: p.title }));
      info.appendChild(el("small", { text: "Модель: " + item.model }));
      info.appendChild(el("small", { text: "Колір: " + item.color }));
      info.appendChild(el("div", { className: "price-small", text: formatPrice(p.price * item.qty) }));

      const qty = el("div", { className: "cart-qty" });
      qty.appendChild(el("button", {
        className: "qty-btn",
        attrs: { type: "button", "aria-label": "Зменшити кількість" },
        text: "−",
        onClick: function () { changeQty(item, -1); }
      }));
      qty.appendChild(el("span", { text: String(item.qty) }));
      qty.appendChild(el("button", {
        className: "qty-btn",
        attrs: { type: "button", "aria-label": "Збільшити кількість" },
        text: "+",
        onClick: function () { changeQty(item, 1); }
      }));
      info.appendChild(qty);
      row.appendChild(info);

      row.appendChild(el("button", {
        className: "cart-remove",
        attrs: { type: "button", "aria-label": "Видалити товар" },
        text: "✕",
        onClick: function () { removeFromCart(item); }
      }));

      frag.appendChild(row);
    });
    body.appendChild(frag);

    if (totalEl) totalEl.textContent = formatPrice(cartTotal());
  }

  /* ---------------------------------------------------------
     10. СЧЁТЧИКИ
     --------------------------------------------------------- */
  function updateCounters() {
    const favCount = $("favCount");
    const cartCount = $("cartCount");
    if (favCount) favCount.textContent = String(state.favorites.length);
    const totalQty = state.cart.reduce(function (s, c) { return s + c.qty; }, 0);
    if (cartCount) cartCount.textContent = String(totalQty);
  }

  /* ---------------------------------------------------------
     11. МОДАЛКА ТОВАРА
     --------------------------------------------------------- */
  let lastFocused = null;

  function openProductModal(productId) {
    const p = getProduct(productId);
    if (!p) return;

    const body = $("productModalBody");
    const modal = $("productModal");
    if (!body || !modal) return;

    body.textContent = "";

    const wrap = el("div", { className: "product-detail" });

    const media = el("div", { className: "product-detail-media" });
    const img = el("img", { attrs: { src: p.image, alt: p.title } });
    img.addEventListener("error", function () {
      img.style.display = "none";
      if (!media.querySelector(".img-fallback")) {
        media.appendChild(el("div", { className: "img-fallback", text: "KREZ STORE" }));
      }
    });
    media.appendChild(img);
    wrap.appendChild(media);

    const info = el("div", { className: "product-detail-info" });
    info.appendChild(el("p", { className: "product-detail-cat", text: p.category }));
    info.appendChild(el("h2", { text: p.title, attrs: { id: "productModalTitle" } }));

    const priceRow = el("div", { className: "product-detail-price" });
    priceRow.appendChild(el("span", { className: "price", text: formatPrice(p.price) }));
    if (p.oldPrice && p.oldPrice > p.price) {
      priceRow.appendChild(el("span", { className: "price-old", text: formatPrice(p.oldPrice) }));
    }
    info.appendChild(priceRow);
	info.appendChild(el("p", { className: "product-detail-desc", text: p.description }));

    const modelField = el("div", { className: "detail-field" });
    const modelId = "model_" + p.id;
    modelField.appendChild(el("label", { text: "Модель телефону", attrs: { for: modelId } }));
    const modelSelect = el("select", { attrs: { id: modelId, required: "" } });
    modelSelect.appendChild(el("option", { text: "Оберіть модель", attrs: { value: "" } }));
    p.models.forEach(function (m) {
      modelSelect.appendChild(el("option", { text: m, attrs: { value: m } }));
    });
    modelField.appendChild(modelSelect);
    info.appendChild(modelField);

    const colorField = el("div", { className: "detail-field" });
    colorField.appendChild(el("label", { text: "Колір" }));
    const colorsWrap = el("div", { className: "colors" });

    let selectedColor = "";
    p.colors.forEach(function (c, i) {
      const radio = el("label", { className: "color-radio" });
      const input = el("input", {
        attrs: { type: "radio", name: "color_" + p.id, value: c.name, id: "color_" + p.id + "_" + i }
      });
      input.addEventListener("change", function () { selectedColor = c.name; });
      const span = el("span", { text: c.name });
      span.style.setProperty("--swatch", c.hex);
      radio.appendChild(input);
      radio.appendChild(span);
      colorsWrap.appendChild(radio);
    });
    colorField.appendChild(colorsWrap);
    info.appendChild(colorField);

    const actions = el("div", { className: "product-detail-actions" });
    actions.appendChild(el("button", {
      className: "btn btn--lime",
      attrs: { type: "button" },
      text: "Додати в кошик",
      onClick: function () {
        const model = modelSelect.value;
        if (!model) { toast("Оберіть модель телефону"); modelSelect.focus(); return; }
        if (p.colors.length > 1 && !selectedColor) { toast("Оберіть колір"); return; }
        const color = selectedColor || (p.colors[0] ? p.colors[0].name : "");
        addToCart({ productId: p.id, model: model, color: color });
        closeAllModals();
      }
    }));

    const isFav = state.favorites.indexOf(p.id) !== -1;
    const favBtn = el("button", {
      className: "btn btn--ghost",
      attrs: { type: "button" },
      text: isFav ? "♥ В обраному" : "♡ В обране",
      onClick: function () {
        toggleFavorite(p.id);
        const nowFav = state.favorites.indexOf(p.id) !== -1;
        favBtn.textContent = nowFav ? "♥ В обраному" : "♡ В обране";
      }
    });
    actions.appendChild(favBtn);
    info.appendChild(actions);

    wrap.appendChild(info);
    body.appendChild(wrap);

    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    setTimeout(function () {
      const first = modal.querySelector("select, input, button");
      if (first) first.focus();
    }, 50);
  }

  function closeAllModals() {
    document.querySelectorAll(".modal.is-open").forEach(function (m) {
      m.classList.remove("is-open");
      m.setAttribute("aria-hidden", "true");
    });
    document.body.classList.remove("no-scroll");
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  /* ---------------------------------------------------------
     12. ФОРМА ОФОРМЛЕНИЯ
     --------------------------------------------------------- */
  function initCheckoutForm() {
    const form = $("checkoutForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors(form);
      let valid = true;

      const name = form.querySelector("#cf-name");
      const phone = form.querySelector("#cf-phone");
      const city = form.querySelector("#cf-city");
      const delivery = form.querySelector("#cf-delivery");
	  if (!name.value.trim() || name.value.trim().length < 2) {
        setError(name, "Вкажіть ім'я (мін. 2 символи)");
        valid = false;
      }
      if (!phone.value.trim() || phone.value.trim().length < 6) {
        setError(phone, "Вкажіть коректний телефон");
        valid = false;
      }
      if (!city.value.trim()) {
        setError(city, "Вкажіть населений пункт");
        valid = false;
      }
      if (!delivery.value) {
        setError(delivery, "Оберіть спосіб доставки");
        valid = false;
      }

      if (!valid) return;

      // ⚠️ ДЕМО: реальная отправка на сервер не выполняется
      // Структура для будущего подключения сервера:
      // const payload = { customer: {...}, items: state.cart, total: cartTotal() };
      // await fetch('/api/orders', { method: 'POST', ... })

      const successEl = $("checkoutSuccess");
      if (successEl) successEl.hidden = false;

      state.cart = [];
      saveJSON(STORAGE_CART, state.cart);
      renderCart();
      updateCounters();

      form.reset();
      toast("Демо-замовлення оформлено");
    });
  }

  function setError(input, message) {
    const field = input.closest(".form-field");
    if (!field) return;
    field.classList.add("has-error");
    const errEl = field.querySelector(".error");
    if (errEl) errEl.textContent = message;
    input.setAttribute("aria-invalid", "true");
  }

  function clearErrors(form) {
    form.querySelectorAll(".form-field.has-error").forEach(function (f) {
      f.classList.remove("has-error");
    });
    form.querySelectorAll(".error").forEach(function (e) { e.textContent = ""; });
    form.querySelectorAll("[aria-invalid]").forEach(function (i) {
      i.removeAttribute("aria-invalid");
    });
    const successEl = $("checkoutSuccess");
    if (successEl) successEl.hidden = true;
  }

  /* ---------------------------------------------------------
     13. DRAWER (КОРЗИНА / ИЗБРАННОЕ)
     --------------------------------------------------------- */
  function openDrawer(id) {
    const d = $(id);
    if (!d) return;
    d.classList.add("is-open");
    d.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }
  function closeDrawer(d) {
    d.classList.remove("is-open");
    d.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function renderFavDrawer() {
    const body = $("favDrawerBody");
    if (!body) return;
    body.textContent = "";
    const list = state.favorites.map(getProduct).filter(Boolean);
    if (!list.length) {
      body.appendChild(el("p", { className: "empty-message", text: "Список обраного порожній." }));
      return;
    }
    list.forEach(function (p) {
      const row = el("div", { className: "cart-item" });
      const thumb = el("div", { className: "cart-thumb" });
      const img = el("img", { attrs: { src: p.image, alt: p.title } });
      img.addEventListener("error", function () { img.style.display = "none"; });
      thumb.appendChild(img);
      row.appendChild(thumb);

      const info = el("div", { className: "cart-info" });
      info.appendChild(el("strong", { text: p.title }));
      info.appendChild(el("div", { className: "price-small", text: formatPrice(p.price) }));
      row.appendChild(info);

      row.appendChild(el("button", {
        className: "cart-remove",
        attrs: { type: "button", "aria-label": "Прибрати з обраного" },
        text: "✕",
        onClick: function () { toggleFavorite(p.id); }
      }));
      body.appendChild(row);
    });
  }

  /* ---------------------------------------------------------
     14. ИНИЦИАЛИЗАЦИЯ ФИЛЬТРОВ
     --------------------------------------------------------- */
  function initFilters() {
    const catSel = $("filterCategory");
    const brandSel = $("filterBrand");
    const modelSel = $("filterModel");
    const priceSel = $("filterPrice");
    const sortSel = $("sortSelect");
    const resetBtn = $("resetFilters");
	if (catSel) {
      allCategories().forEach(function (c) {
        catSel.appendChild(el("option", { text: c, attrs: { value: c } }));
      });
      catSel.addEventListener("change", function () {
        state.filters.category = catSel.value;
        renderCatalog();
      });
    }

    if (brandSel) {
      allBrands().forEach(function (b) {
        brandSel.appendChild(el("option", { text: b, attrs: { value: b } }));
      });
      brandSel.addEventListener("change", function () {
        state.filters.brand = brandSel.value;
        state.filters.model = "";
        if (modelSel) {
          modelSel.textContent = "";
          const models = modelsForBrand(brandSel.value);
          if (!brandSel.value) {
            modelSel.disabled = true;
            modelSel.appendChild(el("option", { text: "Спочатку оберіть бренд", attrs: { value: "" } }));
          } else {
            modelSel.disabled = false;
            modelSel.appendChild(el("option", { text: "Усі моделі", attrs: { value: "" } }));
            models.forEach(function (m) {
              modelSel.appendChild(el("option", { text: m, attrs: { value: m } }));
            });
          }
        }
        renderCatalog();
      });
    }

    if (modelSel) {
      modelSel.addEventListener("change", function () {
        state.filters.model = modelSel.value;
        renderCatalog();
      });
    }

    if (priceSel) {
      priceSel.addEventListener("change", function () {
        state.filters.price = priceSel.value;
        renderCatalog();
      });
    }

    if (sortSel) {
      sortSel.addEventListener("change", function () {
        state.filters.sort = sortSel.value;
        renderCatalog();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        state.filters = { search: "", category: "", brand: "", model: "", price: "", sort: "default" };
        if (catSel) catSel.value = "";
        if (brandSel) brandSel.value = "";
        if (modelSel) {
          modelSel.textContent = "";
          modelSel.disabled = true;
          modelSel.appendChild(el("option", { text: "Спочатку оберіть бренд", attrs: { value: "" } }));
        }
        if (priceSel) priceSel.value = "";
        if (sortSel) sortSel.value = "default";
        const sd = $("searchDesktop");
        const sm = $("searchMobile");
        if (sd) sd.value = "";
        if (sm) sm.value = "";
        renderCatalog();
        toast("Фільтри скинуто");
      });
    }
  }

  function initSearch() {
    const sd = $("searchDesktop");
    const sm = $("searchMobile");
    function onInput(v) {
      state.filters.search = v;
      renderCatalog();
    }
    if (sd) sd.addEventListener("input", function () {
      onInput(sd.value);
      if (sm) sm.value = sd.value;
    });
    if (sm) sm.addEventListener("input", function () {
      onInput(sm.value);
      if (sd) sd.value = sm.value;
    });
  }

  /* ---------------------------------------------------------
     15. МОБИЛЬНОЕ МЕНЮ
     --------------------------------------------------------- */
  function initBurger() {
    const burger = $("burgerBtn");
    const nav = $("mobileNav");
    if (!burger || !nav) return;

    burger.addEventListener("click", function () {
      const isOpen = !nav.hidden;
      nav.hidden = isOpen;
      burger.setAttribute("aria-expanded", String(!isOpen));
    });

    nav.addEventListener("click", function (e) {
      const link = e.target.closest("a");
      if (link) {
        nav.hidden = true;
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------------------------------------------------------
     16. ОБРАБОТЧИКИ КНОПОК ШАПКИ / DRAWER / MODAL
     --------------------------------------------------------- */
 function initHeaderActions() {
  const favBtn = $("favBtn");
  const cartBtn = $("cartBtn");
  if (favBtn) favBtn.addEventListener("click", function () {
    renderFavDrawer();
    openDrawer("favDrawer");
  });
  if (cartBtn) cartBtn.addEventListener("click", function () {
    renderCart();
    openDrawer("cartDrawer");
  });

  document.querySelectorAll(".drawer").forEach(function (d) {
    d.addEventListener("click", function (e) {
      if (e.target.closest("[data-close-drawer]")) closeDrawer(d);
    });
  });

  document.querySelectorAll(".modal").forEach(function (m) {
    m.addEventListener("click", function (e) {
      if (e.target.closest("[data-close-modal]")) closeAllModals();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllModals();
      document.querySelectorAll(".drawer.is-open").forEach(closeDrawer);
      const nav = $("mobileNav");
      const burger = $("burgerBtn");
      if (nav && !nav.hidden) {
        nav.hidden = true;
        if (burger) burger.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Кнопка "Замовити в Telegram"
  const orderBtn = $("orderViaTelegramBtn");
  if (orderBtn) {
    orderBtn.addEventListener("click", orderViaTelegram);
  }
}
  /* ---------------------------------------------------------
     17. ЗАПУСК
     --------------------------------------------------------- */
  function init() {
    const yearEl = $("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    initLogo();
    initFilters();
    initSearch();
    initBurger();
  initHeaderActions();
    renderCatalog();
    renderNew();
    renderSale();
    renderFavorites();
    renderFavDrawer();
    renderCart();
    updateCounters();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
 })();