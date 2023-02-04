// * Card создаёт карточку путешествия
export default class Card {
  // * Params:
  // ? {title, link} — строковые значения; название карточки и ссылка
  // ? templateSelector — строка на селектор шаблон вёртски для карточки
  // ? openPopup — обработчик, который связывает карточку с popup'ом
  constructor({ title, link }, templateSelector, openPopup) {
    this._link = link;
    this._title = title;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _removeCard() {
    this._element.remove();
  }

  _like(event) {
    event.target.classList.toggle("element__like_active");
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".element__image");

    this._setEventListeners();

    this._image.src = this._link;
    this._image.alt = this._title;
    this._element.querySelector(".element__text").textContent = this._title;

    return this._element;
  }

  // * Навешиваем слушателей
  _setEventListeners() {
    // ! Используем делегирование на целую карточку
    this._element.addEventListener("click", (event) => {
      if (event.target.classList.contains("element__like")) {
        this._like(event);
        return;
      }
      if (event.target.classList.contains("element__image")) {
        this._openPopup(this._link, this._title);
        return;
      }
      if (event.target.classList.contains("element__remove")) {
        this._removeCard();
      }
    });
  }
}
