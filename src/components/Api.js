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

  editProfile(data) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._id}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => data);
  }

  createCard(data) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards `, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseData(res));
  }

  addLike(cardID) {
    fetch(
      `https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardID}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    );
  }

  removeLike(cardID) {
    fetch(
      `https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardID}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    );
  }

  createAvatar(data) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._id}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  removeCard(cardId) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    });
  }
}
