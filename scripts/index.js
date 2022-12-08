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

  container.append(card);
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
 * * Реализация удаления карточки
 */

const cardRemoves = document.querySelectorAll(".element__remove");

cardRemoves.forEach((cardRemove) => {
  cardRemove.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.parentElement.remove();
  });
});
