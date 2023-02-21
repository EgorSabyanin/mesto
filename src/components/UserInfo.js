// * class Section отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
  // * Params
  // ? object: Объект, который содержит в себе селекторы для полей профиля
  // ? userNameSelector: селектор имени пользователя
  // ? userDescriptionSelector: селектор описания пользователя
  constructor({
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector,
  }) {
    this._nameElement = document.querySelector(userNameSelector);
    this._descriptionElement = document.querySelector(userDescriptionSelector);
    this._avatarElement = document.querySelector(userAvatarSelector);
  }

  // * getUserInfo возвращает объект, в котором содержится имя и описание пользователя
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  // * setUserInfo принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    if (data.name) this._nameElement.textContent = data.name;
    if (data.description)
      this._descriptionElement.textContent = data.description;
    if (data.avatar) this._descriptionElement.textContent = data.description;
  }
}
