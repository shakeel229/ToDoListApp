import Task from "./task";
const task = new Task();
const form = document.querySelector("form");
const submitBtn = document.getElementById("submit");
var s = null;
const formTitle = document.querySelector('[name="formTitle"]');
var editedTask = false;

export class TaskManager {
  constructor(todayTasksContainer, upcomingTasksContainer, taskForm) {
    this.tasksList = [];
    this.index = 0;
    this.todayTasksContainer = todayTasksContainer;
    this.upcomingTasksContainer = upcomingTasksContainer;
    this.taskForm = taskForm;
    this.minLength = 1;
    this.maxLength = 20;
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
    this.todayTasksContainer.innerHTML = "";
    this.upcomingTasksContainer.innerHTML = `<h2 class="Padding20">Upcoming Tasks</h2>`;
    const recentDate = new Date().toISOString().slice(0, 10);
    tasksArray.forEach((taskOfArray) => {
      const element = task.templateToDom(taskOfArray);
      console.log(taskOfArray.date);
      const cardDate = new Date(taskOfArray.date).toISOString().slice(0, 10);
      if (recentDate === cardDate) {
        this.todayTasksContainer.append(element);
      } else {
        console.log("date is different one");
        this.upcomingTasksContainer.appendChild(element);
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
        this.editTasks(this.tasksList, event.currentTarget.id);
      });
    });
  }
  editTasks(arrayOfTasks, targetId) {
    s = arrayOfTasks.findIndex((x) => x.id == targetId);
    taskForm.taskSubject.value = arrayOfTasks[s].name;
    taskForm.taskDescription.value = arrayOfTasks[s].description;
    taskForm.taskAssignee.value = arrayOfTasks[s].assignee;
    taskForm.taskTime.value = arrayOfTasks[s].time;
    taskForm.taskDate.value = arrayOfTasks[s].date;
    taskForm.taskStatus.value = arrayOfTasks[s].status;
    submitBtn.innerText = "Update ";
    formTitle.innerText = "Edit Task";
    form.dataset.edited = true;
    form.dataset.editIndex = s;
  }

  displayTasksByCategory() {
    document.getElementById("tasksFilter").addEventListener("change", () => {
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
    });
  }

  //validation code ends here//

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
        // code block
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
  // reset validation ends here//
  alertOnSubmit() {
    alert("Please fill in all the fields , Task can't be blank");
    submitBtn.disabled = true;
  }
}

export { editedTask };
export { s };
