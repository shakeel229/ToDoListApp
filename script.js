const taskcontainer = document.querySelector("#task");

let edibtn1 = document.querySelector("#Ebtn1");
let modelt = document.querySelector(".modal-title");

let count = 4;
//Accessing Modal Fields //

let title = document.getElementById("TitleField").form.value;
let desc = document.getElementById("DescriptionField").form.value;

//Accessing Modal fields end here//

let crdtitle1 = document.querySelector("#crdtitle1");

let adnewbtn = document.querySelector(".AddNewBtn");

/*

let tasksarray=[];
let index = 1;
function addTask(){
  let task ={
    id:  `task${index++}`,
    title : document.querySelector("#TitleField").value,
    des :document.querySelector("#DescriptionField").value,
    assg :document.getElementById("AssigneeField").value,
    stat :document.getElementById("status").value,
    dat  : document.getElementById("date").value
  }

  tasksarray.push(task);
  refreshPage(tasksarray);
 
  console.log(tasksarray);


}

function refreshPage(tasks){
  form.innerHTML = "";
  tasks.forEach((task) =>  addTaskToPage(task));

}



function addTaskToPage(task) {
  const myHTML = `<div class="card" id=${task.id}>
    <div class="card-header" id="head${task.id}">
      <h2 class="mb-0 text-left" style="text-decoration: none;">
        <button id="b1" class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${task.id}" aria-expanded="false" aria-controls="collapse${task.id}">
          <strong><h5 id ="crdtitle1" class="text-center" style="text-decoration: none;">${task.title}</h5></strong> 
        </button>
      </h2>
    </div>
    <div id="collapse${task.id}" class="collapse show" aria-labelledby="head${task.id}" >
      <div class="card-body" style="width: rem;" >
        <h5 class="card-title">${task.des}</h5>
        <ul class="list-group ">
          <li class="list-group-item" id ="assignedto1">Assigned to: ${task.assg}</li>
          <li class="list-group-item" id="time1">Time : ${task.date} AM</li>
          <li class="list-group-item">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${task.stat}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" style="z-index: 1 !important;">TO DO</a>
                <a class="dropdown-item" href="#" style="z-index: 1 !important;">In progress</a>
                <a class="dropdown-item" href="#"style="z-index: 1 !important;">REVIEW</a>
                <a class="dropdown-item" href="#"style="z-index: 1 !important;">DONE</a>
              </div>
            </div>
          </li>
          <li class="list-group-item"><button class="btn btn-primary" data-toggle="modal" data-target = "#NewTask" id="Ebtn1">Edit</button>
          <button class="btn btn-danger"  id="delBtn${task.dat}">Delete</button></li>
      
        </ul>
        
      </div>
    </div>
  </div>`;
  // <sript>
  
    /* delBtn${count}.addEventListener('click',)
const taskCard = document.querySelector("#${count}");
console.log(taskCard);
const deleteBtn = document.querySelector("#delBtn");
function deleteCard() {
  console.log(taskCard.innerHTML);
  taskCard.outerHTML = "";
  console.log("del clicked");
}
deleteBtn.addEventListener("click", deleteCard); */

/*
 const myFragment = document.createRange().createContextualFragment(myHTML);
  console.log("Check" +myFragment);
  taskcontainer.append(myFragment);
} 


*/
//console.log({name, description, assignee, status, date});

