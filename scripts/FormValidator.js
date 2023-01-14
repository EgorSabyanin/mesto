export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._buttonSubmit = form.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(
      `.${inputElement}-input-error`
    );

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(
      `.${inputElement.id}-input-error`
    );

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButton(this._buttonSubmit);
    } else {
      this._enableButton(this._buttonSubmit);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );

    this._toggleButtonState(inputList);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._buttonSubmit);
      });
    });
  }

  disableButton() {
    this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
    this._buttonSubmit.setAttribute("disabled", true);
  }

  _enableButton() {
    this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
    this._buttonSubmit.removeAttribute("disabled");
  }

  enableValidation() {
    const fieldsetList = Array.from(
      this._form.querySelectorAll(this._config.fieldsetList)
    );

    fieldsetList.forEach((fieldSet) => {
      this._setEventListeners();
    });
  }
}
