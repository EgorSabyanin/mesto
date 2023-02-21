export default class Api {
  constructor(options) {
    this._id = options.id;
    this._token = options.token;
    this._api = options.api;

    this.addLike = this.addLike.bind(this);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUser() {
    return fetch(`https://nomoreparties.co/v1/${this._id}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._api}/${this._id}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editUserProfile(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  createCard(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards `, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  removeCard(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }

  addLike(cardID) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardID}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }

  removeLike(cardID) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardID}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }

  createAvatar(data) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._id}/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      }
    ).this((res) => {
      return this._getResponseData(res);
    });
  }
}
