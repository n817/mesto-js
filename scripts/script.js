// --- Общие функции ---

// Функция переключения видимости popup
function togglePopup(popupName){
  popupName.classList.toggle('popup_opened');
}


// --- Реализуем возможность редактирования профиля ---

// Задаем переменные блока profile
const profile = document.querySelector('.profile');
const placeAddButton = profile.querySelector('.profile__add-button');
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


// --- Реализуем возможность добавления новых мест ---

// Задаем переменные popup-блока place-add
const placeAddPopup = document.querySelector('#place-add');
const placeAddForm = placeAddPopup.querySelector('.popup__container');
const placeCloseButton = placeAddForm.querySelector('.popup__close-button');
const placeTitleInput = placeAddForm.querySelector('#place-title-input');
const photoUrlInput = placeAddForm.querySelector('#photo-url-input');


// --- Добавляем слушатели событий ---

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

// Открытие popup добавления новых мест
placeAddButton.addEventListener('click', function(){
  togglePopup(placeAddPopup);
});

// Закрытие popup добавления новых мест
placeCloseButton.addEventListener('click', function(){
  togglePopup(placeAddPopup);
});
