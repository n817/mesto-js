// Класс, отвечающий за открытие и закрытие popup с картинкой

import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open({image, title}) {
    this._image = image;
    this._title = title;
    document.querySelector('.zoom__image').src = this._image;
    document.querySelector('.zoom__caption').textContent = this._title;
    super.open();
  }
}
