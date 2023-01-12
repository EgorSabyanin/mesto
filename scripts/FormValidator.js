export class FormValidator {
  constructor(config) {
    this._config = config;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement}-input-error`
    );

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
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

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement);
      });
    });
  }

  _disableButton(buttonSubmit) {
    buttonSubmit.classList.add(this._config.inactiveButtonClass);
    buttonSubmit.setAttribute("disabled", true);
  }

  _enableButton(buttonSubmit) {
    buttonSubmit.classList.remove(this._config.inactiveButtonClass);
    buttonSubmit.removeAttribute("disabled");
  }

  enableValidation() {
    const formList = document.querySelectorAll(this._config.formSelector);

    formList.forEach((formElement) => {
      const fieldsetList = Array.from(
        formElement.querySelector(this._config.fieldsetList)
      );

      fieldsetList.forEach((fieldSet) => {
        this._setEventListeners(fieldSet);
      });
    });
  }
}
