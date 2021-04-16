import Popup from './Popup.js';

// Класс, отвечающий за подтверждение удаления карточки
export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.form');
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  open(element, cardId) {
    this._element = element;
    this._cardId = cardId;
    super.open();

  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmit);
  }


  _handleSubmit(evt){
    evt.preventDefault();
    this._handleFormSubmit(this._element, this._cardId);
  }


  close(){
    super.close();
    this._formElement.removeEventListener('submit', this._handleSubmit);
  }

}
