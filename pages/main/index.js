window.getMainPage = function(items) {
    if (!items || items.length === 0) {
        return `
      <main class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>Акции</h2>
          <button id="add-product-btn" class="btn btn-success">Добавить акцию</button>
        </div>
        <p class="text-center mt-5">Список акций пуст</p>
      </main>
    `;
    }

    const cards = items.map(item => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${item.src}" class="card-img-top" alt="${item.title}" style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text text-truncate">${item.text}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <a href="#detail/${item.id}" class="btn btn-primary">Подробнее</a>
            <div class="btn-group">
              <button class="btn btn-outline-secondary edit-btn" data-id="${item.id}">✏️</button>
              <button class="btn btn-outline-danger delete-btn" data-id="${item.id}">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

    return `
    <main class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Акции</h2>
        <button id="add-product-btn" class="btn btn-success">Добавить акцию</button>
      </div>
      <div class="mb-4">
        <input type="text" id="filter-input" class="form-control" placeholder="Поиск по названию или тексту...">
      </div>
      <div class="row">
        ${cards}
      </div>
    </main>
  `;
};

window.getDetailPage = function(item) {
    if (!item) return '<main class="container py-5"><p class="text-center">Акция не найдена</p></main>';

    return `
    <main class="container py-5">
      <div class="mb-4">
        <a href="#" class="text-decoration-none">← Назад к списку</a>
      </div>
      <div class="row">
        <div class="col-md-6 mb-4">
          <img src="${item.src}" class="img-fluid rounded shadow" alt="${item.title}">
        </div>
        <div class="col-md-6">
          <h1 class="mb-3">${item.title}</h1>
          <p class="lead mb-4">${item.text}</p>
          <div class="d-flex gap-2">
            <button class="btn btn-warning edit-btn" data-id="${item.id}">Редактировать</button>
            <button class="btn btn-danger delete-btn" data-id="${item.id}">Удалить</button>
          </div>
        </div>
      </div>
    </main>
  `;
};