import { initialCards } from "./cardsData.js";
import { Card } from "../components/Card.js";
import { validationConfig } from "./validationConfig.js";
import { FormValidator } from "./FormValidator.js";

import "../pages/index.css"; // Стили страницы

const popups = document.querySelectorAll(".popup");

const showImagePopup = document.querySelector("#showCardPopup");
const image = showImagePopup.querySelector(".popup__image");
const title = showImagePopup.querySelector(".popup__title");

function openPopup(popup) {
  document.body.addEventListener("keydown", closePopupUseEsc);
  popup.classList.add("popup_opened");
}

function openedShowImagePopup(link, text) {
  openPopup(showImagePopup);
  image.src = link;
  image.alt = text;
  title.textContent = text;
}

function createCard(data) {
  const card = new Card(data, "#element", openedShowImagePopup);
  return card.generateCard();
}

function closePopupUseEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

popups.forEach((popup) => {
  /**
   * * Делегирование события клика (при нажатии на оверлей, при нажатии на крестик)
   */
  popup.addEventListener("click", (event) => {
    const targetElement = event.target;
    if (
      targetElement.classList.contains("popup__close") ||
      targetElement.classList.contains("popup")
    ) {
      closePopup(event.currentTarget);
    }
  });
});

const editProfilePopup = document.querySelector("#editProfilePopup");
const editButton = document.querySelector(".profile__edit-button");

const userName = document.querySelector(".profile__name");
const userDescription = document.querySelector(".profile__description");

const popupEditProfileForm = editProfilePopup.querySelector(".popup-form");

const nameInput = popupEditProfileForm.querySelector(
  ".popup-form__input_el_name"
);
const descriptionInput = popupEditProfileForm.querySelector(
  ".popup-form__input_el_description"
);

function closePopup(popup) {
  document.body.removeEventListener("keydown", closePopupUseEsc);
  popup.classList.remove("popup_opened");
}

popupEditProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(editProfilePopup);
});

editButton.addEventListener("click", function (event) {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPopup(editProfilePopup);
});

/**
 * * Реализация начальной загрузки карточек
 */

const cardsContainer = document.querySelector(".elements");

initialCards.forEach((initialCard) => {
  cardsContainer.append(createCard(initialCard));
});

// /**
//  * * Реализация создания карточки
//  */

const createCardButton = document.querySelector(".profile__add-button");
const сreateCardPopup = document.querySelector("#createCardPopup");

const imageName = сreateCardPopup.querySelector(
  ".popup-form__input_el_name-of-image"
);
const imageLink = сreateCardPopup.querySelector(
  ".popup-form__input_el_link-of-image"
);

const createCardPopupForm = document.querySelector("#createCardPopupForm");

createCardPopupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  cardsContainer.prepend(
    createCard({ name: imageName.value, link: imageLink.value })
  );
  closePopup(сreateCardPopup);
});

createCardButton.addEventListener("click", function (event) {
  createCardPopupFormValidation.disableButton();
  createCardPopupForm.reset();
  openPopup(сreateCardPopup);
});

/**
 * ! Обработка корректности пользовательского ввода на формах
 */

const createCardPopupFormValidation = new FormValidator(
  validationConfig,
  createCardPopupForm
);

createCardPopupFormValidation.enableValidation();

const profileEditFormValidation = new FormValidator(
  validationConfig,
  popupEditProfileForm
);

profileEditFormValidation.enableValidation();
