export class Card {
  constructor(data, templateSelector, openPopup) {
    this._link = data.link;
    this._text = data.name;
    this._templateSelector = templateSelector;
    this._popup = document.querySelector("#showCardPopup");
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
    this._image.alt = this._text;
    this._element.querySelector(".element__text").textContent = this._text;

    return this._element;
  }

  _setEventListeners() {
    this._element.addEventListener("click", (event) => {
      if (event.target.classList.contains("element__like")) {
        this._like(event);
        return;
      }
      if (event.target.classList.contains("element__image")) {
        this._openPopup(this._link, this._text);
        return;
      }
      if (event.target.classList.contains("element__remove")) {
        this._removeCard();
      }
    });
  }
}
