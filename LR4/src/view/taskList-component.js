import { StatusLabel } from "../const.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListComponentTemplate(status) {
  return `<li class="tasks-area__item">
               <h3 class="title tasks-area__title title__${status}">${StatusLabel[status]}</h3>
               <ul class="tasks__list tasks__${status} list-reset"></ul>
             </li>`;
}

export default class TaskListComponent extends AbstractComponent {
  constructor(status) {
    super();
    this.status = status;
  }

  get template() {
    return createTaskListComponentTemplate(this.status);
  }
}
