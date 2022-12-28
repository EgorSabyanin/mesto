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

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = function (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonDisable(buttonElement);
  } else {
    buttonEnable(buttonElement);
  }
};

const hasInvalidInput = function (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );

  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (event) {});

    const fieldsetList = Array.from(
      formElement.querySelectorAll(config.fieldsetList)
    );

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

enableValidation(validationConfig);

function buttonDisable(buttonSubmit) {
  buttonSubmit.classList.add(validationConfig.inactiveButtonClass);
  buttonSubmit.setAttribute("disabled", true);
}

function buttonEnable(buttonSubmit) {
  buttonSubmit.classList.remove(validationConfig.inactiveButtonClass);
  buttonSubmit.removeAttribute("disabled");
}
