import Task from "./task";

const upcomingCards = document.querySelector(".upcomingSection");
const task = new Task(
  "task",
  "taskTitle",
  "taskDesc",
  "assignee task",
  "status taask",
  "date task",
  "time task"
);
const taskMangr = new taskManager();
/* Task Manager class for the add task , delete task , update task */
export default class taskManager {
  constructor(parent) {
    this.tasksList = [];
    this.index = 0;
    this.parent = parent;
    this.minLength = 1;
    this.maxLength = 20;
  }

  // this code checks all the form buttons and attach the functions that each one must perform//
  buttonDefault() {
    const allFormBtns = document.querySelectorAll(".formbtn");
    allFormBtns.forEach((btn) => {
      btn.name !== "submitBtn"
        ? btn.addEventListener("click", function () {
            this.resetValidation();
          })
        : btn.addEventListener("click", function () {
            this.submitButtonClicked();
          });
    });
  }
  // Form button default function call ends here//

  submitButtonClicked() {
    document.getElementById("tasksFilter").value = "All Tasks";
    if (editedTask) {
      editedTask = false;
      this.tasksList[s].name = taskForm.taskSubject.value;
      this.tasksList[s].description = taskForm.taskDescription.value;
      this.tasksList[s].assignee = taskForm.taskAssignee.value;
      this.tasksList[s].status = taskForm.taskStatus.value;
      this.tasksList[s].date = taskForm.taskDate.value;
      this.tasksList[s].time = taskForm.taskTime.value;
      this.refreshPage(this.tasksList);
    } else {
      this.addTask(
        taskForm.taskSubject.value,
        taskForm.taskDescription.value,
        taskForm.taskAssignee.value,
        taskForm.taskStatus.value,
        taskForm.taskDate.value,
        taskForm.taskTime.value
      );
    }
  }

  alertOnSubmit() {
    alert("Please fill in all the fields , Task can't be blank");
    submitBtn.disabled = true;
  }

  addTask(name, description, assignee, status, date, time) {
    if (
      !name.length ||
      !description.length ||
      !assignee.length ||
      !status.length ||
      !date.length ||
      !time.length
    ) {
      this.alertOnSubmit();
    } else {
      console.log(this.tasksList.length);
      const task = new Task(
        `task${this.tasksList.length ? this.tasksList.length : this.index++}`,
        name,
        description,
        assignee,
        status,
        date,
        time
      );

      this.tasksList.push(task);
      this.refreshPage(this.tasksList);
    }
  }

  loadFromLocalStorage() {
    const localTasks = JSON.parse(localStorage.getItem("tasksList") || "[]");
    if (localTasks.length) {
      localTasks.forEach((localtask) => {
        this.tasksList.push(localtask);
      });
      console.log("fetching local tasks");
      this.refreshPage(this.tasksList);
    }
  }
  refreshPage(tasksArray) {
    this.parent.innerHTML = "";
    upcomingCards.innerHTML = `<h2 class="Padding20 ">Upcoming Tasks</h2>`;
    const recentDate = new Date().toISOString().slice(0, 10);
    tasksArray.forEach((taskOfArray) => {
      const element = task.templateToDom(taskOfArray);
      const cardDate = new Date(taskOfArray.date).toISOString().slice(0, 10);
      //   .toISOString()
      //   .slice(0, 10));
      if (recentDate === cardDate) {
        this.parent.append(element);
      } else {
        console.log("date is different one");
        upcomingCards.appendChild(element);
      }
    });
    this.attachDeleteListeners();
    this.attachEditListeners();
    this.resetValidation();
    this.updateTasksCount(this.tasksList);
    localStorage.setItem("tasksList", JSON.stringify(this.tasksList));
  }
  //attach delete listeners
  attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll("button.removeBtn");

