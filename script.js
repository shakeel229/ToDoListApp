//global variable for form to acces fields anywhere in code
const taskForm= document.querySelector('[name="taskForm"]');
const formFooter= document.querySelector('[name="formFooter"]');
const formTitle= document.querySelector('[name="formTitle"]');
const submitBtn =document.getElementById("submit")
document.getElementById("addTaskBtn").addEventListener("click", resetTaskForm);
function resetTaskForm() {
  formTitle.innerText = "New Task ";
  submitBtn.innerText = "Submit ";
}
const taskcontainer = document.querySelector("#task");
let editedTask = false;
let s = null;


/* Task Manager class for the add task , delete task , update task */
class taskManager {
  constructor(parent) {
    this.tasksList = [];
    this.index = 1;
    this.parent = parent;
    this.minLength = 1;
    this.maxLength = 20;
  }

  alertOnSubmit(){
      alert("Please fill in all the fields , Task can't be blank");
      document.getElementById("submit").disabled = true;
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
        `task${this.index++}`,
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
  refreshPage(tasksArray) {
    this.parent.innerHTML = "";
    // this.tasksList.forEach((task)
    tasksArray.forEach((task) => {
      const element = task.templateToDom();
      this.parent.append(element);
    });
    this.attachDeleteListeners();
    this.attachEditListeners();
    this.resetValidation();
  }
  //attach delete listeners
  attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll("button.removeBtn");
    console.log(deleteButtons);
    deleteButtons.forEach(function attacher(butn) {
      butn.addEventListener("click", taskMgr.deleteTask);
    });
  }
  deleteTask() {
    const targetId = event.target.id;
    taskMgr.tasksList = taskMgr.tasksList.filter(
      (taskElement) => taskElement.id != targetId
    );
    taskMgr.refreshPage(taskMgr.tasksList);
  }
  //validation code starts here 
  attachEditListeners() {
    const editButtons = document.querySelectorAll("button.editBtn");
    console.log(editButtons);
    editButtons.forEach(function attachEditLister(editButton) {
      editButton.addEventListener("click", taskMgr.editTask);
    });
  }
  editTask() {
    const targetId = event.target.id;
    console.log(targetId);
    let editTask = taskMgr.tasksList.filter(
      (taskElement) => taskElement.id == targetId
    );

    s = taskMgr.tasksList.findIndex((x) => x.id == targetId);
    console.log(s);
    console.log(taskMgr.tasksList[s].name);
    taskForm.taskSubject.value= taskMgr.tasksList[s].name;
    taskForm.taskDescription.value= taskMgr.tasksList[s].description;
    taskForm.taskAssignee.value = taskMgr.tasksList[s].assignee;
    taskForm.taskTime.value = taskMgr.tasksList[s].time;
    taskForm.taskDate.value = taskMgr.tasksList[s].date;
    taskForm.taskStatus.value = taskMgr.tasksList[s].status;
    submitBtn.innerText='Update ';  
    formTitle.innerText = "Edit Task";
    editedTask = true;
  }
  validation(input){
    const field = input;
    
    if(field.value.length < this.minLength || field.value.length === "undefined"){
      this.setErrorFor(field , `${field.name} cannot be blank` );
      submitBtn.disabled = true;
    }
    else if (field.value.length > this.maxLength ){
      this.setErrorFor(field ,  `${field.name} is longer than 20 char!`);
      submitBtn.disabled = true;
    }
    else {
      this.setSuccessFor(field);
      submitBtn.disabled = false;
    }
    }


