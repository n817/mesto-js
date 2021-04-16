export default class Api {
  constructor({cardsUrl, userUrl, headers}) {
    this._cardsUrl = cardsUrl;
    this._userUrl = userUrl;
    this._headers = headers;
    this._authorization = headers.authorization;
  }

  // Получение информации о пользователе с сервера
  getUserInfo() {
    return fetch(this._userUrl, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // Загрузка новой информации о пользователе на сервер
  patchUserInfo(formData) {
    return fetch(this._userUrl, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: formData.username,
      about: formData.description
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // Загрузка аватара пользователя на сервер
  patchUserAvatar(formData) {
    return fetch(`${this._userUrl}/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: formData.link,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // Получение массива карточек с сервера
  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // Загрузка новой карточки на сервер
  postNewCard(formData) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: formData.cardname,
        link: formData.url
        })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // Лайк и удаление лайка карточки
  toggleCardLike({methodName, cardId}) {
    return fetch(`${this._cardsUrl}/likes/${cardId}`, {
      method: methodName,
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // Удаление карточки на сервере
  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

}

