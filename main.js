document.addEventListener('DOMContentLoaded', () => {
  let items = [];
  let currentFilter = '';
  const app = document.getElementById('app');

  const loadData = (callback) => {
    window.api.getAll()
      .then((data) => {
        items = data;
        if (callback) callback();
      })
      .catch((err) => {
        app.innerHTML = `<div class="alert alert-danger m-5">Ошибка: ${err.status || 'Неизвестная ошибка'}</div>`;
      });
  };

  const updateCartBadge = () => {
    const badge = document.querySelector('.cart-badge');
    if (badge && window.cart) {
      badge.textContent = window.cart.reduce((s, i) => s + i.qty, 0);
    }
  };

  const getCartSummary = () => {
    if (!window.cart || window.cart.length === 0) return '';
    const totalQty = window.cart.reduce((s, i) => s + i.qty, 0);
    return `<div class="container mt-3"><div class="alert alert-light border shadow-sm d-flex justify-content-between align-items-center p-3"><div><span style="font-size:24px">🛒</span> <strong>Выбрано акций:</strong> ${totalQty} шт.</div><button id="clear-cart-btn" class="btn btn-outline-danger btn-sm">Очистить</button></div></div>`;
  };

  const render = () => {
    const hash = window.location.hash;
    updateCartBadge();

    if (hash === '#add') {
      app.innerHTML = window.getHeader() + window.getFormPage() + window.getFooter();
    } else if (hash.startsWith('#edit/')) {
      const id = hash.split('/')[1];
      const item = items.find(p => String(p.id) === id);
      app.innerHTML = window.getHeader() + window.getFormPage(item) + window.getFooter();
    } else if (hash.startsWith('#detail/')) {
      const id = hash.split('/')[1];
      const item = items.find(p => String(p.id) === id);
      app.innerHTML = window.getHeader() + window.getDetailPage(item) + window.getFooter();

      const inCart = (window.cart || []).find(c => String(c.id) === id);
      const qtyInput = document.querySelector('.qty-input');
      if (qtyInput && inCart) qtyInput.value = inCart.qty;
    } else {
      const filtered = currentFilter
          ? items.filter(p => p.title.toLowerCase().includes(currentFilter) || p.text.toLowerCase().includes(currentFilter))
          : items;
      app.innerHTML = window.getHeader() + window.getMainPage(filtered) + getCartSummary() + window.getFooter();
      const input = document.getElementById('filter-input');
      if (input) input.value = currentFilter;
    }
  };

  app.addEventListener('click', (e) => {
    if (e.target.id === 'add-product-btn') {
      window.location.hash = '#add';
      return;
    }

    if (e.target.classList.contains('details-btn')) {
      const id = e.target.dataset.id;
      window.location.hash = `#detail/${id}`;
      return;
    }

    if (e.target.classList.contains('edit-btn')) {
      const id = e.target.dataset.id;
      window.location.hash = `#edit/${id}`;
      return;
    }

    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.dataset.id;
      window.api.delete(id)
        .then(() => {
          loadData(render);
        })
        .catch(console.error);
      return;
    }

    if (e.target.id === 'clear-cart-btn') {
      window.cart = [];
      render();
      return;
    }
  });

  app.addEventListener('submit', (e) => {
    if (e.target.id === 'product-form') {
      e.preventDefault();
      const form = e.target;
      const id = form.dataset.id;

      const data = {
        title: form.title ? form.title.value : '',
        src: form.src ? form.src.value : "https://via.placeholder.com/150",
        text: form.text ? form.text.value : ''
      };

      if (id) {
        window.api.update(id, data)
          .then(() => {
            window.location.hash = '';
            loadData(render);
          })
          .catch(console.error);
      } else {
        window.api.create(data)
          .then(() => {
            window.location.hash = '';
            loadData(render);
          })
          .catch(console.error);
      }
    }
  });

  app.addEventListener('input', (e) => {
    if (e.target.id === 'filter-input') {
      currentFilter = e.target.value.toLowerCase();
      render();
    }
  });

  window.addEventListener('hashchange', render);

  if (!window.cart) window.cart = [];
  loadData(render);
});