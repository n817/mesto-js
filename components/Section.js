/* Класс отрисовки элементов на странице.

Исходные данные:
items — массив данных, которые нужно добавить на страницу;
renderer — функция отрисовки элемента
containerSelector - селектор контейнера, в который нужно добавлять созданные элементы.

Методы класса:
renderItems — функция отрисовки всех элементов items и добавления в DOM с помощью addItem;
addItem — функция добавления элемента в DOM
*/

export default class Section {
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems(){
    this._items.forEach((item) => {
      const cardElement = this._renderer(item);
      this.addItem(cardElement);
    });
  }
  addItem(element){
    this._container.prepend(element);
  }
}
