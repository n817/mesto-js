// Класс создания карточки
export default class Card {
  constructor(data, cardSelector, handleCardClick){
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick; // Функция открытия popup при клике на картинку
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
  generateCard(api, confirmForm, userId) {
    this._api = api;
    this._confirmForm = confirmForm;
    this._userId = userId;
    this._element = this._getTemplate(); // Запишем разметку в приватное поле _element, чтобы у других элементов появился доступ к ней
    this._cardlink = this._element.querySelector('.card__image');
    this._cardName = this._element.querySelector('.card__title');
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._cardLikesCounter = this._element.querySelector('.card__likes-counter');
    this._cardDeleteButton = this._element.querySelector('.card__trash-button');
    this._setEventListeners(); // Добавим обработчики событий
    this._cardlink.src = this._link;
    this._cardlink.alt = this._name;
    this._cardName.textContent = this._name;
    this._cardLikesCounter.textContent = this._likes.length;
    if (this._cardOwnerId === this._userId){ // добавляем нашим карточкам иконку корзины
      this._cardDeleteButton.classList.add('card__trash-button_active');
    }
    this._likes.forEach((element) => { // отображаем лайк карточек, которым мы ставили лайк
      if (element._id === this._userId) {
        this._togglelikeIcon ();
      }
    });
    return this._element;
  }

  // Функция обработки событий
  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => { // Лайк карточки
      if (!this._cardLikeButton.classList.contains('card__like-button_active')) {
        this._togglelikeIcon();
        this._api.toggleCardLike({
          methodName: 'PUT',
          cardId: this._cardId,
        })
        .then((res) => {
          this._cardLikesCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
      }
      else {
        this._togglelikeIcon();
        this._api.toggleCardLike({
          methodName: 'DELETE',
          cardId: this._cardId,
        })
        .then((res) => {
          this._cardLikesCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
      }
    });
    this._cardDeleteButton.addEventListener('click', () => {
      this._confirmForm.open(this._element, this._cardId); // Подтверждение удаления карточки
    })
    this._element.querySelector('.card__image-button').addEventListener('click', () => {
      this.handleCardClick({link: this._link, name: this._name});
    })
  };

  // Функция переключения иконки лайка карточки
  _togglelikeIcon () {
    this._cardLikeButton.classList.toggle('card__like-button_active');
  }

}

