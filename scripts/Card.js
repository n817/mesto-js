export default class Card {
  constructor(data, cardSelector, cardZoom){
    this._image = data.image;
    this._title = data.title;
    this._cardSelector = cardSelector;
    this._cardZoom = cardZoom; // Функция открытия popup при клике на картинку
  }

  // Функция создания карточки из template
  _getTemplate() {
    const newCard = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return newCard;
  }

  // Функция заполнения карточки данными (картинка, значение alt и подпись)
  generateCard() {
    this._element = this._getTemplate(); // Запишем разметку в приватное поле _element, чтобы у других элементов появился доступ к ней
    this._setEventListeners(); // Добавим обработчики событий
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    return this._element;
  }

  // Функция обработки событий
  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._cardLike();
    });
    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._cardRemove();
    })
    this._element.querySelector('.card__image-button').addEventListener('click', () => {
      this._cardZoom(this._image, this._title);
    })
  };

  // Функция лайка карточки
  _cardLike() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  // Функция удаления карточки
  _cardRemove() {
    this._element.remove();
  }
}

