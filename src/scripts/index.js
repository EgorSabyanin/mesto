// * Импорт стилей страницы
import "../pages/index.css";

// * Импорт классов

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";

// * Импорт констант
import {
  initialCards,
  popups,
  showImagePopup,
  editProfilePopup,
  editButton,
  userName,
  userDescription,
  popupEditProfileForm,
  nameInput,
  descriptionInput,
  cardsContainer,
  createCardButton,
  сreateCardPopup,
  imageName,
  imageLink,
  createCardPopupForm,
  createCardPopupFormValidation,
  profileEditFormValidation,
} from "../utils/constants";

/**
 * * Реализация начальной загрузки карточек
 */

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  cardsContainer
);

cardList.renderItems();

// * Экземпляры для Popup'ов

const popupShowImage = new PopupWithImage(showImagePopup);
popupShowImage.setEventListeners();

function openPopup(popup) {
  document.body.addEventListener("keydown", closePopupUseEsc);
  popup.classList.add("popup_opened");
}

function openedShowImagePopup(title, link) {
  popupShowImage.open(title, link);
}

// * Создание карточки

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

// /**
//  * * Реализация создания карточки
//  */

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
 * ! Обработка валидности пользовательского ввода на формах
 */

createCardPopupFormValidation.enableValidation();
profileEditFormValidation.enableValidation();
