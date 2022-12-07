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

const cardLikes = document.querySelectorAll(".element__like");

cardLikes.forEach((cardLike) => {
  cardLike.addEventListener("click", (event) => {
    cardLike.classList.toggle("element__like_active");
  });
});
