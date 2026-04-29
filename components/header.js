window.getHeader = function() {
  return `
    <div class="header-top">
      <div class="container header-top-inner">
        <a href="index.html" class="logo">
          <img src="https://www.chipdip.ru/content/svg/logo.svg" alt="ЧИП и ДИП">
        </a>
        <div class="header-info">
          <div class="location">
            <span class="icon">📍</span>
            <div>
              <div class="city">Москва</div>
              <div class="shops">Магазины и оптовые отделы</div>
            </div>
          </div>
          <div class="phones">
            <a href="tel:+74955440008">+7 495 544-00-08</a>
            <a href="tel:+74959903030">+7 495 990-30-30</a>
          </div>
        </div>
        <div class="header-nav">
          <a href="#" class="btn-org">CHIPDIP организациям</a>
          <a href="#">Доставка</a>
          <a href="#">Оплата</a>
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="container header-bottom-inner">
        <button class="btn-catalog">☰ Каталог</button>
        <div class="search">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Поиск по каталогу...">
          <button class="search-btn">→</button>
        </div>
        <div class="header-actions">
          <a href="calculator.html" class="action-item">
            <span class="sigma">Σ</span><span>Калькуляторы</span>
          </a>
          <a href="#" class="action-item"><span>👤</span><span>Вход</span></a>
          <a href="#" class="action-item"><span>📦</span><span>Статус заказа</span></a>
          <a href="#" class="action-item"><span>📄</span><span>BOM</span></a>
          <a href="#" class="action-item cart">
            <span>🛒</span><span>Корзина</span><span class="cart-badge">0</span>
          </a>
        </div>
      </div>
    </div>
  `;
};