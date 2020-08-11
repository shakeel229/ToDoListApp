//global variable for form to acces fields anywhere in code
const taskForm = document.querySelector('[name="taskForm"]');
const formFooter = document.querySelector('[name="formFooter"]');
const formTitle = document.querySelector('[name="formTitle"]');
const submitBtn = document.getElementById("submit");
const taskcontainer = document.querySelector("#task");
let editedTask = false;
let s = null;
document.getElementById("addTaskBtn").addEventListener("click", resetTaskForm);
function resetTaskForm() {
  formTitle.innerText = "New Task ";
  submitBtn.innerText = "Submit ";
}

/* Task Manager class for the add task , delete task , update task */
class taskManager {
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
            taskMgr.resetValidation();
          })
        : btn.addEventListener("click", function () {
            taskMgr.submitButtonClicked();
          });
    });
  }
  // Form button default function call ends here//

  submitButtonClicked() {
    document.getElementById("tasksFilter").value = "All Tasks";
    if (editedTask) {
      editedTask = false;
      taskMgr.tasksList[s].name = taskForm.taskSubject.value;
      taskMgr.tasksList[s].description = taskForm.taskDescription.value;
      taskMgr.tasksList[s].assignee = taskForm.taskAssignee.value;
      taskMgr.tasksList[s].status = taskForm.taskStatus.value;
      taskMgr.tasksList[s].date = taskForm.taskDate.value;
      taskMgr.tasksList[s].time = taskForm.taskTime.value;
      taskMgr.refreshPage(taskMgr.tasksList);
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
      this.refreshPage(taskMgr.tasksList);
    }
  }
  refreshPage(tasksArray) {
    this.parent.innerHTML = "";
    tasksArray.forEach((taskOfArray) => {
      const element = task.templateToDom(taskOfArray);
      this.parent.append(element);
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
      butn.addEventListener("click", taskMgr.deleteTask);
    });
  }

  deleteTask() {
    taskMgr.tasksList = taskMgr.tasksList.filter(
      (taskElement) => taskElement.id != event.target.id
    );
    taskMgr.refreshPage(taskMgr.tasksList);
  }

  attachEditListeners() {
    const editButtons = document.querySelectorAll("button.editBtn");
    editButtons.forEach(function attachEditLister(editButton) {
      editButton.addEventListener("click", taskMgr.editTask);
    });
  }
  editTask() {
    const targetId = event.target.id;
    let editTask = taskMgr.tasksList.filter(
      (taskElement) => taskElement.id == targetId
    );

    s = taskMgr.tasksList.findIndex((x) => x.id == targetId);
    taskForm.taskSubject.value = taskMgr.tasksList[s].name;
    taskForm.taskDescription.value = taskMgr.tasksList[s].description;
    taskForm.taskAssignee.value = taskMgr.tasksList[s].assignee;
    taskForm.taskTime.value = taskMgr.tasksList[s].time;
    taskForm.taskDate.value = taskMgr.tasksList[s].date;
    taskForm.taskStatus.value = taskMgr.tasksList[s].status;
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
        const filteredTasks = taskMgr.tasksList.filter(
          (x) => x.status == filterCondition
        );
        console.log(filteredTasks);
        taskMgr.refreshPage(filteredTasks);
      } else {
        taskMgr.refreshPage(taskMgr.tasksList);
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

// Task class that has the metadata of the card //
class Task {
  constructor(id, name, description, assignee, status, date, time) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.assignee = assignee;
    this.status = status;
    this.date = date;
    this.time = time;
  }

  templateToDom(taskElement) {
    const myHTML = this.htmlTemplate(taskElement);
    const myFragment = document.createRange().createContextualFragment(myHTML);
    console.log("Check" + myFragment);

    return myFragment;
  }

  htmlTemplate(element) {
    const myHTML = `<div class="card" id=${element.id}>
    <div class="card-header" style=" background : lightcoral;" id="head${element.id}">
      <h2 class="mb-0 text-left" style="text-decoration: none;">
        <button id="button${element.id}" class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${element.id}" aria-expanded="false" aria-controls="collapse${element.id}">
          <strong><h5 id ="crdtitle${element.id}" class="text-center" style="color:brown; text-transform: capitalize;">${element.name}</h5></strong> 
        </button>
      </h2>
    </div>
    <div id="collapse${element.id}" class="collapse " style="background-color: lightyellow;"aria-labelledby="head${element.id}" >
      <div class="card-body" style="width: rem; " >
        
        <ul class="list-group " style = "background: lightyellow;">
          <li class="list-group-item" style = "background: lightyellow; text-transform: capitalize;" id ="assignedto1"><strong>Description :</strong> ${element.description}</li>
          <li class="list-group-item" style = "background: lightyellow; text-transform: capitalize;" id ="assignedto1"><strong>Assigned to: </strong>${element.assignee}</li>
          <li class="list-group-item" style = "background: lightyellow; text-transform: capitalize;" id="dateInCard"><strong>Date : </strong>${element.date}</li>
          <li class="list-group-item" style = "background: lightyellow; text-transform: capitalize;" id="time1"><strong>Time :</strong> ${element.time} </li>
          <li class="list-group-item"style = "background: lightyellow;">
          <strong> Status : ${element.status}</strong>
          </li>
          <li class="list-group-item" style = "background: lightyellow;">
          <button class="btn btn-primary editBtn" data-toggle="modal" data-target = "#NewTask" id="${element.id}">Edit</button>

          <button class="btn btn-danger removeBtn"  id="${element.id}">Delete</button></li>
      
        </ul>
        
      </div>
    </div>
  </div>`;
    return myHTML;
  }
}

const taskMgr = new taskManager(taskcontainer);
const task = new Task();

window.addEventListener("load", function () {
  taskForm.addEventListener("input", function (event) {
    taskMgr.checkValidation(event.target);
  });
  taskMgr.loadFromLocalStorage();
  taskMgr.displayTasksByCategory();
  taskMgr.buttonDefault();
});
