// * class Section отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
  // * Params
  // ? object: Объект, который содержит в себе селекторы для полей профиля
  // ? name: селектор имени пользователя
  // ? description: селектор описания пользователя
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  // * getUserInfo возвращает объект, в котором содержится имя и описание пользователя
  getUserInfo() {
    return {
      name: this._name,
      description: this._description,
    };
  }

  // * setUserInfo принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._name = data.name;
    this._description = data.description;
  }
}
