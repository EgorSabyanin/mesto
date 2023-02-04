export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    // ! Привязка контекста, чтобы закрывался корректно popup
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.body.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
  }

  close() {
    document.body.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      this._targetElement = event.target;
      if (
        this._targetElement.classList.contains("popup__close") ||
        this._targetElement.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}
