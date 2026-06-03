window.getMainPage = function(items) {
    if (!items || items.length === 0) {
        return `
      <main class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="text-danger">Акции</h2>
          <button id="add-product-btn" class="btn btn-danger">Добавить акцию</button>
        </div>
        <p class="text-center mt-5 text-danger">Список акций пуст</p>
      </main>
    `;
    }

    const cards = items.map(item => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm border-danger">
        <img src="${item.src}" class="card-img-top" alt="${item.title}" style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-danger">${item.title}</h5>
          <p class="card-text text-truncate">${item.text}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <a href="#detail/${item.id}" class="btn btn-danger">Подробнее</a>
            <div class="btn-group">
              <button class="btn btn-outline-danger edit-btn" data-id="${item.id}">✏️</button>
              <button class="btn btn-danger delete-btn" data-id="${item.id}">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

    return `
    <main class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="text-danger">Акции</h2>
        <button id="add-product-btn" class="btn btn-danger">Добавить акцию</button>
      </div>
      <div class="mb-4">
        <input type="text" id="filter-input" class="form-control border-danger" placeholder="Поиск по названию или тексту...">
      </div>
      <div class="row">
        ${cards}
      </div>
    </main>
  `;
};

window.getDetailPage = function(item) {
    if (!item) return '<main class="container py-5"><p class="text-center text-danger">Акция не найдена</p></main>';

    return `
    <main class="container py-5">
      <div class="mb-4">
        <a href="#" class="text-danger text-decoration-none">← Назад к списку</a>
      </div>
      <div class="row">
        <div class="col-md-6 mb-4">
          <div id="canvas-container" style="width: 100%; height: 400px; background-color: #f8f9fa;" class="rounded shadow border border-danger"></div>
        </div>
        <div class="col-md-6">
          <h1 class="mb-3 text-danger">${item.title}</h1>
          <p class="lead mb-4">${item.text}</p>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-danger edit-btn" data-id="${item.id}">Редактировать</button>
            <button class="btn btn-danger delete-btn" data-id="${item.id}">Удалить</button>
          </div>
        </div>
      </div>
    </main>
  `;
};