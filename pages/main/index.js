window.getMainPage = function(products) {
  const cardsHtml = products.map(p => `
    <div class="col-md-4 col-lg-3">
      <div class="card h-100 shadow-sm border-0">
        <div class="p-3 d-flex justify-content-center bg-light" style="height: 200px;">
          <img src="${p.image}" class="img-fluid" style="max-height: 100%; object-fit: contain;" alt="${p.title}">
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fs-6 mb-1">${p.title}</h5>
          <p class="card-text text-muted small mb-2">${p.brand}</p>
          <div class="mt-auto pt-2">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="fw-bold text-danger fs-5">${p.price} ₽</span>
              ${p.oldPrice ? `<span class="text-decoration-line-through text-muted small">${p.oldPrice} ₽</span>` : ''}
            </div>
            <a href="#detail/${p.id}" class="btn btn-primary w-100 mb-2">Подробнее</a>
            <button class="btn btn-outline-danger btn-sm w-100 delete-btn" data-id="${p.id}">Удалить</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <main class="main py-4">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="section-title m-0">Каталог товаров</h2>
          <button id="add-product-btn" class="btn btn-success">+ Добавить (копия первого)</button>
        </div>
        <div class="input-group mb-4" style="max-width: 350px;">
          <span class="input-group-text">🔍</span>
          <input type="text" id="filter-input" class="form-control" placeholder="Поиск по названию или бренду...">
        </div>
        <div class="row g-4" id="products-grid">
          ${cardsHtml}
        </div>
      </div>
    </main>
  `;
};