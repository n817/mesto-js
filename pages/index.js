import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../utils/FormValidator.js';

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
}


// Экземпляры форм

const cardForm = new PopupWithForm({
  popupSelector: '.popup_type_card-add',
  handleFormSubmit: (formData) => {
    const newCard = [{image: formData.url, title: formData.title}];
    const newCardSection = new Section({items: newCard, renderer: createCard}, '.cards');
    newCardSection.renderItems();
    cardForm.close();
  }
});


const userForm = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    userForm.close();
  }
});


const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description'
})


/* --- Функции --- */

// Функция создания новой карточки
function createCard(data){
  const newCard = new Card(data, '.card-template', handleCardClick);
  const newCardElement = newCard.generateCard();
  return newCardElement;
}

// Функция открытия popup с картинкой при клике на карточку
function handleCardClick({image, title}) {
  const PopupWithImageElement = new PopupWithImage('.popup_type_zoom', {image, title});
  PopupWithImageElement.open();
}



/* События и действия */

// Добавляем исходные карточки из массива в DOM
const initialCardsSection = new Section({items: initialCards, renderer: createCard}, '.cards');
initialCardsSection.renderItems();

// Открытие новой карточки
cardAddButton.addEventListener('click', () => cardForm.open());

// Открытие popup редактирования профиля
profileEditButton.addEventListener('click', function(){
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.currentUserName;
  descriptionInput.value = currentUserInfo.currentUserDescription;
  userForm.open();
});

// Включаем валидацию форм
const profileEditFormValidate = new FormValidator(profileEditForm, validatorData);
profileEditFormValidate.enableValidation();
const cardAddFormValidate = new FormValidator(cardAddForm, validatorData);
cardAddFormValidate.enableValidation();
