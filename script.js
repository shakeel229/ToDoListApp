const taskcontainer = document.querySelector("#task");
let tasksList = [];
let edibtn1 = document.querySelector("#Ebtn1");
let modelt = document.querySelector(".modal-title");

let count = 5;
//Accessing Modal Fields //

let title = document.getElementById("TitleField").form.value;
let desc = document.getElementById("DescriptionField").form.value;

//Accessing Modal fields end here//

let crdtitle1 = document.querySelector("#crdtitle1");

let adnewbtn = document.querySelector(".AddNewBtn");

//function to create task object
function createTaskObject(title, taskdesc, assigned, status, date, time) {
  const TaskContent = {
    title: title,
    taskDescription: taskdesc,
    assignedTo: assigned,
    status: status,
    date: date,
    time: time,
  };
  return TaskContent;
}

console.log(modelt);
console.log(title);
edibtn1.onclick = function () {
  modelt.textContent = "Edit Task";
  title.placeholder = crdtitle1.textContent;
};

const submit = document.getElementById("submit");
console.log(submit);

//A//

submit.addEventListener("click", submitButtonClicked);

function submitButtonClicked() {
  const name = document.querySelector("#TitleField").value;
  const description = document.querySelector("#DescriptionField").value;
  const assignee = document.getElementById("AssigneeField").value;
  const status = document.getElementById("status").value;
  const date = document.getElementById("date").value;
  const timee = document.getElementById("time").value;
  // validateInputs();
  const d = createTaskObject(name, description, assignee, status, date, timee);
  tasksList.push(d);
  tasksList.push(d);
  console.log(tasksList + typeof tasksList);
  //console.log({ name, description, assignee, status, date });
  for (i = 0; i < tasksList.length; i++) {
    addtask(
      tasksList[i].title,
      tasksList[i].taskDescription,
      tasksList[i].assignedTo,
      tasksList[i].status,
      tasksList[i].date,
      tasksList[i].time
    );
  }
  // addtask(
  //   tasksList[0].title,
  //   tasksList[0].taskDescription,
  //   tasksList[0].assignedTo,
  //   tasksList[0].status,
  //   tasksList[0].date,
  //   tasksList[0].time
  // );
}

function addtask(name, description, assignee, status, date, time) {
  const myHTML = `<div class="card">
  <div class="card-header" id="head">
    <h2 class="mb-0 text-left" style="text-decoration: none;">
      <button id="b1" class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
        <strong><h5 id ="crdtitle1" class="text-center" style="text-decoration: none;">${name}</h5></strong> 
      </button>
    </h2>
  </div>
  <div id="collapse1" class="collapse show" aria-labelledby="head1" >
    <div class="card-body" style="width: rem;" >
      
      <ul class="list-group ">
      <li class="list-group-item" id ="assignedto1"><strong>Task Description : </strong>${description}</li>

        <li class="list-group-item" id ="assignedto1"><strong>Assigned to : </strong>${assignee}</li>
        <li class="list-group-item" id="date"><strong>Date : </strong>${date}</li>
        <li class="list-group-item" id="time1"><strong>Time : </strong>${time}</li>
        <li class="list-group-item">
        <strong> Status : ${status}</strong>
        </li>
        <li class="list-group-item"><button class="btn btn-primary" data-toggle="modal" data-target = "#NewTask" id="Ebtn1">Edit</button>
          <button class="btn btn-danger delete"  id="delBtn">Delete</button></li>
       
        
      </ul>
      
    </div>
  </div>
</div>`;

  const myFragment = document.createRange().createContextualFragment(myHTML);

  taskcontainer.appendChild(myFragment);

  count++;

  const delbuttons = document.querySelectorAll(".delete");
  console.log(delbuttons);
  delbuttons.forEach((buttn) => addEventListener("click", deleteCard));
  function deleteCard(event) {
    console.log(event.currentTarget);
  }
  //console.log({name, description, assignee, status, date});
}

// below code deals with the validation of the form//
const form = document.querySelector("#form");
const taskName = document.querySelector("#TitleField");
const taskDesc = document.querySelector("#DescriptionField");
const taskAssignee = document.querySelector("#AssigneeField");
const taskStatus = document.querySelector("#status");
const taskDate = document.querySelector("#date");

var form1 = document.querySelector("#form");
window.addEventListener("load", disableSubmit);
taskName.addEventListener("blur", validateName);
taskDesc.addEventListener("blur", validateDescription);
taskAssignee.addEventListener("blur", validateAssignee);
taskDate.addEventListener("blur", validateDueDate);

function disableSubmit() {
  document.getElementById("submit").disabled = true;
}
function validateName() {
  const taskNameValue = taskName.value.trim();
  if (
    taskNameValue == null ||
    taskNameValue == "" ||
    taskNameValue.length == undefined ||
    taskNameValue.length == null ||
    taskNameValue.length == 0 ||
    taskNameValue.length == null ||
    taskNameValue.length == 0
  ) {
    setErrorFor(taskName, "Task Name cannot be blank");
  } else if (taskNameValue.length > 10) {
    setErrorFor(taskName, "Task Name length must be less than 10 chars");
  } else {
    setSuccessFor(taskName);
  }
}

function validateDescription() {
  const taskDescValue = taskDesc.value.trim();

  if (taskDescValue === "") {
    setErrorFor(taskDesc, "Task Description cannot be blank");
  } else if (taskDescValue.length > 10) {
    setErrorFor(taskDesc, "Task Descrition must not exceed 15 char");
  } else {
    setSuccessFor(taskDesc);
  }
}

function validateAssignee() {
  const taskAssigneeValue = taskAssignee.value.trim();

  console.log(taskAssigneeValue);
  if (taskAssigneeValue === "") {
    setErrorFor(taskAssignee, "Task Must be assigned to someone");
  } else if (taskAssigneeValue.length > 8) {
    setErrorFor(
      taskAssignee,
      "Task Assignee length must not be greater than 10"
    );
  } else {
    setSuccessFor(taskAssignee);
  }
}

function validateDueDate() {
  const taskDateValue = taskDate.value;
  var todayDate = new Date().toISOString().slice(0, 10);

  console.log(taskDateValue);
  if (taskDateValue == null || taskDateValue == "") {
    setErrorFor(taskDate, "Task must have a due date");
  } else if (taskDateValue < todayDate) {
    setErrorFor(taskDate, "Task cannot be created in past date");
  } else {
    setSuccessFor(taskDate);
  }
}

function setErrorFor(input, message) {
  const formgroup = input.parentElement;
  const small = formgroup.querySelector("small");
  small.innerText = message;
  small.style.color = "red";
  formgroup.className = "form-group error";
  document.getElementById("submit").disabled = true;
}

function setSuccessFor(input) {
  const formgroup = input.parentElement;
  const small = formgroup.querySelector("small");
  small.innerText = "Looks good!";
  small.style.color = "green";
  formgroup.className = "form-group success";
  document.getElementById("submit").disabled = false;
}
//Validation code ends here//
//delete button code

// function deleteCard(event) {
//   console.log("dely clicked");
//   const deleteButtonClicked = event.currentTarget;
//   console.log(deleteButtonClicked);
//   deleteButtonClicked.closest(".card").remove();
//   // deleteButtonClicked.closest(".card").remove();
// }
// delete button code
// const taskCard = document.querySelector("#cardA");
// console.log(taskCard);
// const deleteBtn = document.querySelector("#delBtn");
// function deleteCard() {
//   console.log(taskCard.innerHTML);
//   taskCard.outerHTML = "";
//   console.log("del clicked");
// }
// deleteBtn.addEventListener("click", deleteCard);
