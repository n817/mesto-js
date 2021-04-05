// Класс валидации форм
export default class FormValidator {
  constructor(form, data){
    this._form = form;
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  // Функция добавления класса с ошибкой
  _showInputError(inputElement, errorMessage){
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // Выбираем элемент ошибки на основе привязки id поля к уникальному классу ошибки
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Функция удаления класса с ошибкой
  _hideInputError(inputElement){
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // Выбираем элемент ошибки на основе привязки id поля к уникальному классу ошибки
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Функция проверки валидности поля
  _isValid(inputElement){
    if (!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  // Функция проверки валидности полей формы (возвращает true, если хотя бы одно поле не валидно)
  _hasInvalidInput = (inputElementArray) => {
    return inputElementArray.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // Функция изменения состояния кнопки submit
  _toggleButtonState = (inputElementArray, submitButtonElement) => {
    if (this._hasInvalidInput(inputElementArray)) {
    submitButtonElement.classList.add(this._inactiveButtonClass);
    }
    else {
    submitButtonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  // Функция включения валидации формы (добавление обработчиков полям ввода)
  enableValidation () {
    const inputElementArray = Array.from(this._form.querySelectorAll(this._inputSelector)); // Находим поля и создаем массив
    const submitButtonElement = this._form.querySelector(this._submitButtonSelector); // Находим кнопку submit
    this._toggleButtonState(inputElementArray, submitButtonElement); // Изначально кнопка заблокирована

    inputElementArray.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputElementArray, submitButtonElement);
      });
    });

    this._form.addEventListener('reset', () => { // Деактивируем кнопку сабмита и очищаем ошибки при событии 'reset'
      inputElementArray.forEach((inputElement) => {
          this._hideInputError(inputElement);
          submitButtonElement.classList.add(this._inactiveButtonClass);
      })
  });

  }
}
