let openForm = document.querySelector(".profile__edit-button");
let closeForm = document.querySelector(".popup__close");

let userName = document.querySelector(".profile__name");
let userJob = document.querySelector(".profile__job");

let popup = document.querySelector(".popup");

let popupForm = document.querySelector(".popup-form");

// Находим поля формы в DOM
let nameInput = popupForm.querySelector(".popup-form__input[name='name']");
let jobInput = popupForm.querySelector(".popup-form__input[name='job']");

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
}

popupForm.addEventListener("submit", formSubmitHandler);

openForm.addEventListener("click", function (event) {
  event.preventDefault();
  popup.classList.add("popup_opened");
});

closeForm.addEventListener("click", function (event) {
  event.preventDefault();
  popup.classList.remove("popup_opened");
});

window.addEventListener("load", (event) => {
  event.preventDefault();
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
});
