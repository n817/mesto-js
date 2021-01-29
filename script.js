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

// Заполняем поля ввода значениями, которые сейчас отображаются на странице
nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

// Реализуем открытие и закрытие popup
editButton.addEventListener('click', function(){
  popup.classList.add('popup_opened');
});
closeButton.addEventListener('click', function(){
  popup.classList.remove('popup_opened');
});

// Реализуем сохранение профиля и закрытие popup
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    popup.classList.remove('popup_opened');
}
popupForm.addEventListener('submit', formSubmitHandler);
