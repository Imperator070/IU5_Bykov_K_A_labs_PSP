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

  const initThreeD = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const loader = new THREE.GLTFLoader();
    loader.load('models/sunglasses.glb', (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      model.position.x -= center.x;
      model.position.y -= center.y;
      model.position.z -= center.z;
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = (maxDim / (2 * Math.tan(fov / 2))) * 1.5;
      
      camera.position.set(0, 0, cameraZ);
      controls.target.set(0, 0, 0);
      controls.update();
      
      scene.add(model);
    }, undefined, console.error);

    const animate = () => {
      if (!document.getElementById('canvas-container')) return;
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
      if (!document.getElementById('canvas-container')) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
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

      setTimeout(initThreeD, 0);
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