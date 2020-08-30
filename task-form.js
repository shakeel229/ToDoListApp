import { TaskManager } from "./task-manager";
const taskForm = document.querySelector('[name="taskForm"]');
const submitBtn = document.getElementById("submit");
const taskcontainer = document.querySelector("#task");
const upcomingCards = document.querySelector(".upcomingSection");
const taskfilter = document.getElementById("tasksFilter");
const taskMgr = new TaskManager(
  taskcontainer,
  upcomingCards,
  taskForm,
  taskfilter
);

let task;
let fieldsForm;
export class TaskForm {
  constructor(tskform) {
    this.tskform = tskform;
    this.minLength = 1;
    this.maxLength = 20;
  }
  // this code checks all the form buttons and attach the functions that each one must perform//
  buttonDefault() {
    const allFormBtns = document.querySelectorAll(".formbtn");
    allFormBtns.forEach((btn) => {
      btn.name !== "submitBtn"
        ? btn.addEventListener("click", function () {
            taskMgr.resetValidation();
          })
        : btn.addEventListener("click", () => {
            this.submitButtonClicked();
          });
    });
  }
  submitButtonClicked() {
    document.getElementById("tasksFilter").value = "All Tasks";
    if (taskForm.dataset.edited === "true") {
      taskForm.dataset.edited = false;
      const index = taskForm.dataset.editIndex;
      const title = taskForm.taskSubject.value;
      const description = taskForm.taskDescription.value;
      const assignee = taskForm.taskAssignee.value;
      const status = taskForm.taskStatus.value;
      const date = taskForm.taskDate.value;
      const time = taskForm.taskTime.value;
      taskMgr.updateTask(
        index,
        title,
        description,
        assignee,
        status,
        date,
        time
      );
    } else {
      taskMgr.addTask(
        taskForm.taskSubject.value,
        taskForm.taskDescription.value,
        taskForm.taskAssignee.value,
        taskForm.taskStatus.value,
        taskForm.taskDate.value,
        taskForm.taskTime.value
      );
    }
  }

  checkValidation(input) {
    if (
      input.name === "taskSubject" ||
      input.name === "taskDescription" ||
      input.name === "taskAssignee"
    ) {
      if (
        input.value.length < this.minLength ||
        input.value.length === "undefined"
      ) {
        this.setErrorFor(input, `${input.name} cannot be blank`);
        if (submitBtn) {
          submitBtn.disabled = true;
        }
      } else if (input.value.length > this.maxLength) {
        this.setErrorFor(input, `${input.name} is longer than 20 char!`);
        if (submitBtn) {
          submitBtn.disabled = true;
        }
      } else {
        this.setSuccessFor(input);
        if (submitBtn) {
          submitBtn.disabled = false;
        }
      }
    } else {
      const taskDateValue = date.value;
      var todayDate = new Date().toISOString().slice(0, 10);

      if (taskDateValue == null || taskDateValue == "") {
        this.setErrorFor(date, "Task must have a due date");
        if (submitBtn) {
          submitBtn.disabled = true;
        }
      } else if (taskDateValue < todayDate) {
        this.setErrorFor(date, "Task cannot be created in past date");
        if (submitBtn) {
          submitBtn.disabled = true;
        }
      } else {
        this.setSuccessFor(date);
        if (submitBtn) {
          submitBtn.disabled = false;
        }
      }
    }
  }

  setErrorFor(input, message) {
    const formgroup = input.parentElement;
    const small = formgroup.querySelector(".msg");
    small.innerText = message;
    small.style.color = "red";
    formgroup.className = "form-group error";
    if (submitBtn) {
      submitBtn.disabled = true;
    }
  }

  setSuccessFor(input) {
    const formgroup = input.parentElement;
    const small = formgroup.querySelector(".msg");
    small.innerText = "Looks good!";
    small.style.color = "green";
    formgroup.className = "form-group success";
    if (submitBtn) {
      submitBtn.disabled = true;
    }
  }
}