// below code deals with the validation of the form//
/*const form = document.querySelector('#form');
const taskName = document.querySelector('#TitleField');
const taskDesc = document.querySelector('#DescriptionField');
const taskAssignee = document.querySelector('#AssigneeField');
const taskStatus = document.querySelector('#status');
const taskDate = document.querySelector('#date');

var form1 = document.querySelector("#form");
window.addEventListener("load" , disableSubmit);
taskName.addEventListener("blur" ,validateName);
taskDesc.addEventListener("blur" ,validateDescription);
taskAssignee.addEventListener("blur" ,validateAssignee);
taskDate.addEventListener("blur" ,validateDueDate);
 
function disableSubmit(){
  
  document.getElementById("submit").disabled = true;
}
function validateName() {
  
  const taskNameValue = taskName.value.trim();
  if (taskNameValue == null ||
    taskNameValue == "" ||
    taskNameValue.length == undefined ||
    taskNameValue.length == null ||
    taskNameValue.length == 0 ||
    taskNameValue.length == null ||
    taskNameValue.length == 0)
    {
    setErrorFor(taskName , 'Task Name cannot be blank');
    }

 else if(taskNameValue.length >10){
   setErrorFor(taskName , 'Task Name length must be less than 10 chars');
    }
 else{
   setSuccessFor(taskName);
 }
}


function validateDescription(){
  const taskDescValue = taskDesc.value.trim();
  
  if (taskDescValue === ''){
    setErrorFor(taskDesc , 'Task Description cannot be blank');
     }
  else if(taskDescValue.length >10){
    setErrorFor(taskDesc , 'Task Descrition must not exceed 15 char');
    }
  else {
    setSuccessFor(taskDesc);
    }
}

function validateAssignee(){
  
  const taskAssigneeValue = taskAssignee.value.trim();
  
  
  if (taskAssigneeValue === '' ){
    setErrorFor(taskAssignee , 'Task Must be assigned to someone');
  }
  else if(taskAssigneeValue.length > 8 ){
   setErrorFor(taskAssignee, 'Task Assignee length must not be greater than 10');
   }
 else{
   setSuccessFor(taskAssignee);
   }
}

function validateDueDate(){
 
  const taskDateValue = taskDate.value;
  var todayDate = new Date().toISOString().slice(0,10);
  
  
  if (taskDateValue == null || taskDateValue == ''){
    setErrorFor(taskDate , 'Task must have a due date');
    }
 else if(taskDateValue < todayDate){
  setErrorFor(taskDate , 'Task cannot be created in past date');
  }
 
else{
  setSuccessFor(taskDate);
  }
}

function setErrorFor(input, message){
  const formgroup = input.parentElement;
  console.log(formgroup);
  const small = formgroup.querySelector('small');
  small.innerText = message;
  small.style.color = "red";
  formgroup.className = 'form-group error';
  document.getElementById("submit").disabled = true;
}
/*
}

function setSuccessFor(input){
  const formgroup = input.parentElement;
  const small = formgroup.querySelector('small');
  small.innerText = 'Looks good!';
  small.style.color = "green";
  formgroup.className = 'form-group success';
  document.getElementById("submit").disabled = false;
}
//Validation code ends here//
// delete button code
const taskCard = document.querySelector("#cardA");
console.log(taskCard);
const deleteBtn = document.querySelector("#delBtn");
function deleteCard() {
  console.log(taskCard.innerHTML);
  taskCard.outerHTML = "";
  console.log("del clicked");
}
deleteBtn.addEventListener("click", deleteCard);

*/

/* Task Manager class for the add task , delete task , update task */

class taskManager {
  constructor(parent) {
    this.taskarray = [];
    this.index = 1;
    this.parent = parent;
  }

  addTask(name, description, assignee, status, date, time) {
    if(name.length === 0 || description.length === 0 ||  assignee.length === 0 || status.length === 0 || date.length === 0 || time.length === 0){
      alert("Please fill in the value of input fields in the form");
      
        
    }
    else{const task = new Task(
      `task${this.index++}`,
      name,
      description,
      assignee,
      status,
      date,
      time
    );
    console.log(this.time);
    this.taskarray.push(task);
    console.log(this.taskarray);
    this.refreshPage(this.taskarray);}
    
  }

  updateTask(id, name, description, assignee, status, date, time) {
    for (let i = 0; i < this.taskarray.length; i++) {
      if (this.taskarray[i].id === id) {
        this.taskarray[i].name = name;
        this.taskarray[i].description = description;
        this.taskarray[i].assignee = assignee;
        this.taskarray[i].status = status;
        this.taskarray[i].date = date;
        this.taskarray[i].time = time;
        break;
      }
    }
  }
  refreshPage(tasks) {
    
    this.parent.innerHTML = "";
    this.taskarray.forEach((task) => {
      const element = task.templateToDom();
      this.parent.append(element);
    });
    task.attachDeleteListeners();
  }
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

  setErrorFor(input, message) {
    const formgroup = input.parentElement;
    const small = formgroup.querySelector("small");
    small.innerText = message;
    small.style.color = "red";
    formgroup.className = "form-group error";
    document.getElementById("submit").disabled = true;
  }

  setSuccessFor(input) {
    const formgroup = input.parentElement;
    const small = formgroup.querySelector("small");
    small.innerText = "Looks good!";
    small.style.color = "green";
    formgroup.className = "form-group success";
    document.getElementById("submit").disabled = false;
  }

