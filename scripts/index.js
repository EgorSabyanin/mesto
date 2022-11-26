let editButton = document.querySelector(".profile__edit-button");
let closeForm = document.querySelector(".popup__close");

let userName = document.querySelector(".profile__name");
let userJob = document.querySelector(".profile__job");

let popup = document.querySelector(".popup");

let popupForm = document.querySelector(".popup-form");

// Находим поля формы в DOM
let nameInput = popupForm.querySelector(".popup-form__input_el_name");
let jobInput = popupForm.querySelector(".popup-form__input_el_job");

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
