class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  changeLikeCardStatus(id, likeStatus) {
    if (likeStatus) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}
const api = new Api({
  baseUrl: "https://api.leonov.nomoredomains.sbs",
  headers: {
    "Content-Type": "application/json",
    "Accept":"application/json",
    "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmZjYTc0YmY0ZDZlODczNTcwNzIxMGIiLCJpYXQiOjE2NjA4MjMzNDgsImV4cCI6MTY2MDkwOTc0OH0.i20WCl5B-EYQP8U-nzaQ7f7O5gJ2RYwUUipakTvgrDY"
  },
});

export { api };
