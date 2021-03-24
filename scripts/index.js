import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

/* --- Переменные ---*/

const popups = document.querySelectorAll('.popup'); // все popup-блоки
const cardAddButton = document.querySelector('.profile__add-button'); // ссылка на кнопку добавления новой карточки
const cardsContainer = document.querySelector('.cards'); // ссылка на grid-контейнер, в котором размещаются карточки
// Переменные popup-блока добавления карточки
const cardAddPopup = document.querySelector('.popup_type_card-add');
// Переменные блока profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
// Переменные popup-блока редактирования информации о пользователе
const profileEditPopup = document.querySelector('.popup_type_profile-edit');
// Переменные popup-блока zoom
const zoomPopup = document.querySelector('.popup_type_zoom');
const zoomImage = zoomPopup.querySelector('.zoom__image');
const zoomCaption = zoomPopup.querySelector('.zoom__caption');
// Добавляем формы
const profileEditForm = document.forms.edit; // форма редактирования профиля
const nameInput = profileEditForm.elements.username;
const descriptionInput = profileEditForm.elements.description;
const cardAddForm = document.forms.add; // форма добавления карточки
const titleInput = cardAddForm.elements.title;
const urlInput = cardAddForm.elements.url;

// Исходные данные (значения селекторов) для валидатора форм
const validatorData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}


/* --- Функции --- */

// Функция показа popup
function showPopup(el){
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape); // добавляем слушатель кнопки Esc
}

// Функция скрытия popup
function hidePopup(el){
  el.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); // убираем слушатель кнопки Esc
}

// Функция открытия popup при клике на картинку
function cardZoom(image, title) {
  zoomImage.src = image;
  zoomCaption.textContent = title;
  showPopup(zoomPopup);
}

// Функция сохранения введенной информации профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    hidePopup(profileEditPopup);
}

// Функция создания новой карточки
function createCard(data, cardSelector){
  const newCard = new Card(data, cardSelector, cardZoom);
  const newCardElement = newCard.generateCard();
  return newCardElement;
}

// Функция добавления новой карточки пользователем
function addUserCard(evt){
  evt.preventDefault();
  cardsContainer.prepend(createCard({image: urlInput.value, title: titleInput.value}, '.card-template'));
  cardAddForm.reset(); //очищаем форму
  hidePopup(cardAddPopup);
}

// Функция закрытия popup кнопкой Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    hidePopup(openedPopup);
  }
}



/* События и действия */


// Добавляем исходные карточки из массива в DOM
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item, '.card-template'));
});


// Открытие popup редактирования профиля с заполнением полей ввода текущими значениями
profileEditButton.addEventListener('click', function(){
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  showPopup(profileEditPopup);
});

// Сохранение введенной информации профиля при клике на кнопку "Сохранить"
profileEditForm.addEventListener('submit', formSubmitHandler);

// Открытие новой карточки
cardAddButton.addEventListener('click', () => showPopup(cardAddPopup));

// Сохранение новой карточки
cardAddForm.addEventListener('submit', addUserCard);


// Закрытие всех popup кликом на оверлей или крестик
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        hidePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        hidePopup(popup)
      }
  })
})

// Включаем валидацию форм
const profileEditFormValidate = new FormValidator(profileEditForm, validatorData);
profileEditFormValidate.enableValidation();
const cardAddFormValidate = new FormValidator(cardAddForm, validatorData);
cardAddFormValidate.enableValidation();
