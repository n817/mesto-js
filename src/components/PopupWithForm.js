// Класс, отвечающий за работу форм (открытие, закрытие, сохранение информации)
import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.form');
    this._submitButton = this._popupElement.querySelector('.form__submit-button');
    this._inputList = this._formElement.querySelectorAll('.form__input');  // Создаем массив из всех полей формы
    this._handleSubmit = this._handleSubmit.bind(this);

  }

  // Метод сбора данных всех полей формы
  _getInputValues(){
    this._formValues = {}; // создаем пустой объект

    // добавляем в этот объект значения всех полей формы
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
    });

    // возвращаем объект со значениями полей

    return this._formValues;
  }

  _handleSubmit(evt){
    evt.preventDefault();
    // вызываем функцию _handleFormSubmit и передаем ей объект (данные полей формы) — результат работы _getInputValues
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmit);
  }

  buttonText (text) {
      this._submitButton.textContent = text;
  }

  close(){
    super.close();
    this._formElement.removeEventListener('submit', this._handleSubmit);
    this._formElement.reset();
  }

}
