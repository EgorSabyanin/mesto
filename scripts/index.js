const popups = document.querySelectorAll(".popup");

document.body.addEventListener("keydown", (event) => {
  const openPopup = document.querySelector(".popup_opened");

  if (event.key === "Escape") closePopup(openPopup);
});

popups.forEach((popup) => {
  /**
   * * Делегирование события клика (при нажатии на оверлей, при нажатии на крестик)
   */
  popup.addEventListener("click", (event) => {
    const targetPopup = event.target.closest(".popup");
    const targetElement = event.target;

    if (
      targetElement.classList.contains("popup__close") ||
      targetElement.classList.contains("popup")
    ) {
      closePopup(targetPopup);
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
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPopup(editProfilePopup);
});

//  * * Реализация модального окна показа изображения
//  */

const showCardPopup = document.querySelector("#showCardPopup");
const showCardImage = showCardPopup.querySelector(".popup__image");
const showCardTitle = showCardPopup.querySelector(".popup__title");

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

  const likeCard = card.querySelector(".element__like");
  const removeCard = card.querySelector(".element__remove");
  const showCard = card.querySelector(".element__image");
  const titleCard = card.querySelector(".element__text");

  showCard.src = cardObject.link;
  showCard.alt = cardObject.name;
  titleCard.textContent = cardObject.name;

  likeCard.addEventListener("click", () => {
    likeCard.classList.toggle("element__like_active");
  });

  removeCard.addEventListener("click", (event) => {
    event.target.closest(".element").remove();
  });

  showCard.addEventListener("click", (event) => {
    showCardImage.src = cardObject.link;
    showCardImage.alt = cardObject.name;
    showCardTitle.textContent = cardObject.name;
    openPopup(showCardPopup);
  });

  return card;
}

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
  imageName.value = "";
  imageLink.value = "";
  openPopup(сreateCardPopup);
});
