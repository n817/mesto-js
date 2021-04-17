import './index.css'; // импорт главного файла стилей для webpack

// Импортируем классы

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js'
import FormValidator from '../components/FormValidator.js';

// Импортируем константы

import {
  cardAddButton,
  profileEditButton,
  avatarEditButton,
  profileEditForm,
  avatarEditForm,
  nameInput,
  descriptionInput,
  cardAddForm,
  validatorData}
from '../utils/constants.js';


// Создаем экземпляр класса взаимодействия с API сервера
const api = new Api({
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-22/cards',
  userUrl: 'https://mesto.nomoreparties.co/v1/cohort-22/users/me',
  headers: {
    authorization: '515ca80d-3822-4c04-8086-34127dceee10',
    'Content-Type': 'application/json'
  }
});


/* --- Получаем исходные данные с сервера и загружаем на страницу --- */

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then((res) => {
    const [userData, initialCards] = res;
    // Загружаем на страницу данные пользователя
    userInfo.setUserInfo({
      username: userData.name,
      description: userData.about,
      userId: userData._id
    });
    userInfo.setUserAvatar(userData.avatar);
    // Загружаем на страницу карточки
    cardsSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });




/* --- Взаимодействие с профилем пользователя --- */


// Создаем экземпляр класса работы с профилем пользователя
const userInfo = new UserInfo({
  userAvatarSelector: '.profile__avatar',
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description'
})


// Реализуем возможность редактирования профиля пользователя
profileEditButton.addEventListener('click', function(){
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.currentUserName;
  descriptionInput.value = currentUserInfo.currentUserDescription;
  userForm.open();
});

const userForm = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (formData) => {
    userForm.buttonText('Сохранение...');
    userInfo.setUserInfo(formData);
    api.patchUserInfo(formData)
      .then(() => {
        userForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        userForm.buttonText('Cохранить');
      });
  }
});


// Реализуем возможность обновления аватара пользователя
avatarEditButton.addEventListener('click', function(){
  avatarForm.open();
});

const avatarForm = new PopupWithForm({
  popupSelector: '.popup_type_avatar-edit',
  handleFormSubmit: (formData) => {
    avatarForm.buttonText('Сохранение...');
    api.patchUserAvatar(formData)
      .then(() => {
        userInfo.setUserAvatar(formData.url);
        avatarForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarForm.buttonText('Cохранить');
      });
  }
})



/* --- Взаимодействие с карточками --- */

// Создаем экземпляр класса PopupWithConfirmation для подтверждения удаления карточки
const confirmForm = new PopupWithConfirmation({
  popupSelector: '.popup_type_confirm-delete',
  handleFormSubmit: (element, cardId) => {
    confirmForm.buttonText('Удаление...');
    api.deleteCard(cardId)
    .then((res) => {
      console.log(res);
      confirmForm.close()
      element.remove();
      confirmForm.buttonText('Ок');
    })
    .catch((err) => {
      console.log(err);
    })
  }
});


// Функция создания новой карточки
function createCard(data){
  const newCard = new Card(data, '.card-template', handleCardClick);
  const userId = document.querySelector('.profile__name').id;
  const newCardElement = newCard.generateCard(api, confirmForm, userId);
  return newCardElement;
}


// Функция открытия popup с картинкой при клике на карточку
function handleCardClick({link, name}) {
  popupWithImage.open({link, name});
}


// Создаем экземпляр класса Section для дальнейшей отрисовки карточек
const cardsSection = new Section({
  renderer: createCard,
  containerSelector: '.cards'
});


// Создаем экземпляр класса PopupWithForm для добавления новой карточки пользователем
const cardForm = new PopupWithForm({
  popupSelector: '.popup_type_card-add',
  handleFormSubmit: (formData) => { // Получаем данные из формы
    cardForm.buttonText('Сохранение...');
    api.postNewCard(formData)
    .then((res) => {
      const newCard = createCard(res); // Создаем новую карточку
      cardsSection.addItem(newCard); // Добавляем ее в DOM
      cardForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardForm.buttonText('Создать');
    })

  }
});


// Создаем экземпляр класса PopupWithImage для открытия картинки
const popupWithImage = new PopupWithImage('.popup_type_zoom');


// Слушатель нажатия на кнопку добавления новой карточки
cardAddButton.addEventListener('click', () => cardForm.open());




/* --- Валидация форм --- */


// Включаем валидацию форм
const profileEditFormValidate = new FormValidator(profileEditForm, validatorData);
profileEditFormValidate.enableValidation();

const avatarEditFormValidate = new FormValidator(avatarEditForm, validatorData);
avatarEditFormValidate.enableValidation();

const cardAddFormValidate = new FormValidator(cardAddForm, validatorData);
cardAddFormValidate.enableValidation();