    deleteButtons.forEach(function attacher(butn) {
      butn.addEventListener("click", taskMangr.deleteTask);
    });
  }

  deleteTask() {
    this.tasksList = this.tasksList.filter(
      (taskElement) => taskElement.id != event.target.id
    );
    this.refreshPage(this.tasksList);
  }

  attachEditListeners() {
    const editButtons = document.querySelectorAll("button.editBtn");
    editButtons.forEach(function attachEditLister(editButton) {
      editButton.addEventListener("click", this.editTask);
    });
  }
  editTask() {
    const targetId = event.target.id;
    // let editTask = this.tasksList.find(
    //   (taskElement) => taskElement.id == targetId
    // );
    s = this.tasksList.findIndex((x) => x.id == targetId);
    taskForm.taskSubject.value = this.tasksList[s].name;
    taskForm.taskDescription.value = this.tasksList[s].description;
    taskForm.taskAssignee.value = this.tasksList[s].assignee;
    taskForm.taskTime.value = this.tasksList[s].time;
    taskForm.taskDate.value = this.tasksList[s].date;
    taskForm.taskStatus.value = this.tasksList[s].status;
    submitBtn.innerText = "Update ";
    formTitle.innerText = "Edit Task";
    editedTask = true;
  }

  displayTasksByCategory() {
    document
      .getElementById("tasksFilter")
      .addEventListener("change", filterTasks);
    function filterTasks() {
      console.log(event.target.value);
      const category = event.target.value;
      if (category != "All Tasks") {
        console.log("inside if of category chosing");
        const filterCondition = event.target.value;
        const filteredTasks = this.tasksList.filter(
          (x) => x.status == filterCondition
        );
        console.log(filteredTasks);
        this.refreshPage(filteredTasks);
      } else {
        this.refreshPage(this.tasksList);
      }
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
        submitBtn.disabled = true;
      } else if (input.value.length > this.maxLength) {
        this.setErrorFor(input, `${input.name} is longer than 20 char!`);
        submitBtn.disabled = true;
      } else {
        this.setSuccessFor(input);
        submitBtn.disabled = false;
      }
    } else {
      const taskDateValue = date.value;
      var todayDate = new Date().toISOString().slice(0, 10);
      if (taskDateValue == null || taskDateValue == "") {
        this.setErrorFor(date, "Task must have a due date");
        submitBtn.disabled = true;
      } else if (taskDateValue < todayDate) {
        this.setErrorFor(date, "Task cannot be created in past date");
        submitBtn.disabled = true;
      } else {
        this.setSuccessFor(date);
        submitBtn.disabled = false;
      }
    }
  }

  setErrorFor(input, message) {
    const formgroup = input.parentElement;
    const small = formgroup.querySelector(".msg");
    small.innerText = message;
    small.style.color = "red";
    formgroup.className = "form-group error";
    submitBtn.disabled = true;
  }

  setSuccessFor(input) {
    const formgroup = input.parentElement;
    const small = formgroup.querySelector(".msg");
    small.innerText = "Looks good!";
    small.style.color = "green";
    formgroup.className = "form-group success";
    submitBtn.disabled = false;
  }

  //validation code ends here//

  // this code deals with clearing the validation classesand message when a form is launched again - for repo//

  resetValidation() {
    form.reset();
    const validationClass = document.getElementsByClassName(
      "form-group success"
    );
    const validationEClass = document.getElementsByClassName(
      "form-group error"
    );
    while (validationClass.length) {
      validationClass[0].classList.remove("success");
    }
    while (validationEClass.length) {
      validationEClass[0].classList.remove("error");
    }
    const validationMsg = document.getElementsByClassName("msg");
    for (var i = 0; i < validationMsg.length; i++) {
      validationMsg[i].innerText = "";
    }
  }
  //this method update the counter of tasks by category
  updateTasksCount(tasks) {
    let toDo = 0;
    let inProgress = 0;
    let review = 0;
    let done = 0;

    tasks.forEach((task) => {
      switch (task.status) {
        case "TO-DO":
          toDo += 1;
          break;
        case "In-Progress":
          inProgress += 1;
          break;
        case "Review":
          review += 1;
          break;
        case "Done":
          done += 1;
          break;
        default:
        // code block
      }
    });

    const toDoBadge = document.querySelector(".doBadge");

    const toDoCount = `TO DO <span class="badge badge-light badgeTodo">${toDo}</span>`;
    toDoBadge.innerHTML = toDoCount;
    const inProgressBadge = document.querySelector(".progressBadge");
    const inProgressCount = ` IN PROGRESS <span class="badge badge-light badgeInProgress" name="inProgress">${inProgress}</span>`;
    inProgressBadge.innerHTML = inProgressCount;
    const reviewBadge = document.querySelector(".reviewBadge");
    const reviewCount = `REVIEW  <span class="badge badge-light badgeReview">${review}</span>
    `;
    reviewBadge.innerHTML = reviewCount;
    const doneBadge = document.querySelector(".doneBadge");
    const doneCount = `DONE  <span class="badge badge-light badgeDone">${done}</span>
      `;
    doneBadge.innerHTML = doneCount;
  }
  // reset validation ends here//
}