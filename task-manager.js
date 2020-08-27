import Task from "./task";
const task = new Task();
const form = document.querySelector("form");
let submitBtn = document.getElementById("submit");
const formTitle = document.querySelector('[name="formTitle"]');
const taskfilter = document.getElementById("tasksFilter");
const title = document.getElementById("TitleField");

export class TaskManager {
  constructor(
    todayTasksContainer,
    upcomingTasksContainer,
    taskForm,
    taskfilter
  ) {
    this.tasksList = [];
    this.index = 0;
    this.todayTasksContainer = todayTasksContainer;
    this.upcomingTasksContainer = upcomingTasksContainer;
    this.taskForm = taskForm;
    this.minLength = 1;
    this.maxLength = 20;
    this.taskfilter = taskfilter;
    this.loadFromLocalStorage();
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
      this.refreshPage(this.tasksList);
    }
  }
  refreshPage(tasksArray) {
    this.todayTasksContainer.innerHTML = "";
    this.upcomingTasksContainer.innerHTML = `<h2 class="Padding20">Upcoming Tasks</h2>`;
    const recentDate = new Date().toISOString().slice(0, 10);
    tasksArray.forEach((taskOfArray) => {
      const element = task.templateToDom(taskOfArray);
      const cardDate = new Date(taskOfArray.date).toISOString().slice(0, 10);
      if (recentDate === cardDate) {
        this.todayTasksContainer.append(element);
      } else {
        this.upcomingTasksContainer.appendChild(element);
      }
    });
    this.attachDeleteListeners();
    this.attachEditListeners();
    this.resetValidation();
    this.updateTasksCount(this.tasksList);
    this.displayTasksByCategory();

    localStorage.setItem("tasksList", JSON.stringify(this.tasksList));
  }
  
  attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll("button.removeBtn");

    deleteButtons.forEach((butn) => {
      butn.addEventListener("click", () => {
        this.deleteTask(this.tasksList, event.target.id);
      });
    });
  }
  deleteTask(arrayOfTasks, targetId) {
    arrayOfTasks = arrayOfTasks.filter(
      (taskElement) => taskElement.id != targetId
    );
    let id = 0;
    arrayOfTasks.forEach((taskObject) => {
      taskObject.id = `task${id}`;
      id++;
    });
    this.tasksList = arrayOfTasks;

    this.refreshPage(this.tasksList);
  }
  attachEditListeners() {
    const editButtons = document.querySelectorAll("button.editBtn");
    editButtons.forEach((editButton) => {
      editButton.addEventListener("click", () => {
        this.editTasks(this.tasksList, event.currentTarget.id, this.taskForm);
      });
    });
  }
  editTasks(arrayOfTasks, targetId, tskfrm) {
    const taskform = tskfrm;
    const title = document.getElementById("TitleField");
    const desc = document.getElementById("DescriptionField");
    const assignee = document.getElementById("AssigneeField");
    const time = document.getElementById("time");
    const date = document.getElementById("date");
    const stat = document.getElementById("status");

    const index = arrayOfTasks.findIndex((x) => x.id == targetId);

    if (title) {
      title.value = arrayOfTasks[index].name;
    }
    if (desc) {
      desc.value = arrayOfTasks[index].description;
    }
    title.value = arrayOfTasks[index].name;
    desc.value = arrayOfTasks[index].description;
    assignee.value = arrayOfTasks[index].assignee;
    time.value = arrayOfTasks[index].time;
    date.value = arrayOfTasks[index].date;
    stat.value = arrayOfTasks[index].status;
    if (submitBtn) {
      submitBtn.innerText = "Update ";
    }
    if (formTitle) {
      formTitle.innerText = "Edit Task";
    }
    if (form.dataset) {
      form.dataset.edited = true;
    }
    if (form.dataset) {
      form.dataset.editIndex = index;
    }
  }

  displayTasksByCategory(taskfilter) {
    document.getElementById("tasksFilter").addEventListener("change", () => {
      const category = event.target.value;
      if (category != "All Tasks") {
        const filterCondition = event.target.value;
        const filteredTasks = this.tasksList.filter(
          (x) => x.status == filterCondition
        );
        this.refreshPage(filteredTasks);
      } else {
        this.refreshPage(this.tasksList);
      }
    });
  }

  // this code deals with clearing the validation classesand message when a form is launched again - for repo//

  resetValidation() {
    this.taskForm.reset();
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
        // nothing
      }
    });

    document.querySelector(
      ".doBadge"
    ).innerHTML = `TO DO <span class="badge badge-light badgeTodo">${toDo}</span>`;

    document.querySelector(
      ".progressBadge"
    ).innerHTML = ` IN PROGRESS <span class="badge badge-light badgeInProgress" name="inProgress">${inProgress}</span>`;
    const reviewBadge = (document.querySelector(
      ".reviewBadge"
    ).innerHTML = `REVIEW  <span class="badge badge-light badgeReview">${review}</span>
  `);
    document.querySelector(
      ".doneBadge"
    ).innerHTML = `DONE  <span class="badge badge-light badgeDone">${done}</span>
    `;
  }
  
  alertOnSubmit() {
    alert("Please fill in all the fields , Task can't be blank");
    submitBtn.disabled = true;
  }
}
