// Функция добавления класса с ошибкой
function showInputError(formElement, inputElement, errorMessage, initObj){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Выбираем элемент ошибки на основе привязки id поля к уникальному классу ошибки
  inputElement.classList.add(initObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(initObj.errorClass);
}

// Функция удаления класса с ошибкой
function hideInputError(formElement, inputElement, initObj){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Выбираем элемент ошибки на основе привязки id поля к уникальному классу ошибки
  inputElement.classList.remove(initObj.inputErrorClass);
  errorElement.classList.remove(initObj.errorClass);
  errorElement.textContent = '';
}

// Функция проверки валидности поля
function isValid(formElement, inputElement, initObj){
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, initObj);
  }
  else {
    hideInputError(formElement, inputElement, initObj);
  }
}

// Функция добавления слушателей всем полям ввода формы
function setEventListeners(formElement, initObj) {
  const inputElementArray = Array.from(formElement.querySelectorAll(initObj.inputSelector)); // Находим поля и создаем массив
  const submitButtonElement = formElement.querySelector(initObj.submitButtonSelector); // Находим кнопку submit
  toggleButtonState(inputElementArray, submitButtonElement, initObj); // Изначально кнопка заблокирована
  inputElementArray.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, initObj);
      toggleButtonState(inputElementArray, submitButtonElement, initObj);
    });
  });
};

// Функция добавления обработчиков всем формам с помощью setEventListeners
function enableValidation(initObj){
  const formElementArray = Array.from(document.querySelectorAll(initObj.formSelector)); // Находим формы и создаем массив
  formElementArray.forEach((formElement) => {
    setEventListeners(formElement, initObj); // Для каждой формы вызовем функцию setEventListeners,
  });
};

// Функция проверки валидности полей формы (возвращает true, если хотя бы одно поле не валидно)
const hasInvalidInput = (inputElementArray) => {
  return inputElementArray.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Функция изменения состояния кнопки submit
const toggleButtonState = (inputElementArray, submitButtonElement, initObj) => {
  if (hasInvalidInput(inputElementArray)) {
    submitButtonElement.classList.add(initObj.inactiveButtonClass);
  }
  else {
    submitButtonElement.classList.remove(initObj.inactiveButtonClass);
  }
}


// Включаем валидацию и передаем исходные данные (значения селекторов)
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
})
