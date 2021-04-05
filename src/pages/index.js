import './index.css'; // импорт главного файла стилей для webpack
import initialCards from '../utils/initialCards.js'; // импорт начальных карточек

// Импортируем классы

import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js';


// Импортируем константы

import {
  cardAddButton,
  profileEditButton,
  profileEditForm,
  nameInput,
  descriptionInput,
  cardAddForm,
  validatorData}
from '../utils/constants.js';


// Создаем экземпляр класса Section для отрисовки элементов на странице
const cardsSection = new Section({items: initialCards, renderer: createCard}, '.cards');

// Добавляем исходные карточки из массива в DOM
cardsSection.renderItems();

// Создаем экземпляр класса PopupWithForm для добавления новой карточки пользователем
const cardForm = new PopupWithForm({
  popupSelector: '.popup_type_card-add',
  handleFormSubmit: (formData) => {
    const newCardData = {image: formData.url, title: formData.title}; // Получаем данные из формы
    const newCard = createCard(newCardData); // Создаем новую карточку
    cardsSection.addItem(newCard); // Добавляем ее в DOM
    cardForm.close();
  }
});

// Создаем экземпляр класса PopupWithImage для открытия картинки
const popupWithImage = new PopupWithImage('.popup_type_zoom');

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
  popupWithImage.open({image, title});
}



/* События и действия */


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
