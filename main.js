document.addEventListener('DOMContentLoaded', () => {
  // Глубокая копия mock-данных для работы в памяти
  let products = JSON.parse(JSON.stringify(window.mockProducts));
  let currentFilter = '';
  const app = document.getElementById('app');

  // Основная функция отрисовки
  const render = () => {
    const hash = window.location.hash;

    if (hash.startsWith('#detail/')) {
      const id = parseInt(hash.split('/')[1]);
      const product = products.find(p => p.id === id);
      app.innerHTML = window.getHeader() + window.getDetailPage(product) + window.getFooter();
    } else {
      const filtered = currentFilter
        ? products.filter(p => p.title.toLowerCase().includes(currentFilter) || p.brand.toLowerCase().includes(currentFilter))
        : products;

      app.innerHTML = window.getHeader() + window.getMainPage(filtered) + window.getFooter();

      // Восстанавливаем значение поиска после полной перерисовки
      const input = document.getElementById('filter-input');
      if (input) input.value = currentFilter;
    }
  };

  // Делегирование событий на весь #app
  app.addEventListener('click', (e) => {
    // Добавление товара
    if (e.target.id === 'add-product-btn') {
      if (products.length > 0) {
        const copy = { ...products[0], id: Date.now() };
        products.push(copy);
        window.location.hash = '';
        render();
      }
      return;
    }

    // Удаление товара
    if (e.target.classList.contains('delete-btn')) {
      const id = parseInt(e.target.dataset.id);
      products = products.filter(p => p.id !== id);
      render();
      return;
    }

    // Переключение табов
    if (e.target.classList.contains('tab-btn')) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      e.target.classList.add('active');
      const target = document.getElementById('tab-' + e.target.dataset.tab);
      if (target) target.classList.add('active');
    }

    // Счётчик количества
    if (e.target.classList.contains('qty-btn')) {
      const input = e.target.parentElement.querySelector('.qty-input');
      let val = parseInt(input.value) || 1;
      val += e.target.textContent === '+' ? 1 : -1;
      if (val < 1) val = 1;
      input.value = val;
    }
  });

  // Фильтрация в реальном времени
  app.addEventListener('input', (e) => {
    if (e.target.id === 'filter-input') {
      currentFilter = e.target.value.toLowerCase();
      render();
    }
  });

  // Реакция на изменение хеша (назад/вперёд в браузере)
  window.addEventListener('hashchange', render);

  // Первичная отрисовка
  render();
});