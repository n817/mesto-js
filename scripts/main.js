/* --- Переменные ---*/

const cardAddButton = document.querySelector('.profile__add-button'); // ссылка на кнопку добавления новой карточки
const cardsContainer = document.querySelector('.cards'); // ссылка на grid-контейнер, в котором размещаются карточки
const cardTemplate = cardsContainer.querySelector('.card-template'); //ссылка на template карточки
// Переменные popup-блока добавления карточки
const cardAddPopup = document.querySelector('.popup_type_card-add');
const cardCloseButton = cardAddPopup.querySelector('.popup__close-button');
const cardSubmitButton = cardAddPopup.querySelector('.popup__submit-button');
// Переменные popup-блока zoom
const zoomPopup = document.querySelector('.zoom');
const zoomImage = zoomPopup.querySelector('.zoom__image');
const zoomCaption = zoomPopup.querySelector('.zoom__caption');
const zoomCloseButton = zoomPopup.querySelector('.popup__close-button');
// Переменные блока profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
// Переменные popup-блока редактирования информации о пользователе
const profileEditPopup = document.querySelector('.popup_type_profile-edit');
const profileCloseButton = profileEditPopup.querySelector('.popup__close-button');
// Добавляем формы
const cardAddForm = document.forms.add; // форма добавления карточки
const profileEditForm = document.forms.edit; // форма редактирования профиля
const nameInput = profileEditForm.elements.username;
const descriptionInput = profileEditForm.elements.description;


/* --- Функции --- */

// Функция открытия popup
function openPopup(el){
  el.classList.add('popup_opened');
}

// Функция закрытия popup
function closePopup(el){
  el.classList.remove('popup_opened');
}

// Функция создания карточки из template
function createCard(el){
  const newCard = cardTemplate.content.cloneNode(true); // клонируем template карточки в переменную newCard
  const newCardImage = newCard.querySelector('.card__image');
  const newCardTitle = newCard.querySelector('.card__title');
  newCardImage.src = el.link;
  newCardImage.alt = el.name;
  newCardTitle.textContent = el.name;
  return newCard;
}

// Функция автоматического добавления карточек из массива
function cardsRender(array, container){
  const card = array.map(createCard);
  container.append(...card);
}

// Функция добавления новой карточки пользователем
function addUserCard(evt){
  evt.preventDefault();
  const titleValue = cardAddForm.elements.title.value;
  const urlValue = cardAddForm.elements.url.value;
  const userCard = createCard({name: titleValue, link: urlValue});
  cardsContainer.prepend(userCard);
  cardAddForm.reset(); //очищаем форму
  closePopup(cardAddPopup);
}

// Функция открытия popup-блока zoom (увеличенной картинки)
function zoomOpen(evt){
  const targetElement = evt.target;
  zoomImage.src = targetElement.src;
  zoomCaption.textContent = targetElement.alt;
  openPopup(zoomPopup);
}

// Функция открытия popup редактирования профиля
// с заполнением полей ввода значениями, которые сейчас отображаются на странице
profileEditButton.addEventListener('click', function(){
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
});

// Функция сохранения введенной информации профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(profileEditPopup);
}



/* События и действия */

// Отрисовываем исходные карточки из массива
cardsRender(initialCards, cardsContainer);

// Открытие новой карточки
cardAddButton.addEventListener('click', () => openPopup(cardAddPopup));

// Сохранение новой карточки
cardAddForm.addEventListener('submit', addUserCard);

// Закрытие новой карточки
cardCloseButton.addEventListener('click', () => closePopup(cardAddPopup));

// Закрытие popup-блока zoom
zoomCloseButton.addEventListener('click', () => closePopup(zoomPopup));

// Сохранение введенной информации профиля при клике на кнопку "Сохранить"
profileEditForm.addEventListener('submit', formSubmitHandler);

// Закрытие popup редактирования профиля
profileCloseButton.addEventListener('click', () => closePopup(profileEditPopup));

// Интерактив карточки: лайк, удаление и зум картинки
cardsContainer.addEventListener('click', function(evt){
  if (evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_active');
  }
  if (evt.target.classList.contains('card__trash-button')){
    evt.target.closest('.card').remove();
  }
  if (evt.target.classList.contains('card__image')){
    zoomOpen(evt);
  }
});