    dateValidation(date) {
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

    setErrorFor(input, message) {
      const formgroup = input.parentElement;
      const small = formgroup.querySelector("small");
      small.innerText = message;
      small.style.color = "red";
      formgroup.className = "form-group error";
      submitBtn.disabled = true;
    }
  
    setSuccessFor(input) {
      const formgroup = input.parentElement;
      const small = formgroup.querySelector("small");
      small.innerText = "Looks good!";
      small.style.color = "green";
      formgroup.className = "form-group success";
      submitBtn.disabled = false;
    }
  

//validation code ends here//
    
// this code deals with clearing the validation classesand message when a form is launched again - for repo//

  resetValidation(){
    form.reset();
    const validationClass = document.getElementsByClassName("form-group success");
    const validationEClass = document.getElementsByClassName("form-group error");
    while (validationClass.length ) {
      validationClass[0].classList.remove('success');
      }
    while (validationEClass.length ) {
      validationEClass[0].classList.remove('error');
        }

    
    const validationMsg = document.getElementsByClassName("msg");
    console.log(validationMsg.length)
    for(var i = 0; i < validationMsg.length; i++){
    validationMsg[i].innerText = "";
   }
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

  templateToDom() {
    const myHTML = this.htmlTemplate();
    const myFragment = document.createRange().createContextualFragment(myHTML);
    console.log("Check" + myFragment);

    return myFragment;
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
  htmlTemplate() {
    const myHTML = `<div class="card" id=${this.id}>
    <div class="card-header" style=" background : lightcoral;" id="head${this.id}">
      <h2 class="mb-0 text-left" style="text-decoration: none;">
        <button id="button${this.id}" class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${this.id}" aria-expanded="false" aria-controls="collapse${this.id}">
          <strong><h5 id ="crdtitle${this.id}" class="text-center" style="color:brown;">${this.name}</h5></strong> 
        </button>
      </h2>
    </div>
    <div id="collapse${this.id}" class="collapse " style="background-color: lightyellow;"aria-labelledby="head${this.id}" >
      <div class="card-body" style="width: rem; " >
        
        <ul class="list-group " style = "background: lightyellow;">
          <li class="list-group-item" style = "background: lightyellow;" id ="assignedto1"><strong>Description :</strong> ${this.description}</li>
          <li class="list-group-item" style = "background: lightyellow;" id ="assignedto1"><strong>Assigned to: </strong>${this.assignee}</li>
          <li class="list-group-item" style = "background: lightyellow;" id="dateInCard"><strong>Date : </strong>${this.date}</li>
          <li class="list-group-item" style = "background: lightyellow;" id="time1"><strong>Time :</strong> ${this.time} </li>
          <li class="list-group-item"style = "background: lightyellow;">
          <strong> Status : ${this.status}</strong>
          </li>
          <li class="list-group-item" style = "background: lightyellow;">
          <button class="btn btn-primary editBtn" data-toggle="modal" data-target = "#NewTask" id="${this.id}">Edit</button>

          <button class="btn btn-danger removeBtn"  id="${this.id}">Delete</button></li>
      
        </ul>
        
      </div>
    </div>
  </div>`;
    return myHTML;
  }
}

const taskMgr = new taskManager(taskcontainer);
const task = new Task();
task.displayTasksByCategory();
const submit = submitBtn;

submit.addEventListener("click", submitButtonClicked);
//validation call for form //



const name1 = document.querySelector("#TitleField");
const description1 = document.querySelector("#DescriptionField");
const assignee1 = document.getElementById("AssigneeField");
const date1 = document.getElementById("date");
name1.addEventListener("input", function () {
  taskMgr.validation(name1);
});
description1.addEventListener("input", function () {
  taskMgr.validation(description1);
});
assignee1.addEventListener("input", function () {
  taskMgr.validation(assignee1);
});
date1.addEventListener("input", function () {
  taskMgr.dateValidation(date1);
});

function submitButtonClicked(event) {
  document.getElementById("tasksFilter").value = "All Tasks";
  const form = document.querySelector("#form");
  const name = taskForm.taskSubject.value;
  const description = taskForm.taskDescription.value;
  const assignee = taskForm.taskAssignee.value;
  const status = taskForm.taskStatus.value;
  const date = taskForm.taskDate.value;
  const time = taskForm.taskTime.value
  
  if (editedTask) {
    editedTask = false;
    taskMgr.tasksList[s].name = name;
    taskMgr.tasksList[s].description = description;
    taskMgr.tasksList[s].assignee = assignee;
    taskMgr.tasksList[s].status = status;
    taskMgr.tasksList[s].date = date;
    taskMgr.tasksList[s].time = time;
    taskMgr.refreshPage(taskMgr.tasksList);
  } else {
    taskMgr.addTask(taskForm.taskSubject.value, taskForm.taskDescription.value,taskForm.taskAssignee.value, taskForm.taskStatus.value, taskForm.taskDate.value, taskForm.taskTime.value);
  }
  
  
}


const reset = document.getElementById("reset");
reset.addEventListener("click", function () {
  taskMgr.resetValidation();
});


const cancel = document.getElementById("cancel");
cancel.addEventListener("click", function () {
  taskMgr.resetValidation();
});

const closeForm = document.getElementById("close");
closeForm.addEventListener("click", function () {
  taskMgr.resetValidation();
});
