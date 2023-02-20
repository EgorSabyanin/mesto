// * Card создаёт карточку путешествия
export default class Card {
  // * Params:
  // ? {title, link} — строковые значения; название карточки и ссылка
  // ? templateSelector — строка на селектор шаблон вёртски для карточки
  // ? openPopup — обработчик, который связывает карточку с popup'ом
  constructor(
    { owner, name, link, likes, _id },
    templateSelector,
    openPopup,
    deletePopup,
    personalPromise,
    likeAddHandler,
    likeRemoveHandler,
    removeCardHandler
  ) {
    this._personalPromise = personalPromise;
    this._owner = owner;
    this._cardId = _id;
    this._link = link;
    this._title = name;
    this._likes = likes;
    this._templateSelector = templateSelector;

    this._openPopup = openPopup;
    this._deletePopup = deletePopup;

    this._likeAddHandler = likeAddHandler;
    this._likeRemoveHandler = likeRemoveHandler;

    this._removeCardHandler = removeCardHandler;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _removeCard() {
    this._removeCardHandler(this._cardId);
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  _like(event) {
    if (event.target.classList.contains("element__like_active")) {
      event.target.classList.remove("element__like_active");
      this._likeRemoveHandler(this._cardId);
    } else {
      event.target.classList.add("element__like_active");
      this._likeAddHandler(this._cardId);
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".element__image");
    this._likeIcon = this._element.querySelector(".element__like");
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this._deleteBtn = this._element.querySelector(".element__remove");

    this._setEventListeners();

    this._image.src = this._link;
    this._image.alt = this._title;
    this._likeCounter.textContent = this._likes.length;
    this._element.querySelector(".element__text").textContent = this._title;

    this._personalPromise.then((res) => {
      if (this._owner._id !== res._id) {
        this._deleteBtn.remove();
      }
    });

    this._personalPromise.then((res) => {
      this._likes.forEach((userLiked) => {
        if (userLiked._id === res._id) {
          this._likeIcon.classList.add("element__like_active");
        }
      });
    });

    return this._element;
  }

  // * Навешиваем слушателей
  _setEventListeners() {
    // ! Используем делегирование на целую карточку
    this._element.addEventListener("click", (event) => {
      if (event.target.classList.contains("element__like")) {
        this._like(event);
        return;
      }
      if (event.target.classList.contains("element__image")) {
        this._openPopup(this._link, this._title);
        return;
      }
      if (event.target.classList.contains("element__remove")) {
        console.error(this);
        this._removeCardHandler(this._cardId);
        // this._deletePopup.open();
        // this._removeCard();
      }
    });
  }
}
