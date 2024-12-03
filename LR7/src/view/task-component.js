import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
  return `<li class="tasks__item">${task.title}</li>`;
}

export default class TaskComponent extends AbstractComponent {
  constructor({ task }) {
    super();
    this.task = task;
    this.#afterCreateElement();
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }

  #afterCreateElement() {
    this.#makeTaskDraggle();
  }

  #makeTaskDraggle() {
    this.element.setAttribute("draggable", true);

    this.element.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.task.id);
    });
  }
}
