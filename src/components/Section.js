// * class Section отвечает за отрисовку элементов на странице

export default class Section {
  // * Params
  // ? renderer: Отрисовка происходит благодаря коллбэк функции renderer, которая гененирует разметку DOM-элемента
  // ? contaunerSelector: селектор родительского элемента, используется для нахождения DOM-элемента для вставки дочерних DOM-узлов
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // * Отчищает контейнер от всех DOM-элементов
  clear() {
    this._container.innerHTML = "";
  }

  // * Отрисовывает начальные элементы
  renderItems(items) {
    items.reverse().forEach((item) => {
      this._renderer(item, this._container);
    });
  }

  // * Принимает DOM-элемент и вставляет в родительский элемент на первое место
  addItem(item) {
    this._container.prepend(item);
  }
}
