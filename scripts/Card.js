export class Card {
  constructor(data, template) {
    this._image = data.link;
    this._text = data.name;
    this._templateSelector = template;
    this._popup = document.querySelector("#showCardPopup");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _closePopupUseEsc(event) {
    if (event.key === "Escape") {
      this._closePopup();
    }
  }

  _openPopup() {
    document.body.addEventListener("keydown", this._closePopupUseEsc);
    this._popup.classList.add("popup_opened");
  }

  _closePopup() {
    document.body.removeEventListener("keydown", this._closePopupUseEsc);
    this._popup.classList.remove("popup_opened");
  }

  _removeCard() {
    this._element.remove();
  }

  _like(event) {
    event.target.classList.toggle("element__like_active");
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners(); // добавим обработчики

    this._element.querySelector(".element__image").src = this._image;
    this._element.querySelector(".element__image").alt = this._text;
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
        const showCardImage = showCardPopup.querySelector(".popup__image");
        const showCardTitle = showCardPopup.querySelector(".popup__title");

        showCardImage.src = this._image;
        showCardImage.alt = this._text;
        showCardTitle.textContent = this._text;
        this._openPopup();
        return;
      }
      if (event.target.classList.contains("element__remove")) {
        this._removeCard();
        return;
      }
    });
  }
}
