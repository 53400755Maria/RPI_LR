import HeaderComponent from "./view/header-component.js";
import NewTaskComponent from "./view/newTask.js";
import TaskAreaComponent from "./view/taskArea.js";
import TaskListComponent from "./view/taskList.js";
import TaskComponent from "./view/task.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector(".body-app");
const newTask = document.querySelector(".new-task");
const taskArea = document.querySelector(".tasks-area");

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new NewTaskComponent(), newTask, RenderPosition.AFTERBEGIN);
render(new TaskAreaComponent(), taskArea, RenderPosition.BEFOREEND);

const tasksAreaList = document.querySelector(".tasks-area__list");

for (let i = 0; i < 4; i++) {
  const taskListComponent = new TaskListComponent();
  render(taskListComponent, tasksAreaList, RenderPosition.BEFOREEND);

  let tasksList = taskListComponent.getElement().querySelector(".tasks__list");

  for (let j = 0; j < 4; j++) {
    render(new TaskComponent(), tasksList, RenderPosition.BEFOREEND);
  }
}
