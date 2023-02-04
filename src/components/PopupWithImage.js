import Popup from "./Popup";

// * Отвечает за создания Popup'а для показа изображения карточки-путешествия
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector(".popup__title");
    this._image = this._popup.querySelector(".popup__image");
  }

  // * open: Полиморфизм для стандартного открытия popup
  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
    super.open();
  }
}
