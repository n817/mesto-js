// Класс, отвечающий за открытие и закрытие popup
export default class Popup {

  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    this.setEventListeners();
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleClickClose); // добавляем слушатель клика
    document.addEventListener('keydown', this._handleEscClose); // добавляем слушатель кнопки Esc
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this._popupElement.removeEventListener('click', this._handleClickClose); // убираем слушатель клика
    document.removeEventListener('keydown', this._handleEscClose); // убираем слушатель кнопки Esc
  }

}
