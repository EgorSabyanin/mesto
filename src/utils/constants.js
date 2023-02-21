export const validationConfig = {
  formSelector: ".popup-form",
  fieldsetList: ".popup-form__fieldset",
  inputSelector: ".popup-form__input",
  submitButtonSelector: ".popup-form__submit",
  inactiveButtonClass: "popup-form__submit_disabled",
  inputErrorClass: "popup-form__input_type_error",
  errorClass: "form__input-error_active",
};

export const cardTemplateSelector = "#element";
export const cardsContainer = ".elements";
export const popups = document.querySelectorAll(".popup");

export const imageShowPopup = "#showCardPopup";

export const profileEditPopup = "#editProfilePopup";
export const profileEditPopupForm = document.querySelector("#editProfileForm");
export const profileButtonEdit = document.querySelector(
  ".profile__edit-button"
);
export const nameInput = document.querySelector(".popup-form__input_el_name");
export const descriptionInput = document.querySelector(
  ".popup-form__input_el_description"
);

export const userNameSelector = ".profile__name";
export const userDescriptionSelector = ".profile__description";
export const userAvatarSelector = ".profile__image";

export const cardButtonCreate = document.querySelector(".profile__add-button");
export const cardCreatePopup = "#createCardPopup";
export const cardCreatePopupForm = document.querySelector(
  "#createCardPopupForm"
);

export const imageName = document.querySelector(
  ".popup-form__input_el_name-of-image"
);
export const imageLink = document.querySelector(
  ".popup-form__input_el_link-of-image"
);

export const avatarChangePopup = "#changeAvatarPopup";
export const avatarChangeButton = document.querySelector(
  ".profile__avatar-button"
);

export const avatarFormChange = document.querySelector("#changeAvatarForm");

export const cardDeletePopup = "#deleteCardPopup";
export const cardDeletePopupForm = document.querySelector("#deleteCardForm");

export const API_OPTIONS = {
  id: "cohort-60",
  api: "https://mesto.nomoreparties.co/v1",
  token: "cba87ec0-b6fc-4b5d-8fac-76903fee7a09",
};
