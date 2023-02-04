import Popup from "./Popup";

// * class PopupWithForm отвечает за появления popup'а с формой для пользовательского ввода
// * use: применяет для формы изменения имени и описания профиля, для создания карточки путешествия
export default class PopupWithForm extends Popup {
  // * Params:
  // ? selectorPopup: селектор popup формы
  // ? handleSubmitForm: коллбэк, который отвечает за обработку отправки формы
  constructor(selectorPopup, handleSubmitForm) {
    // ! Используем родительский конструктор, чтобы привязать контекст использования popup'а
    super(selectorPopup);

    this._handleSubmitForm = handleSubmitForm;
    // * DOM-элементы текущей формы
    this._popupForm = this._popup.querySelector(".popup-form");
    this._inputList = this._popupForm.querySelectorAll(".popup-form__input");
  }

  // * _getInputValues: собирает данные всех полей формы
  _getInputValues() {
    this.inputValues = {};

    this._inputList.forEach((input) => {
      this.inputValues[input.name] = input.value;
    });
    return this.inputValues;
  }

  setEventListeners() {
    // ! Используем родительский листенер для закрытия окна по кликам на крестик и клику вне формы
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }

  // * close: используем полиморфизм, чтобы добавить отчистить форму popup
  close() {
    super.close();
    this._popupForm.reset();
  }
}
