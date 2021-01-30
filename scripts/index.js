// Задаем переменные блока profile
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

// Задаем переменные блока popup
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__container');
const closeButton = popupForm.querySelector('.popup__close-button');
const nameInput = popupForm.querySelector('#name');
const descriptionInput = popupForm.querySelector('#description');

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
