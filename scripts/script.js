/* --- Общие функции --- */

// Функция открытия popup
function openPopup(popupName){
  popupName.classList.add('popup_opened');
}

// Функция закрытия popup
function closePopup(popupName){
  popupName.classList.remove('popup_opened');
}


/* --- Работа с карточками --- */

// Задаем переменные popup-блока card-add
const cardAddButton = document.querySelector('.profile__add-button'); // кнопка добавления новой карточки
const cardsContainer = document.querySelector('.cards'); // ссылка на контейнер, в котором будут карточки
const cardTemplate = cardsContainer.querySelector('.card-template'); //ссылка на template карточек

// Создаем рендер для добавления карточек
function cardsRender(array, container){
  const cardsElements = array.map(createCard); // обрабатываем элементы массива с помощью функции createCard
  container.append(...cardsElements);
}

// Функция создания карточек из template
function createCard(item){
  const newCard = cardTemplate.content.cloneNode(true);
  const newCardTitle = newCard.querySelector('.card__title');
  const newCardImage = newCard.querySelector('.card__image');
  newCardTitle.textContent = item.name;
  newCardImage.alt = item.name;
  newCardImage.src = item.link;

  const cardRemoveButton = newCard.querySelector('.card__trash-button'); //возможность удаления карточек
  cardRemoveButton.addEventListener('click', deleteCard);

  const cardLikeButton = newCard.querySelector('.card__like-button'); //возможность ставить и убирать лайки
  cardLikeButton.addEventListener('click', likeCard);

  const cardImageButton = newCard.querySelector('.card__image-button'); //возможность открывать увеличенное фото
  cardImageButton.addEventListener('click', zoomOpen);

  return newCard;
}

cardsRender(initialCards, cardsContainer); // отрисовываем карточки и добавляем в контейнер на страницу

/* Реализуем возможность добавления карточек пользователем */

// Задаем переменные popup-блока card-add
const cardAddPopup = document.querySelector('.popup_type_card-add');
const cardAddForm = cardAddPopup.querySelector('.popup__container');
const cardCloseButton = cardAddForm.querySelector('.popup__close-button');
const cardSubmitButton = cardAddForm.querySelector('.popup__submit-button');
const cardTitleInput = cardAddForm.querySelector('#card-title-input');
const photoUrlInput = cardAddForm.querySelector('#photo-url-input');

function addUserCard(evt){
  evt.preventDefault();
  const titleValue = cardTitleInput.value;
  const urlValue = photoUrlInput.value;
  const userCard = createCard({name: titleValue, link: urlValue});
  cardsContainer.prepend(userCard);
  cardAddForm.reset(); //очищаем форму
  closePopup(cardAddPopup);
}


/* Реализуем возможность удаления карточек пользователем */

function deleteCard(evt){
  const targetElement = evt.target;
  const targetCard = targetElement.closest('.card');
  targetCard.remove();
}

/* Реализуем возможность ставить и убирать лайки */

function likeCard(evt){
  const targetElement = evt.target;
  targetElement.classList.toggle('card__like-button_active');
}

// Открытие новой карточки
cardAddButton.addEventListener('click', () => openPopup(cardAddPopup));

// Сохранение новой карточки
cardAddForm.addEventListener('submit', addUserCard);

// Закрытие новой карточки
cardCloseButton.addEventListener('click', () => closePopup(cardAddPopup));





/* Реализуем возможность открытия popup zoom с картинкой */

// Задаем переменные popup-блока zoom
const zoomPopup = document.querySelector('.zoom');
const zoomImage = zoomPopup.querySelector('.zoom__image');
const zoomCaption = zoomPopup.querySelector('.zoom__caption');
const zoomCloseButton = zoomPopup.querySelector('.popup__close-button');

// Функция открытия popup-блока zoom
function zoomOpen(evt){
  const targetElement = evt.target;
  zoomImage.src = targetElement.src;
  zoomCaption.textContent = targetElement.alt;
  openPopup(zoomPopup);
}

// Закрытие popup-блока zoom
zoomCloseButton.addEventListener('click', () => closePopup(zoomPopup));





/* --- Редактирование профиля --- */

// Задаем переменные блока profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

// Задаем переменные popup-блока profile-edit
const profileEditPopup = document.querySelector('.popup_type_profile-edit');
const profileEditForm = profileEditPopup.querySelector('.popup__container');
const profileCloseButton = profileEditForm.querySelector('.popup__close-button');
const nameInput = profileEditForm.querySelector('#name-input');
const descriptionInput = profileEditForm.querySelector('#description-input');

// Функция сохранения введенной информации профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(profileEditPopup);
}

// Функция открытия popup при клике на кнопку редактирования профиля
// с заполнением полей ввода значениями, которые сейчас отображаются на странице
profileEditButton.addEventListener('click', function(){
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
});

// Сохранение введенной информации профиля при клике на кнопку "Сохранить"
profileEditForm.addEventListener('submit', formSubmitHandler);

// Закрытие popup редактирования профиля
profileCloseButton.addEventListener('click', () => closePopup(profileEditPopup));
