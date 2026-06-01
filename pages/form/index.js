window.getFormPage = function(item = null) {
    const isEdit = !!item;
    return `
    <main class="container py-5">
      <h2>${isEdit ? 'Редактировать акцию' : 'Добавить акцию'}</h2>
      <form id="product-form" data-id="${isEdit ? item.id : ''}" class="mt-4" style="max-width: 600px;">
        <div class="mb-3">
          <label class="form-label">Заголовок</label>
          <input type="text" name="title" class="form-control" value="${isEdit ? item.title : ''}" required>
        </div>
        <div class="mb-3">
          <label class="form-label">URL картинки</label>
          <input type="text" name="src" class="form-control" value="${isEdit ? item.src : ''}" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Текст акции</label>
          <textarea name="text" class="form-control" rows="4" required>${isEdit ? item.text : ''}</textarea>
        </div>
        <button type="submit" class="btn btn-success">Сохранить</button>
        <a href="#" class="btn btn-secondary ms-2">Отмена</a>
      </form>
    </main>
  `;
};