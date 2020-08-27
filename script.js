//global variable for form to acces fields anywhere in code
import Task from "./task";
import { TaskManager } from "./task-manager";
import { TaskForm } from "./task-form";
const taskForm = document.querySelector('[name="taskForm"]');
const formFooter = document.querySelector('[name="formFooter"]');
const formTitle = document.querySelector('[name="formTitle"]');
const submitBtn = document.getElementById("submit");
const taskcontainer = document.querySelector("#task");
const upcomingCards = document.querySelector(".upcomingSection");
const tskbtn = document.getElementById("addTaskBtn");

window.addEventListener("load", function () {
  const taskMgr = new TaskManager(taskcontainer, upcomingCards, taskForm);
  const task = new Task();
  const fieldsForm = new TaskForm();
  taskForm.addEventListener("input", function (event) {
    fieldsForm.checkValidation(event.target);
  });

  fieldsForm.buttonDefault();
  tskbtn.addEventListener("click", () => {
    formTitle.innerText = "New Task ";
    submitBtn.innerText = "Submit ";
  });
});
