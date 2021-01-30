// Задаем переменные блока profile
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');

// Задаем переменные блока popup
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__container');
let closeButton = popupForm.querySelector('.popup__close-button');
let nameInput = popupForm.querySelector('#name');
let descriptionInput = popupForm.querySelector('#description');

// Функция переключения видимости popup
function togglePopup(){
  popup.classList.toggle('popup_opened');
}

// Функция открытия popup
function openPopup(){
  nameInput.value = profileName.textContent; // Заполняем поля ввода значениями, которые сейчас отображаются на странице
  descriptionInput.value = profileDescription.textContent;
  togglePopup();
}

// Функция сохранения введенной информации профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    togglePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', togglePopup);
popupForm.addEventListener('submit', formSubmitHandler);
