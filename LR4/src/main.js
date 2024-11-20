import HeaderComponent from "./view/header-component.js";
import NewTaskComponent from "./view/newTask-component.js";
import TaskAreaComponent from "./view/taskArea-component.js";
import TaskListComponent from "./view/taskList-component.js";
import TaskComponent from "./view/task-component.js";
import NoTaskComponent from "./view/noTask-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TasksModel from "./model/task-model.js";
import { StatusArray } from "./const.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector(".body-app");
const newTask = document.querySelector(".new-task");
const taskArea = document.querySelector(".tasks-area");

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new NewTaskComponent(), newTask, RenderPosition.AFTERBEGIN);
render(new TaskAreaComponent(), taskArea, RenderPosition.BEFOREEND);

const tasksAreaList = document.querySelector(".tasks-area__list");

const tasksModel = new TasksModel();
const tasks = [...tasksModel.tasks];

for (let i = 0; i < StatusArray.length; i++) {
  const status = StatusArray[i];
  const taskListComponent = new TaskListComponent(status);
  render(taskListComponent, tasksAreaList, RenderPosition.BEFOREEND);

  const tasksList = taskListComponent.element.querySelector(".tasks__list");

  const tasksForStatus = tasks.filter((task) => task.status === status);

  if (tasksForStatus.length === 0) {
    render(new NoTaskComponent(), tasksList, RenderPosition.BEFOREEND);
  } else {
    for (let j = 0; j < tasksForStatus.length; j++) {
      const task = tasksForStatus[j];
      render(new TaskComponent({ task }), tasksList, RenderPosition.BEFOREEND);
    }
  }
}

const tasksBoardPresenter = new TasksBoardPresenter({
  bodyContainer: taskArea,
  tasksModel,
});

tasksBoardPresenter.init();
