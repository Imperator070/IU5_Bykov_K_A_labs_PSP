window.getDetailPage = function(product) {
  if (!product) return '<main class="main container py-5"><p class="text-center">Товар не найден</p></main>';

  const specsHtml = product.specs.map(([key, val]) => `<tr><td>${key}</td><td>${val}</td></tr>`).join('');
  const inCart = window.cart?.find(c => c.id === product.id);
  const qty = inCart ? inCart.qty : 1;
  const sum = product.price * qty;

  return `
    <main class="main">
      <div class="breadcrumbs">
        <div class="container">
          <a href="index.html">Главная</a> <span>/</span>
          <a href="#catalog">Каталог</a> <span>/</span>
          <span>${product.title}</span>
        </div>
      </div>
      <div class="container">
        <div class="product-page">
          <div class="product-page-grid">
            <div class="product-image-large">
              <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info-large">
              <div class="product-brand-large">${product.brand}</div>
              <h1 class="product-title-large">${product.title}</h1>
              <div class="product-status">
                <span class="status-badge ${product.inStock ? 'in-stock' : 'out-stock'}">
                  ${product.inStock ? '✓ В наличии' : '⏳ Под заказ'}
                </span>
                <span class="status-code">Артикул: ${String(product.id).padStart(9, '0')}</span>
              </div>
              <div class="product-price-large">
                <span class="price-value">${product.price} ₽</span>
                ${product.oldPrice ? `<span class="price-old">${product.oldPrice} ₽</span>` : ''}
              </div>
              <div class="product-actions">
                <div class="quantity-selector">
                  <button class="qty-btn">−</button>
                  <input type="text" class="qty-input" value="${qty}">
                  <button class="qty-btn">+</button>
                </div>
                <button class="btn-add-cart">В корзину</button>
                <button class="btn-buy-now">Купить в 1 клик</button>
              </div>
              <div class="product-sum mb-3">
                <strong>Сумма:</strong> <span class="text-danger fs-5">${sum.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div class="product-delivery">
                <h4>Доставка:</h4>
                <ul>
                  <li>📦 Курьером — от 350 ₽</li>
                  <li>🏪 Самовывоз — бесплатно</li>
                  <li>📮 Почта России — от 250 ₽</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="product-details">
            <div class="tabs">
              <button class="tab-btn active" data-tab="desc">Описание</button>
              <button class="tab-btn" data-tab="specs">Характеристики</button>
            </div>
            <div class="tab-content active" id="tab-desc">
              <h3>Описание товара</h3>
              <p>${product.desc}</p>
            </div>
            <div class="tab-content" id="tab-specs">
              <h3>Технические характеристики</h3>
              <table class="specs-table">${specsHtml}</table>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
};