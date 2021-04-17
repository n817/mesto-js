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
export const api = new Api({
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-22/cards',
  userUrl: 'https://mesto.nomoreparties.co/v1/cohort-22/users/me',
  headers: {
    authorization: '515ca80d-3822-4c04-8086-34127dceee10',
    'Content-Type': 'application/json'
  }
});



/* --- Взаимодействие с профилем пользователя --- */


// Создаем экземпляр класса работы с профилем пользователя
const userInfo = new UserInfo({
  userAvatarSelector: '.profile__avatar',
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description'
})


// Получаем профиль пользователя с сервера
api.getUserInfo()
.then((res) => {
  userInfo.setUserInfo({
    username: res.name,
    description: res.about
  });
  userInfo.setUserAvatar(res.avatar);
})
.catch((err) => {
  console.log(err);
});


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
    userForm.dataLoading(true);
    userInfo.setUserInfo(formData);
    api.patchUserInfo(formData)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        userForm.dataLoading(false, 'Cохранить');
        userForm.close();
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
    avatarForm.dataLoading(true);
    userInfo.setUserAvatar(formData.url);
    api.patchUserAvatar(formData)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarForm.dataLoading(false, 'Cохранить');
        avatarForm.close();
      });
  }
})



/* --- Взаимодействие с карточками --- */


// Функция создания новой карточки
function createCard(data){
  const newCard = new Card(data, '.card-template', handleCardClick);
  const newCardElement = newCard.generateCard();
  return newCardElement;
}


// Функция открытия popup с картинкой при клике на карточку
function handleCardClick({link, name}) {
  popupWithImage.open({link, name});
}


// Создаем экземпляр класса Section для дальнейшей отрисовки карточек
export const cardsSection = new Section({
  renderer: createCard,
  containerSelector: '.cards'
});


// Загружаем и отрисовываем карточки с сервера
api.getInitialCards()
  .then((res) => {
    cardsSection.renderItems(res);
  })
  .catch((err) => {
    console.log(err);
  });

// Создаем экземпляр класса PopupWithForm для добавления новой карточки пользователем
const cardForm = new PopupWithForm({
  popupSelector: '.popup_type_card-add',
  handleFormSubmit: (formData) => { // Получаем данные из формы
    /*const newCardData = {
      link: formData.url,
      name: formData.cardname,
      likes: [],
      owner:{_id: 'e92fdb2b0f69a8327ca4332b'}
    };*/
    cardForm.dataLoading(true);

    api.postNewCard(formData)
    .then((res) => {
      const newCard = createCard(res); // Создаем новую карточку
      cardsSection.addItem(newCard); // Добавляем ее в DOM
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardForm.dataLoading(false, 'Создать');
      cardForm.close();
    })

  }
});


// Создаем экземпляр класса PopupWithImage для открытия картинки
const popupWithImage = new PopupWithImage('.popup_type_zoom');


// Создаем экземпляр класса PopupWithConfirmation для подтверждения удаления карточки
export const confirmForm = new PopupWithConfirmation({
  popupSelector: '.popup_type_confirm-delete',
  handleFormSubmit: (element, cardId) => {
    element.remove();
    api.deleteCard(cardId)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      console.log(res);
    })
    .finally(() => {
      confirmForm.close();
    })
  }
});


// Слушатель назатия на кнопку добавления новой карточки
cardAddButton.addEventListener('click', () => cardForm.open());




/* --- Валидация форм --- */


// Включаем валидацию форм
const profileEditFormValidate = new FormValidator(profileEditForm, validatorData);
profileEditFormValidate.enableValidation();

const avatarEditFormValidate = new FormValidator(avatarEditForm, validatorData);
avatarEditFormValidate.enableValidation();

const cardAddFormValidate = new FormValidator(cardAddForm, validatorData);
cardAddFormValidate.enableValidation();

