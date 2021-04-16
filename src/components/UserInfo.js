export default class UserInfo {

  constructor({userAvatarSelector, userNameSelector, userDescriptionSelector}) {
    this._userAvatar = document.querySelector(userAvatarSelector);
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
  }

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    const currentUserName =  this._userName.textContent;
    const currentUserDescription = this._userDescription.textContent;
    return {currentUserName, currentUserDescription};
  }

  // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({username, description}) {
    this._userName.textContent = username;
    this._userDescription.textContent = description;
  }

  setUserAvatar(userAvatar) {
    this._userAvatar.src = userAvatar;
  }

}
