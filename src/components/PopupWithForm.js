import Popup from './Popup.js';
// Класс, отвечающий за работу форм (открытие, закрытие, сохранение информации)
export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.form');
    this._submitButton = this._popupElement.querySelector('.form__submit-button');
    this._handleSubmit = this._handleSubmit.bind(this);

  }

  // Метод сбора данных всех полей формы
  _getInputValues(){
    // Создаем массив из всех полей формы
    this._inputList = this._formElement.querySelectorAll('.form__input');

    // создаем пустой объект
    this._formValues = {};

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

  dataLoading (isLoading, originalTextContent) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    }
    else {
      this._submitButton.textContent = originalTextContent;
    }
  }

  close(){
    super.close();
    this._formElement.removeEventListener('submit', this._handleSubmit);
    this._formElement.reset();
  }

}
