// Класс, отвечающий за открытие и закрытие popup с картинкой
import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open({link, name}) {
    this._link = link;
    this._name = name;
    document.querySelector('.zoom__image').src = this._link;
    document.querySelector('.zoom__caption').textContent = this._name;
    super.open();
  }
}
