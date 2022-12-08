const editButton = document.querySelector(".profile__edit-button");
const closeForm = document.querySelector(".popup__close");

const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");

const popup = document.querySelector(".popup");

const popupForm = document.querySelector(".popup-form");

// Находим поля формы в DOM
const nameInput = popupForm.querySelector(".popup-form__input_el_name");
const jobInput = popupForm.querySelector(".popup-form__input_el_job");

popupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
});

editButton.addEventListener("click", function (event) {
  event.preventDefault();
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  popup.classList.add("popup_opened");
});

closeForm.addEventListener("click", function (event) {
  event.preventDefault();
  popup.classList.remove("popup_opened");
});

/**
 * * Реализация начальной загрузки карточек
 */

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsContainer = document.querySelector(".elements");

initialCards.forEach((initialCard) => {
  const cardTemplate = document.querySelector("#element").content;
  const card = cardTemplate.querySelector(".element").cloneNode(true);

  card.querySelector(".element__image").alt = initialCard.name;
  card.querySelector(".element__image").src = initialCard.link;

  card.querySelector(".element__text").textContent = initialCard.name;

  cardsContainer.append(card);
});

function createCards(container, template, name, link) {
  const card = template.querySelector(".element").cloneNode(true);

  card.querySelector(".element__image").src = link;
  card.querySelector(".element__image").alt = name;
  card.querySelector(".element__text").textContent = name;

  container.prepend(card);
}

/**
 * * Реализация кнопки лайка на карточках
 */

const cardLikes = document.querySelectorAll(".element__like");

cardLikes.forEach((cardLike) => {
  cardLike.addEventListener("click", (event) => {
    cardLike.classList.toggle("element__like_active");
  });
});

/**
 * * Реализация создания карточки
 */

const createCardButton = document.querySelector(".profile__add-button");
const closeCreateCardButton = document.querySelector("#closeCreateCard");

const imageName = document.querySelector(".popup-form__input_el_name-of-image");
const imageLink = document.querySelector(".popup-form__input_el_link-of-image");

const сreateCardModal = document.querySelector("#createCardModal");

const createCardModalForm = document.querySelector("#createCardModalForm");

createCardModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let card = {};
  card.name = imageName.value;
  card.link = imageLink.value;
  const cardTemplate = document.querySelector("#element").content;
  createCards(cardsContainer, cardTemplate, card.name, card.link);
  сreateCardModal.classList.remove("popup_opened");
  const cardLike = document.querySelector(".element__like");

  cardLike.addEventListener("click", (event) => {
    cardLike.classList.toggle("element__like_active");
  });

  const cardRemove = document.querySelector(".element__remove");

  cardRemove.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.parentElement.remove();
  });

  const imageOfCard = document.querySelector(".element__image");

  imageOfCard.addEventListener("click", (event) => {
    event.preventDefault();
    showImage.src = event.target.src;
    showImageTitle.textContent = event.target.alt;
    showCardModal.classList.add("popup_opened");
  });
});

createCardButton.addEventListener("click", function (event) {
  event.preventDefault();
  imageName.value = "";
  imageLink.value = "";
  сreateCardModal.classList.add("popup_opened");
});

closeCreateCardButton.addEventListener("click", function (event) {
  event.preventDefault();
  imageName.value = "";
  imageLink.value = "";
  сreateCardModal.classList.remove("popup_opened");
});

/**
 * * Реализация удаления карточки
 */

const cardsRemove = document.querySelectorAll(".element__remove");

cardsRemove.forEach((cardRemove) => {
  cardRemove.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.parentElement.remove();
  });
});

/**
 * * Реализация модального окна показа изображения
 */

const showCardModal = document.querySelector("#showCardModal");
const closeShowCard = document.querySelector("#closeShowCard");

const imagesOfCards = document.querySelectorAll(".element__image");

const showImage = document.querySelector(".popup__image");
const showImageTitle = document.querySelector(".popup__title");

imagesOfCards.forEach((imageOfCard) => {
  imageOfCard.addEventListener("click", (event) => {
    event.preventDefault();
    showImage.src = event.target.src;
    showImageTitle.textContent = event.target.alt;
    showCardModal.classList.add("popup_opened");
  });
});

closeShowCard.addEventListener("click", (event) => {
  event.preventDefault();
  showCardModal.classList.remove("popup_opened");
});
