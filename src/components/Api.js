export default class Api {
  constructor(options) {
    this._id = options.id;
    this._token = options.token;
    this._api = options.api;
  }

  getUser() {
    return fetch(`https://nomoreparties.co/v1/${this._id}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      });
  }

  getInitialCards() {
    return fetch(`${this._api}/${this._id}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      });
  }

  editProfile(name, about) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._id}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  createCard(name, link) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards `, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }
}
