import HeaderComponent from "./view/header-component.js";
import NewTaskComponent from "./view/newTask-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TasksModel from "./model/task-model.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector(".body-app");
const newTaskContainer = document.querySelector(".new-task");
const taskArea = document.querySelector(".tasks-area");

const tasksModel = new TasksModel();

const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: taskArea,
  tasksModel,
});

tasksBoardPresenter.init();

function handleNewTaskSubmit(taskTitle) {
  tasksBoardPresenter.addNewTask(taskTitle);
}

const newTaskComponent = new NewTaskComponent(handleNewTaskSubmit);
render(newTaskComponent, newTaskContainer, RenderPosition.AFTERBEGIN);

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
