// * Импорт стилей страницы
import "../pages/index.css";

// * Импорт классов

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import PopupConfirm from "../components/PopupDelCard";
import Api from "../components/Api";

// * Импорт констант
import {
  initialCards,
  API_OPTIONS,
  showImagePopup,
  editProfilePopup,
  userNameSelector,
  userDescriptionSelector,
  nameInput,
  descriptionInput,
  editButton,
  cardsContainer,
  createCardButton,
  сreateCardPopup,
  createCardPopupForm,
  changeAvatarPopup,
  changeAvatarButton,
  changeAvatarPopupFormValidation,
  deleteCardPopup,
  deleteCardPopupForm,
  createCardPopupFormValidation,
  profileEditFormValidation,
} from "../utils/constants";

const api = new Api(API_OPTIONS);

api
  .getUser()
  .then((result) => {
    const profileAvatar = document.querySelector(".profile__image");
    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(".profile__description");

    profileAvatar.src = result.avatar;
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
  })
  .catch((err) => {
    console.log(err);
  });

api.getInitialCards().then((result) => {
  const cardList = new Section(
    {
      items: result,
      renderer: (item) => {
        const card = createCard(item);
        cardList.addItem(card);
      },
    },
    cardsContainer
  );

  cardList.renderItems();
});

/**
 * * Реализация начальной загрузки карточек
 */

// * Пользовательская информация
const userInfo = new UserInfo({
  userNameSelector: userNameSelector,
  userDescriptionSelector: userDescriptionSelector,
});

// * Экземпляры для Popup'ов
const popupShowImage = new PopupWithImage(showImagePopup);
popupShowImage.setEventListeners();

const popupEditForm = new PopupWithForm(editProfilePopup, handleEditForm);
popupEditForm.setEventListeners();

const popupDeleteCard = new PopupConfirm(deleteCardPopup, function (card) {
  api
    .removeCard(card)
    .then(() => {
      card.remove();
      popupDeleteCard.close();
    })
    .catch((err) => console.log(err));
});
popupDeleteCard.setEventListeners();

function handleEditForm(data) {
  api.editProfile({ name: data.name, about: data.description });
  userInfo.setUserInfo(data);
}

const popupCreationCard = new PopupWithForm(
  сreateCardPopup,
  handleCreationForm
);
popupCreationCard.setEventListeners();

function handleCreationForm(object) {
  api.createCard({ name: object.nameOfImage, link: object.linkOfImage });
  const card = createCard({
    title: object.nameOfImage,
    link: object.linkOfImage,
  });
  popupCreationCard.close();
  cardList.addItem(card);
}

/**
 * * Изменение аватара
 */

const popupChangeAvatar = new PopupWithForm(
  changeAvatarPopup,
  handleChangeAvatarForm
);
popupChangeAvatar.setEventListeners();

changeAvatarButton.addEventListener("click", function () {
  popupChangeAvatar.open();
});

function handleChangeAvatarForm(object) {
  popupChangeAvatar.close();
  api.createAvatar({ avatar: object.linkOfAvatar }).catch((err) => {
    console.log(err);
  });
}

function openedShowImagePopup(title, link) {
  popupShowImage.open(title, link);
}

// * Лайк handlers

function likeAddHandler(cardID) {
  api.addLike(cardID);
  event.target.nextElementSibling.textContent =
    +event.target.nextElementSibling.textContent + 1;
}

function likeRemoveHandler(cardID) {
  api.removeLike(cardID);
  event.target.nextElementSibling.textContent =
    +event.target.nextElementSibling.textContent - 1;
}

// * Удаление карточки handler

function removeCardHandler(cardID) {
  popupDeleteCard.open(cardID);
}

// * Создание карточки

function createCard(data) {
  const card = new Card(
    data,
    "#element",
    openedShowImagePopup,
    popupDeleteCard,
    api.getUser(),
    likeAddHandler,
    likeRemoveHandler,
    removeCardHandler
  );
  return card.generateCard();
}

editButton.addEventListener("click", function () {
  nameInput.value = userInfo.getUserInfo().name;
  descriptionInput.value = userInfo.getUserInfo().description;
  popupEditForm.open();
});

// /**
//  * * Реализация создания карточки
//  */

createCardButton.addEventListener("click", function () {
  popupCreationCard.open();
  createCardPopupFormValidation.disableButton();
  createCardPopupForm.reset();
});

/**
 * ! Обработка валидности пользовательского ввода на формах
 */

createCardPopupFormValidation.enableValidation();
profileEditFormValidation.enableValidation();
changeAvatarPopupFormValidation.enableValidation();
