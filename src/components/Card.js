// * Card создаёт карточку путешествия
export default class Card {
  // * Params:
  // ? {owner, name, link, likes, _id} — объект владельца карточки, название, URL ссылка, массив объектов лайкнувших, идентификатор карточки
  // ? templateSelector — строка на селектор шаблон вёртски для карточки
  // ? openPopup — обработчик, который связывает карточку с popup'ом
  constructor(
    { owner, name, link, likes, _id },
    templateSelector,
    openPopup,
    deletePopup,
    userID,
    likeHandleClick,
    removeCardHandler
  ) {
    this._userID = userID;
    this._owner = owner;
    this._cardId = _id;
    this._link = link;
    this._title = name;
    this._likes = likes;
    this._templateSelector = templateSelector;

    this._openPopup = openPopup;
    this._deletePopup = deletePopup;

    this._likeHandleClick = likeHandleClick;

    this._removeCardHandler = removeCardHandler;

    this.isOwner = this._userID === this._owner._id;
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userID);
  }

  setLikes(likes) {
    this._likes = likes;
    this._updateLikesView();
  }

  _updateLikesView() {
    this._element.querySelector(".element__like-counter").textContent =
      this._likes.length;
    if (this.isLiked()) {
      this._likeIcon.classList.add("element__like_active");
    } else {
      this._likeIcon.classList.remove("element__like_active");
    }
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  remove() {
    this._element.remove();
    this._element = null;
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

    // * Удялаем иконку корзины, если не мы владелец карточки
    if (!this.isOwner) {
      this._deleteBtn.remove();
    }

    // * Для наших собственных лайков
    this._updateLikesView();

    return this._element;
  }

  // * Навешиваем слушателей
  _setEventListeners() {
    // ! Используем делегирование на целую карточку
    this._element.addEventListener("click", (event) => {
      if (event.target.classList.contains("element__like")) {
        this._likeHandleClick(this._cardId, this);
        return;
      }
      if (event.target.classList.contains("element__image")) {
        this._openPopup(this._link, this._title);
        return;
      }
      if (event.target.classList.contains("element__remove")) {
        this._removeCardHandler(this);
      }
    });
  }
}
