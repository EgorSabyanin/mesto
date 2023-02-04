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
  imageLink,
  imageName,
  cardsContainer,
  createCardButton,
  сreateCardPopup,
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

const popupCreationCard = new PopupWithForm(
  сreateCardPopup,
  handleCreationForm
);
popupCreationCard.setEventListeners();

function handleCreationForm(object) {
  const card = createCard({
    title: object.nameOfImage,
    link: object.linkOfImage,
  });
  cardList.addItem(card);
  popupCreationCard.close();
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

createCardButton.addEventListener("click", function (event) {
  popupCreationCard.open();
  createCardPopupFormValidation.disableButton();
  createCardPopupForm.reset();
});

/**
 * ! Обработка валидности пользовательского ввода на формах
 */

createCardPopupFormValidation.enableValidation();
profileEditFormValidation.enableValidation();
