// * class Section отвечает за отрисовку элементов на странице

export default class Section {
  // * Params
  // ? items: Начальный массив элементов для добавлении в секцию
  // ? renderer: Отрисовка происходит благодаря коллбэк функции renderer, которая гененирует разметку DOM-элемента
  // ? contaunerSelector: селектор родительского элемента, используется для нахождения DOM-элемента для вставки дочерних DOM-узлов
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // * Отчищает контейнер от всех DOM-элементов
  clear() {
    this._container.innerHTML = "";
  }

  // * Отрисовывает начальные элементы
  renderItems() {
    this.clear();
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // * Принимает DOM-элемент и вставляет в родительский элемент на первое место
  addItem(item) {
    this._container.prepend(item);
  }
}
