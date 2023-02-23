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

import { renderLoading } from "../utils/utils.js";

// * Импорт констант
import {
  API_OPTIONS,
  validationConfig,
  imageShowPopup,
  profileEditPopup,
  userNameSelector,
  userDescriptionSelector,
  userAvatarSelector,
  nameInput,
  descriptionInput,
  profileButtonEdit,
  profileEditPopupForm,
  cardsContainer,
  cardButtonCreate,
  cardCreatePopup,
  cardCreatePopupForm,
  avatarChangePopup,
  avatarChangeButton,
  avatarFormChange,
  cardDeletePopup,
  cardDeletePopupForm,
} from "../utils/constants";

import FormValidator from "../components/FormValidator.js";

const createCardPopupFormValidation = new FormValidator(
  validationConfig,
  createCardPopupForm
);

const changeAvatarPopupFormValidation = new FormValidator(
  validationConfig,
  changeAvatarForm
);

const profileEditFormValidation = new FormValidator(
  validationConfig,
  profileEditPopupForm
);

const cardsList = new Section(render, cardsContainer);

const api = new Api(API_OPTIONS);

api
  .getUser()
  .then((result) => {
    userInfo.setUserInfo({
      name: result.name,
      description: result.about,
      avatar: result.avatar,
    });

    const user = userInfo.getUserInfo();

    const profileAvatar = document.querySelector(".profile__image");
    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(".profile__description");

    profileAvatar.src = user.avatar;
    profileName.textContent = user.name;
    profileDescription.textContent = user.description;
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * * Реализация начальной загрузки карточек
 */

// * Пользовательская информация
const userInfo = new UserInfo({
  userNameSelector: userNameSelector,
  userDescriptionSelector: userDescriptionSelector,
  userAvatarSelector: userAvatarSelector,
});

// * Экземпляры для Popup'ов
const popupShowImage = new PopupWithImage(imageShowPopup);
popupShowImage.setEventListeners();

const popupEditForm = new PopupWithForm(
  profileEditPopup,
  handleProfileEditForm
);
popupEditForm.setEventListeners();

const popupDeleteCard = new PopupConfirm(cardDeletePopup, function (card) {
  api
    .removeCard(card)
    .then(() => {
      card.remove();
      popupDeleteCard.close();
    })
    .catch((err) => console.log(err));
});
popupDeleteCard.setEventListeners();

function handleProfileEditForm(data) {
  const buttonSubmit = profileEditPopupForm.querySelector(
    ".popup-form__submit"
  );
  const originalText = buttonSubmit.textContent;
  renderLoading(buttonSubmit, "Сохранение...");
  api
    .editUserProfile({ name: data.name, about: data.description })
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, description: res.about });
      popupEditForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(buttonSubmit, originalText);
    });
}

const popupCreationCard = new PopupWithForm(
  cardCreatePopup,
  handleCreationForm
);
popupCreationCard.setEventListeners();

function handleCreationForm(object) {
  const buttonSubmit = cardCreatePopupForm.querySelector(".popup-form__submit");
  const originalText = buttonSubmit.textContent;
  renderLoading(buttonSubmit, "Сохранение...");
  api
    .createCard({ name: object.nameOfImage, link: object.linkOfImage })
    .then((res) => {
      const card = createCard(res, userInfo.id);
      popupCreationCard.close();
      cardsList.addItem(card);
      popupCreationCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(buttonSubmit, originalText);
    });
}

/**
 * * Изменение аватара
 */

const popupChangeAvatar = new PopupWithForm(
  avatarChangePopup,
  handleChangeAvatarForm
);
popupChangeAvatar.setEventListeners();

avatarChangeButton.addEventListener("click", function () {
  popupChangeAvatar.open();
});

function handleChangeAvatarForm(object) {
  const buttonSubmit = avatarFormChange.querySelector(".popup-form__submit");
  const originalText = buttonSubmit.textContent;
  renderLoading(buttonSubmit, "Сохранение...");
  api
    .createAvatar({ avatar: object.linkOfAvatar })
    .then((res) => {
      userInfo.setUserInfo({ avatar: res.avatar });
      popupChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(buttonSubmit, originalText);
    });
}

function openedShowImagePopup(title, link) {
  popupShowImage.open(title, link);
}

// * Лайк handlers

function likeHandleClick(cardID, cardObject) {
  console.log(cardObject);
  console.log(`Есть ли мой лайк → ${cardObject.isLiked() ? "Да" : "Нет"}`);
  if (cardObject.isLiked()) {
    api
      .removeLike(cardID)
      .then((res) => {
        cardObject._likes = res.likes;
        cardObject._updateLikesView();
      })
      .catch((err) => {
        console.log(
          `Occurred some error with API request "removeLike" — ${err}`
        );
      });
  } else {
    api
      .addLike(cardID)
      .then((res) => {
        cardObject._likes = res.likes;
        cardObject._updateLikesView();
      })
      .catch((err) => {
        console.log(`Occurred some error with API request "addLike" — ${err}`);
      });
  }
}

// * Удаление карточки handler

function removeCardHandler(cardID) {
  popupDeleteCard.open(cardID);
}

// * Создание карточки

function createCard(data, userID) {
  const card = new Card(
    data,
    "#element",
    openedShowImagePopup,
    popupDeleteCard,
    userID,
    likeHandleClick,
    removeCardHandler
  );
  return card.generateCard();
}

profileButtonEdit.addEventListener("click", function () {
  const user = userInfo.getUserInfo();
  nameInput.value = user.name;
  descriptionInput.value = user.description;
  popupEditForm.open();
});

// /**
//  * * Реализация создания карточки
//  */

cardButtonCreate.addEventListener("click", function () {
  popupCreationCard.open();
  createCardPopupFormValidation.disableButton();
  cardCreatePopupForm.reset();
});

/**
 * ! Обработка валидности пользовательского ввода на формах
 */

createCardPopupFormValidation.enableValidation();
profileEditFormValidation.enableValidation();
changeAvatarPopupFormValidation.enableValidation();

function render(renderedElement, container) {
  container.prepend(renderedElement);
}

// ! Получаем сначала данные пользователя, а затем данные карточек
Promise.all([api.getUser(), api.getInitialCards()])
  .then((result) => {
    const userData = result[0];
    const initialCardsData = result[1];

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });

    userInfo.id = userData._id;

    const initialCardElements = initialCardsData.map((initialCardData) => {
      return createCard(initialCardData, userInfo.id);
    });

    cardsList.renderItems(initialCardElements);
  })
  .catch((err) => console.log(err));
