import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNewTaskComponentTemplate() {
  return `<div><h2 class="title new-task__title">Новая задача</h2>
          <form action="#" class="new-task__form">
            <input
              class="new-task__input"
              type="text"
              placeholder="Название задачи..."
            />
            <button class="new-task__button btn-reset">+ Добавить</button>
          </form> </div>`;
}

export default class NewTaskComponent extends AbstractComponent {
  get template() {
    return createNewTaskComponentTemplate();
  }
}
