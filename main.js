document.addEventListener('DOMContentLoaded', () => {
  let products = JSON.parse(JSON.stringify(window.mockProducts));
  let currentFilter = '';
  const app = document.getElementById('app');

  const updateCartBadge = () => {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const total = window.cart.reduce((s, i) => s + i.qty, 0);
      badge.textContent = total;
    }
  };

  const getCartSummary = () => {
    if (window.cart.length === 0) return '';
    const totalQty = window.cart.reduce((s, i) => s + i.qty, 0);
    const totalSum = window.cart.reduce((sum, item) => {
      const p = products.find(x => x.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
    return `<div class="container mt-3"><div class="alert alert-light border shadow-sm d-flex justify-content-between align-items-center p-3"><div class="d-flex align-items-center gap-2"><span style="font-size:24px">🛒</span><div><strong>Корзина:</strong> ${totalQty} шт. | Итого: <strong class="text-danger fs-5">${totalSum.toLocaleString('ru-RU')} ₽</strong></div></div><button id="clear-cart-btn" class="btn btn-outline-danger btn-sm">Очистить</button></div></div>`;
  };

  const render = () => {
    const hash = window.location.hash;
    updateCartBadge();
    if (hash.startsWith('#detail/')) {
      const id = parseInt(hash.split('/')[1]);
      const product = products.find(p => p.id === id);
      app.innerHTML = window.getHeader() + window.getDetailPage(product) + window.getFooter();
      const inCart = window.cart.find(c => c.id === id);
      const qtyInput = document.querySelector('.qty-input');
      if (qtyInput && inCart) qtyInput.value = inCart.qty;
    } else {
      const filtered = currentFilter
        ? products.filter(p => p.title.toLowerCase().includes(currentFilter) || p.brand.toLowerCase().includes(currentFilter))
        : products;
      app.innerHTML = window.getHeader() + window.getMainPage(filtered) + getCartSummary() + window.getFooter();
      const input = document.getElementById('filter-input');
      if (input) input.value = currentFilter;
    }
  };

  app.addEventListener('click', (e) => {
    if (e.target.id === 'add-product-btn') {
      if (products.length > 0) {
        const copy = { ...products[0], id: Date.now() };
        products.push(copy);
        window.location.hash = '';
        render();
      }
      return;
    }
    if (e.target.classList.contains('delete-btn')) {
      const id = parseInt(e.target.dataset.id);
      products = products.filter(p => p.id !== id);
      window.cart = window.cart.filter(c => c.id !== id);
      render();
      return;
    }
    if (e.target.id === 'clear-cart-btn') {
      window.cart = [];
      render();
      return;
    }
    if (e.target.classList.contains('tab-btn')) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      e.target.classList.add('active');
      const target = document.getElementById('tab-' + e.target.dataset.tab);
      if (target) target.classList.add('active');
    }
    if (e.target.classList.contains('qty-btn')) {
      const hash = window.location.hash;
      if (!hash.startsWith('#detail/')) return;
      const id = parseInt(hash.split('/')[1]);
      const input = e.target.parentElement.querySelector('.qty-input');
      let val = parseInt(input.value) || 1;
      val += e.target.textContent === '+' ? 1 : -1;
      if (val < 1) val = 1;
      input.value = val;
      const existing = window.cart.find(c => c.id === id);
      if (existing) existing.qty = val;
      else window.cart.push({ id, qty: val });
      updateCartBadge();
      const sumEl = document.querySelector('.product-sum span');
        if (sumEl) {
          const p = products.find(x => x.id === id);
          if (p) sumEl.textContent = `${(p.price * val).toLocaleString('ru-RU')} ₽`;
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
  render();
});