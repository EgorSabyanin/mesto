const editProfilePopup = document.querySelector("#editProfilePopup");
const editButton = document.querySelector(".profile__edit-button");
const closeEditProfilePopup = editProfilePopup.querySelector(".popup__close");

const userName = document.querySelector(".profile__name");
const userDescription = document.querySelector(".profile__description");

const popupEditProfileForm = editProfilePopup.querySelector(".popup-form");

const nameInput = popupEditProfileForm.querySelector(
  ".popup-form__input_el_name"
);
const descriptionInput = popupEditProfileForm.querySelector(
  ".popup-form__input_el_description"
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

popupEditProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(editProfilePopup);
});

editButton.addEventListener("click", function (event) {
  event.preventDefault();
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPopup(editProfilePopup);
});

closeEditProfilePopup.addEventListener("click", function (event) {
  event.preventDefault();
  closePopup(editProfilePopup);
});

//  * * Реализация модального окна показа изображения
//  */

const showCardPopup = document.querySelector("#showCardPopup");
const closeShowCardPopup = document.querySelector("#closeShowCard");

const showCardImage = showCardPopup.querySelector(".popup__image");
const showCardTitle = showCardPopup.querySelector(".popup__title");

closeShowCardPopup.addEventListener("click", (event) => {
  event.preventDefault();
  closePopup(showCardPopup);
});

/**
 * * Реализация начальной загрузки карточек
 */

const cardsContainer = document.querySelector(".elements");

initialCards.forEach((initialCard) => {
  cardsContainer.append(createCard(initialCard));
});

/** @function Создаёт карточку для профиля пользователя
 * @name createCard
 * @param {object} cardObject передаваемый объект содержит имя и ссылку для изображения.
 * @return {HTMLElement}
 */

function createCard(cardObject) {
  const template = document.querySelector("#element").content;

  const card = template.querySelector(".element").cloneNode(true);

  card.querySelector(".element__image").src = cardObject.link;
  card.querySelector(".element__image").alt = cardObject.name;
  card.querySelector(".element__text").textContent = cardObject.name;

  const likeCard = card.querySelector(".element__like");
  const removeCard = card.querySelector(".element__remove");
  const showCard = card.querySelector(".element__image");

  likeCard.addEventListener("click", () => {
    likeCard.classList.toggle("element__like_active");
  });

  removeCard.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.closest(".element").remove();
  });

  showCard.addEventListener("click", (event) => {
    event.preventDefault();
    showCardImage.src = cardObject.link;
    showCardImage.alt = cardObject.name;
    showCardTitle.textContent = cardObject.name;
    showCardPopup.classList.add("popup_opened");
  });

  return card;
}

// /**
//  * * Реализация создания карточки
//  */

const createCardButton = document.querySelector(".profile__add-button");
const closeCreateCardPopup = document.querySelector("#closeCreateCard");

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
  event.preventDefault();
  imageName.value = "";
  imageLink.value = "";
  openPopup(сreateCardPopup);
});

closeCreateCardPopup.addEventListener("click", (event) => {
  closePopup(сreateCardPopup);
});
