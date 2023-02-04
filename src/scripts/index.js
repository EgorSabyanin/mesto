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
  showImagePopup,
  editProfilePopup,
  userName,
  userDescription,
  nameInput,
  descriptionInput,
  editButton,
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

// * Пользовательская информация
const userInfo = new UserInfo({
  name: "Жак Ив-Кусто",
  description: "Исследователь океана",
});

// * Экземпляры для Popup'ов
const popupShowImage = new PopupWithImage(showImagePopup);
popupShowImage.setEventListeners();

const popupEditForm = new PopupWithForm(editProfilePopup, handleEditForm);
popupEditForm.setEventListeners();

function handleEditForm(data) {
  userName.textContent = data.name;
  userDescription.textContent = data.description;
  userInfo.setUserInfo(data);
}

const popupCreationCard = new PopupWithForm();
popupCreationCard.setEventListeners();

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

editButton.addEventListener("click", function (event) {
  popupEditForm.open();
  nameInput.value = userInfo.getUserInfo().name;
  descriptionInput.value = userInfo.getUserInfo().description;
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
