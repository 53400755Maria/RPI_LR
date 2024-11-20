import { createElement } from "../framework/render.js";

function createTaskComponentTemplate() {
  return `<li class="tasks__item">Выучить JS</li>`;
}

export default class TaskComponent {
  getTemplate() {
    return createTaskComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
