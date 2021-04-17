// Класс, отвечающий за подтверждение удаления карточки
import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.form');
    this._submitButton = this._popupElement.querySelector('.form__submit-button');
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

  buttonText (text) {
    this._submitButton.textContent = text;
}

  close(){
    super.close();
    this._formElement.removeEventListener('submit', this._handleSubmit);
  }

}
