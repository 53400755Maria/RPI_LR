import { createElement } from "../framework/render.js";

function createTaskListComponentTemplate() {
  return `<li class="tasks-area__item">
              <h3 class="title tasks-area__title title__backlog">Бэклог</h3>
              <ul class="tasks__list tasks__backlog list-reset">

              </ul>
            </li>`;
}

export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponentTemplate();
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
