// Класс, отвечающий за открытие и закрытие popup с картинкой
import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._zoomImage = this._popupElement.querySelector('.zoom__image');
    this._zoomCaption = this._popupElement.querySelector('.zoom__caption');
  }
  open({link, name}) {
    this._link = link;
    this._name = name;
    this._zoomImage.src = this._link;
    this._zoomCaption.textContent = this._name;
    super.open();
  }
}
