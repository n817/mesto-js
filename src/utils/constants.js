/* --- Переменные ---*/

const cardAddButton = document.querySelector('.profile__add-button'); // ссылка на кнопку добавления новой карточки
const profileEditButton = document.querySelector('.profile__edit-button'); // ссылка на кнопку редактирования профиля

// Добавляем формы
const profileEditForm = document.forms.edit; // форма редактирования профиля
const nameInput = profileEditForm.elements.username;
const descriptionInput = profileEditForm.elements.description;
const cardAddForm = document.forms.add; // форма добавления карточки

// Исходные данные (значения селекторов) для валидатора форм
const validatorData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export {
  cardAddButton,
  profileEditButton,
  profileEditForm,
  nameInput,
  descriptionInput,
  cardAddForm,
  validatorData };
