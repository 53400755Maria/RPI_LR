import TaskListComponent from "../view/taskList-component.js";
import TaskComponent from "../view/task-component.js";
import TaskAreaComponent from "../view/taskArea-component.js";
import ResetButtonComponent from "../view/reset-button-component.js";
import { StatusArray, Status } from "../const.js";
import { render } from "../framework/render.js";
import TaskPresenter from "./task-presenter.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #taskPresenter = null;

  #tasksBoardComponent = new TaskAreaComponent();
  #resetButtonComponent = null;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#taskPresenter = new TaskPresenter({ tasksModel: this.#tasksModel });

    this.#tasksModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
    this.#renderTaskList();
    this.#renderBasket();
  }

  addNewTask(taskTitle) {
    this.#taskPresenter.addNewTask(taskTitle);
  }

  #handleModelEvent = () => {
    this.#clearBoard();
    this.#renderTaskList();
    this.#renderBasket();
  };

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = "";
    this.#resetButtonComponent = null;
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }

  #renderTaskList() {
    const nonBasketStatuses = StatusArray.filter(
      (status) => status !== Status.BASKET
    );

    for (const status of nonBasketStatuses) {
      const tasksListComponent = new TaskListComponent({
        status,
        onTaskDrop: this.#handleTaskDrop.bind(this),
      });
      console.log(status);
      tasksListComponent.element.setAttribute("data-status", status);
      render(tasksListComponent, this.#tasksBoardComponent.element);

      const tasksForStatus = this.#taskPresenter.getTasksByStatus(status);

      const tasksListElement =
        tasksListComponent.element.querySelector(".tasks__list");

      for (const task of tasksForStatus) {
        this.#renderTask(task, tasksListElement);
      }
    }
  }

  #handleTaskDrop = (taskId, newStatus) => {
    this.#tasksModel.updateTaskStatus(taskId, newStatus);
  };

  #renderBasket() {
    const status = Status.BASKET;
    const tasksListComponent = new TaskListComponent({
      status,
      onTaskDrop: this.#handleTaskDrop.bind(this),
    });
    tasksListComponent.element.setAttribute("data-status", status);
    render(tasksListComponent, this.#tasksBoardComponent.element);

    const tasksForStatus = this.#taskPresenter.getTasksByStatus(status);

    const tasksListElement =
      tasksListComponent.element.querySelector(".tasks__list");

    for (const task of tasksForStatus) {
      this.#renderTask(task, tasksListElement);
    }

    const isDisabled = tasksForStatus.length === 0;

    this.#resetButtonComponent = new ResetButtonComponent(isDisabled);
    this.#resetButtonComponent.setClickHandler(this.#handleResetButtonClick);
    render(this.#resetButtonComponent, tasksListComponent.element);
  }

  #handleResetButtonClick = () => {
    this.#tasksModel.removeTasksByStatus(Status.BASKET);
  };
}
