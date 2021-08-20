class Api {
  constructor({baseUrl, token}) {
    this._url = baseUrl
    this._token = token
  }

  _checkResponse(res) {//ПРОВЕРКА ЗАПРОСА
      if(res.ok) {
        return res.json()
      } else {
        return Promise.reject(`${res.status}`)
      }
  }

  getCards() {  //ПОЛУЧИТЬ КАРТОЧКИ С СЕРВЕРА
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  getUserData() { //ПОЛУЧИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }

  editProfileInfo({name, about}) {  //ИЗМЕНИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
    .then(this._checkResponse)
  }

  addNewCard({name, link}) {  //ДОБАВИТЬ НОВУЮ КАРТОЧКУ
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(card) {  //УДАЛИТЬ КАРТОЧКУ
    return fetch(`${this._url}/cards/${card._id}`, {
      method: 'DELETE',
      headers: {
          authorization: this._token,
      }
  })
    .then(this._checkResponse)
  }

  addLike(card) { //ПОСТАВИТЬ ЛАЙК
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: 'PUT',
      headers: {
          authorization: this._token,
      }
  })
    .then(this._checkResponse)
  }

  removeLike(card) {  //УБРАТЬ ЛАЙК
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: {
          authorization: this._token,
      }
  })
    .then(this._checkResponse)
  }

  edidProfileAvatar({avatar}) { //ИЗМЕНИТЬ ФОТО ПРОФИЛЯ
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse)
  }
}



const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  token: "997275f5-db75-4740-889c-9561326b8f49",
});

export default api