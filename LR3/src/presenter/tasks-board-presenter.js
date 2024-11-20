import TaskListComponent from "../view/taskList.js";
import TaskComponent from "../view/task.js";
import TaskAreaComponent from "../view/taskArea.js";
import { StatusArray } from "../const.js";
import { render } from "../framework/render.js";

export default class TasksBoardPresenter {
  tasksBoardComponent = new TaskAreaComponent();

  constructor({ boardContainer, tasksModel }) {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
  }

  init() {
    this.boardTasks = [...this.tasksModel.getTasks()];

    render(this.tasksBoardComponent, this.boardContainer);
    debugger;
    for (const status of StatusArray) {
      const tasksListComponent = new TaskListComponent(status);
      render(tasksListComponent, this.tasksBoardComponent.getElement());

      const tasksForStatus = this.boardTasks.filter(
        (task) => task.status === status
      );

      const tasksListElement = tasksListComponent
        .getElement()
        .querySelector(".tasks__list");

      for (const task of tasksForStatus) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, tasksListElement);
      }
    }
  }
}
