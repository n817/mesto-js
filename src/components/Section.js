/* Класс отрисовки элементов на странице.

Исходные данные:
renderer — функция отрисовки элемента
containerSelector - селектор контейнера, в который нужно добавлять созданные элементы.
items — массив карточек, получаемый с сервера;

Методы класса:
renderItems — функция отрисовки всех элементов items и добавления в DOM с помощью addItem;
addItem — функция добавления элемента в DOM
*/

export default class Section {
  constructor({renderer, containerSelector}){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems(items){
    items.forEach((item) => {
      const cardElement = this._renderer(item);
      this.addItem(cardElement);
    });
  }
  addItem(element){
    this._container.append(element);
  }
}
