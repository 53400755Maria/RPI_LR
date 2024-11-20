import { createElement } from "../framework/render.js";

function createTaskAreaComponentTemplate() {
  return `<ul class="tasks-area__list list-reset">
          </ul>`;
}

export default class TaskAreaComponent {
  getTemplate() {
    return createTaskAreaComponentTemplate();
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
