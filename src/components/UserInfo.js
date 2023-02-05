// * class Section отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
  // * Params
  // ? object: Объект, который содержит в себе селекторы для полей профиля
  // ? userNameSelector: селектор имени пользователя
  // ? userDescriptionSelector: селектор описания пользователя
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._nameElement = document.querySelector(userNameSelector);
    this._descriptionElement = document.querySelector(userDescriptionSelector);
  }

  // * getUserInfo возвращает объект, в котором содержится имя и описание пользователя
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  // * setUserInfo принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.description;
  }
}
