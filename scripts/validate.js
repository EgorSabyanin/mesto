// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationConfig = {
  formSelector: ".popup-form",
  fieldsetList: ".popup-form__fieldset",
  inputSelector: ".popup-form__input ",
  submitButtonSelector: ".popup-form__submit",
  inactiveButtonClass: "popup-form__submit_disabled",
  inputErrorClass: "popup-form__input_type_error",
  errorClass: "form__input-error_active",
};

const showInputError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      config,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(config, formElement, inputElement);
  }
};

const toggleButtonState = function (config, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton(config, buttonElement);
  } else {
    enableButton(config, buttonElement);
  }
};

const hasInvalidInput = function (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setEventListeners = (config, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(config, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formElement) => {
    const fieldsetList = Array.from(
      formElement.querySelectorAll(config.fieldsetList)
    );

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(config, fieldSet);
    });
  });
};

enableValidation(validationConfig);

function disableButton(config, buttonSubmit) {
  buttonSubmit.classList.add(config.inactiveButtonClass);
  buttonSubmit.setAttribute("disabled", true);
}

function enableButton(config, buttonSubmit) {
  buttonSubmit.classList.remove(config.inactiveButtonClass);
  buttonSubmit.removeAttribute("disabled");
}