  nameValidation(name) {
    const nameVal = name.value;
    if (
      nameVal == null ||
      nameVal == "" ||
      nameVal.length == undefined ||
      nameVal.length == null ||
      nameVal.length == 0 ||
      nameVal.length == null ||
      nameVal.length == 0
    ) {
      task.setErrorFor(name, "Task Name cannot be blank");
      document.getElementById("submit").disabled = true;
    } else if (nameVal.length > 10) {
      task.setErrorFor(name, "Task Name length must be less than 10 chars");
      document.getElementById("submit").disabled = true;
    } else {
      task.setSuccessFor(name);
      document.getElementById("submit").disabled = false;
    }
  }

   descrValidation(description){
    const taskDescValue = description.value.trim();

    if (taskDescValue === "") {
      task.setErrorFor(description, "Task Description cannot be blank");
      document.getElementById("submit").disabled = true;
    } else if (taskDescValue.length > 20) {
      task.setErrorFor(description, "Task Descrition must not exceed 15 char");
      document.getElementById("submit").disabled = true;
    } else {
      task.setSuccessFor(description);
      document.getElementById("submit").disabled = false;
    }

     }

    assigneeValidation(assignee){
      const taskAssigneeValue = assignee.value.trim();
      if (taskAssigneeValue === "") {
        task.setErrorFor(assignee, "Task Must be assigned to someone");
        document.getElementById("submit").disabled = true;
      } else if (taskAssigneeValue.length > 8) {
        task.setErrorFor(
          assignee,
          "Task Assignee length must not be greater than 10"
        );
        document.getElementById("submit").disabled = true;
      } else {
        task.setSuccessFor(assignee);
        document.getElementById("submit").disabled = false;
      }
    }
   

    dateValidation(date){
      const taskDateValue = date.value;
      var todayDate = new Date().toISOString().slice(0, 10);
      if (taskDateValue == null || taskDateValue == "") {
        task.setErrorFor(date, "Task must have a due date");
        document.getElementById("submit").disabled = true;
      } else if (taskDateValue < todayDate) {
        task.setErrorFor(date, "Task cannot be created in past date");
        document.getElementById("submit").disabled = true;
      } else {
        task.setSuccessFor(date);
        document.getElementById("submit").disabled = false;
      }

    }

  templateToDom() {
    const myHTML = this.htmlTemplate();
    const myFragment = document.createRange().createContextualFragment(myHTML);
    console.log("Check" + myFragment);

    return myFragment;
  }
  attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll("button.removeBtn");
    console.log(deleteButtons);
    deleteButtons.forEach(function attacher(butn) {
      butn.addEventListener("click", handleClick);
    });
    function handleClick() {
      console.log(event.target);
      const targetId = event.target.id;
      console.log(taskMgr.taskarray);
      taskMgr.taskarray = taskMgr.taskarray.filter(
        (taskElement) => taskElement.id != targetId
      );
      // taskMgr.taskarray = taskMgr.taskarray.filter(function (arrayElement) {
      //   if (arrayElement.id == targetId {

      //   }
      // });
      // taskMgr.taskarray = s;
      console.log(taskMgr.taskarray);
      taskMgr.refreshPage(taskMgr.taskarray);
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
          <li class="list-group-item" style = "background: lightyellow;" id="date"><strong>Date : </strong>${this.date}</li>
          <li class="list-group-item" style = "background: lightyellow;" id="time1"><strong>Time :</strong> ${this.time} </li>
          <li class="list-group-item"style = "background: lightyellow;">
          <strong> Status : ${this.status}</strong>
          </li>
          <li class="list-group-item" style = "background: lightyellow;"><button class="btn btn-primary" data-toggle="modal" data-target = "#NewTask" id="Ebtn${this.id}">Edit</button>
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
const submit = document.getElementById("submit");

submit.addEventListener("click", submitButtonClicked);
//validation call for form //
const name1 = document.querySelector("#TitleField");
const description1 = document.querySelector("#DescriptionField");
const assignee1 = document.getElementById("AssigneeField");
const date1 = document.getElementById("date");
name1.addEventListener("input", function(){task.nameValidation(name1)});
description1.addEventListener("input", function(){task.descrValidation(description1)});
assignee1.addEventListener("input", function(){task.assigneeValidation(assignee1)});
date1.addEventListener("input", function(){task.dateValidation(date1)});




function submitButtonClicked() {
  const form = document.querySelector("#form");
  const name = document.querySelector("#TitleField").value;
  const description = document.querySelector("#DescriptionField").value;
  const assignee = document.getElementById("AssigneeField").value;
  const status = document.getElementById("status").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  taskMgr.addTask(name, description, assignee, status, date, time);
  form.reset();
}
