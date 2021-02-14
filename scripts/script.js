/* --- Общие функции --- */

// Функция переключения видимости popup
function togglePopup(popupName){
  popupName.classList.toggle('popup_opened');
}





/* --- Работа с карточками --- */

// Массив с начальными карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* Создаем рендер для добавления карточек из массива */
const cardAddButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.cards'); // ссылка на контейнер, в котором будут карточки
const cardTemplate = cardsContainer.querySelector('#card-template'); //ссылка на template карточек

function cardsRender(){
  const cardHTML = initialCards.map(createCard); // обрабатываем элементы массива с помощью функции createCard
  cardsContainer.append(...cardHTML);
}

function createCard(item){
  const newCard = cardTemplate.content.cloneNode(true);
  const newCardTitle = newCard.querySelector('.card__title');
  const newCardImage = newCard.querySelector('.card__image');
  newCardTitle.textContent = item.name;
  newCardImage.src = item.link;

  const cardRemoveButton = newCard.querySelector('.card__trash-button'); //возможность удаления карточек
  cardRemoveButton.addEventListener('click', deleteCard);

  const cardLikeButton = newCard.querySelector('.card__like-button'); //возможность ставить и убирать лайки
  cardLikeButton.addEventListener('click', likeCard);

  return newCard;
}

cardsRender(); // отрисовываем начальные карточки

/* Реализуем возможность добавления карточек пользователем */

// Задаем переменные popup-блока card-add
const cardAddPopup = document.querySelector('#card-add');
const cardAddForm = cardAddPopup.querySelector('.popup__container');
const cardCloseButton = cardAddForm.querySelector('.popup__close-button');
const cardSubmitButton = cardAddForm.querySelector('.popup__submit-button');

function addUserCard(evt){
  evt.preventDefault();
  const cardTitleInput = cardAddForm.querySelector('#card-title-input').value;
  const photoUrlInput = cardAddForm.querySelector('#photo-url-input').value;
  const userCard = createCard({name: cardTitleInput, link: photoUrlInput});
  cardsContainer.prepend(userCard);
  togglePopup(cardAddPopup);
}

/* Реализуем возможность удаления карточек пользователем */

function deleteCard(evt){
  evt.preventDefault();
  const targetElement = evt.target;
  const targetCard = targetElement.closest('.card');
  targetCard.remove();
}

/* Реализуем возможность ставить и убирать лайки */

function likeCard(evt){
  evt.preventDefault();
  const targetElement = evt.target;
  targetElement.classList.toggle('card__like-button_active');
}

// Открытие новой карточки
cardAddButton.addEventListener('click', function(){
  togglePopup(cardAddPopup);
});

// Сохранение новой карточки
cardAddForm.addEventListener('submit', addUserCard);

// Закрытие новой карточки
cardCloseButton.addEventListener('click', function(){
  togglePopup(cardAddPopup);
});






/* --- Редактирование профиля --- */

// Задаем переменные блока profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

// Задаем переменные popup-блока profile-edit
const profileEditPopup = document.querySelector('#profile-edit');
const profileEditForm = profileEditPopup.querySelector('.popup__container');
const profileCloseButton = profileEditForm.querySelector('.popup__close-button');
const nameInput = profileEditForm.querySelector('#name-input');
const descriptionInput = profileEditForm.querySelector('#description-input');

// Функция сохранения введенной информации профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    togglePopup(profileEditPopup);
}

// Открытие popup при клике на кнопку редактирования профиля
// с заполнением полей ввода значениями, которые сейчас отображаются на странице
profileEditButton.addEventListener('click', function(){
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  togglePopup(profileEditPopup);
});

// Сохранение введенной информации профиля при клике на кнопку "Сохранить"
profileEditForm.addEventListener('submit', formSubmitHandler);

// Закрытие popup редактирования профиля
profileCloseButton.addEventListener('click', function(){
  togglePopup(profileEditPopup);
});


