import FormValidator from "../components/FormValidator.js";

export const initialCards = [
  {
    title: "Сибирская зима, когда -40 и снежно",
    link: "https://sun4-17.userapi.com/impg/9jiK-6i2z9vpwfkE6-wdzM5OpgDvsxSNHnnKcA/vTftBek9kjM.jpg?size=1280x960&quality=96&sign=306a7f67cc07fa92bf332bf90db68211&type=album",
  },
  {
    title: "Купол цирка",
    link: "https://sun9-85.userapi.com/impg/EW5_s17Ypgc434TjA8JlkFQYsq788cKrJarYtQ/dMfCY6EsSFc.jpg?size=604x604&quality=96&sign=1405b9acc017ac6d1d746c162bbbbb0a&type=album",
  },
  {
    title: "Хоккейная коробка",
    link: "https://sun9-59.userapi.com/impg/rHMckwIDdHOQhtxVM6qpV-GjGbam7Aya9W-eyQ/I-cRUb7FKTY.jpg?size=604x453&quality=96&sign=5c477aa035caa9e9be127543999746d1&type=album",
  },
  {
    title: "Иней",
    link: "https://sun4-15.userapi.com/impg/cZcJwLnFN_k5pNBX5P8vY-fX19Qebhfbzmld3A/sIFDG_GCGQk.jpg?size=1000x750&quality=96&sign=7f6b4e19f8ec8a91643718b7d88b2201&type=album",
  },
  {
    title: "Ергаки и поляна жарков",
    link: "https://sun4-15.userapi.com/impg/7bLwDpM4_0oO6ec3ssvIaSqgkM7-4ERHOi9Zww/1WiY_T7vBWo.jpg?size=1280x960&quality=96&sign=f1c51ea17b6baf429ad5f5bc05076621&type=album",
  },
  {
    title: "Довольный пёксель :-)",
    link: "https://sun9-19.userapi.com/impg/7654fFrrV90V0SW_UGG2QJl1vk27sPvJdDLXzg/n5t3BbFf_Qs.jpg?size=960x1280&quality=96&sign=26b8472d0538c2764df2819e36bb5a30&type=album",
  },
];

export const validationConfig = {
  formSelector: ".popup-form",
  fieldsetList: ".popup-form__fieldset",
  inputSelector: ".popup-form__input",
  submitButtonSelector: ".popup-form__submit",
  inactiveButtonClass: "popup-form__submit_disabled",
  inputErrorClass: "popup-form__input_type_error",
  errorClass: "form__input-error_active",
};

export const popups = document.querySelectorAll(".popup");

export const showImagePopup = "#showCardPopup";

export const editProfilePopup = "#editProfilePopup";
export const popupEditProfileForm = document.querySelector("#editProfileForm");
export const editButton = document.querySelector(".profile__edit-button");
export const nameInput = popupEditProfileForm.querySelector(
  ".popup-form__input_el_name"
);
export const descriptionInput = popupEditProfileForm.querySelector(
  ".popup-form__input_el_description"
);

export const userNameSelector = ".profile__name";
export const userDescriptionSelector = ".profile__description";

export const cardsContainer = ".elements";

export const createCardButton = document.querySelector(".profile__add-button");
export const сreateCardPopup = "#createCardPopup";

export const imageName = document.querySelector(
  ".popup-form__input_el_name-of-image"
);

export const imageLink = document.querySelector(
  ".popup-form__input_el_link-of-image"
);

export const createCardPopupForm = document.querySelector(
  "#createCardPopupForm"
);

export const createCardPopupFormValidation = new FormValidator(
  validationConfig,
  createCardPopupForm
);

export const profileEditFormValidation = new FormValidator(
  validationConfig,
  popupEditProfileForm
);

export const API_OPTIONS = {
  id: "cohort-60",
  api: "https://mesto.nomoreparties.co/v1",
  token: "cba87ec0-b6fc-4b5d-8fac-76903fee7a09",
};
