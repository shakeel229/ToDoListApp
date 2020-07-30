
const taskcontainer = document.querySelector("#task")

let edibtn1 = document.querySelector("#Ebtn1");
let modelt = document.querySelector(".modal-title");

let count = 5;
//Accessing Modal Fields //

let title = document.getElementById("TitleField").form.value;
let desc = document.getElementById("DescriptionField").form.value;

//Accessing Modal fields end here//

let crdtitle1 = document.querySelector("#crdtitle1");

let adnewbtn = document.querySelector(".AddNewBtn");

console.log(modelt);
console.log(title);
edibtn1.onclick = function() {
    modelt.textContent = "Edit Task";
    title.placeholder =  crdtitle1.textContent;
    
}


const submit = document.getElementById("submit");
console.log(submit);

//Anindha class//

submit.addEventListener("click" , submitButtonClicked);

function submitButtonClicked(){
const name = document.querySelector("#TitleField").value;
const description = document.querySelector("#DescriptionField").value;
const assignee = document.getElementById("AssigneeField").value;
const status = document.getElementById("status").value;
const date = document.getElementById("date").value;
  
    validateInputs();
     
    console.log({ name, description, assignee, status, date }); 
    addtask(name, description, assignee, date, status);
    
    
}

function addtask(name, description, assignee, date, status){

    const myHTML = 
    `<div class="card">
    <div class="card-header" id="head${count}">
      <h2 class="mb-0 text-left" style="text-decoration: none;">
        <button id="b1" class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${count}" aria-expanded="false" aria-controls="collapse${count}">
          <strong><h5 id ="crdtitle1" class="text-center" style="text-decoration: none;">${name}</h5></strong> 
        </button>
      </h2>
    </div>
    <div id="collapse${count}" class="collapse show" aria-labelledby="head${count}" >
      <div class="card-body" style="width: rem;" >
        <h5 class="card-title">${description}</h5>
        <ul class="list-group ">
          <li class="list-group-item" id ="assignedto1">Assigned to: ${assignee}</li>
          <li class="list-group-item" id="time1">Time : ${date} AM</li>
          <li class="list-group-item">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${status}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" style="z-index: 1 !important;">TO DO</a>
                <a class="dropdown-item" href="#" style="z-index: 1 !important;">In progress</a>
                <a class="dropdown-item" href="#"style="z-index: 1 !important;">REVIEW</a>
                <a class="dropdown-item" href="#"style="z-index: 1 !important;">DONE</a>
              </div>
            </div>
          </li>
          <li class="list-group-item"><button class="btn btn-primary" data-toggle="modal" data-target = "#NewTask" id="Ebtn1">Edit</button></li>
        </ul>
        
      </div>
    </div>
  </div>`;
 

  const myFragment = document.createRange()
  .createContextualFragment(myHTML);

  taskcontainer.append(myFragment);
  
  count++;

    //console.log({name, description, assignee, status, date});
}

// below code deals with the validation of the form//
const form = document.querySelector('#form');
const taskName = document.querySelector('#TitleField');
const taskDesc = document.querySelector('#DescriptionField');
const taskAssignee = document.querySelector('#AssigneeField');
const taskStatus = document.querySelector('#status');
const taskDate = document.querySelector('#date');


function validateInputs() {
  const taskNameValue = taskName.value.trim();
  const taskDescValue = taskDesc.value.trim();
  const taskAssigneeValue = taskAssignee.value.trim();
  const taskStatusValue = taskStatus.value.trim();
  const taskDateValue = taskDate.value;
  console.log(taskName);
   console.log(taskDesc);
  
/*validates for the taskName*/
  if (taskNameValue === '' ){
     setErrorFor(taskName , 'Task Name cannot be blank');
     $('#submit').attr('disabled',true);
  }

  else if(taskNameValue.length < 6 || taskNameValue.length >10){
    setErrorFor(taskName , 'Task Name length must be less than 6 and not greater than 10');
     $('#submit').attr('disabled',true);
  }
  else{
    setSuccessFor(taskName);
    
  }
  /*Validates Task Description*/
  if (taskDescValue === ''){
    setErrorFor(taskDesc , 'Task Description cannot be blank');
     $('#submit').attr('disabled',true);
  }
  else if(taskDescValue.length < 6 || taskDescValue.length >10){
    setErrorFor(taskDesc , 'Task Descrition must not exceed 15 char');
     $('#submit').attr('disabled',true);
  }
 
  else {
    setSuccessFor(taskDesc);
  }
  /*validates Task assignee*/
  console.log(taskAssigneeValue);
  if (taskAssigneeValue === '' ){
    setErrorFor(taskAssignee , 'Task Must be assigned to someone');
    $('#submit').attr('disabled',true);
 }

 else if(taskAssigneeValue.length < 3 || taskAssigneeValue.length > 8 ){
   setErrorFor(taskAssignee, 'Task Assignee length must be less than 6 and not greater than 10');
    $('#submit').attr('disabled',true);
 }
 else{
   setSuccessFor(taskAssignee);
   
 }
 /*Validate Due Date*/
  var todayDate = new Date().toISOString().slice(0,10);
  
  console.log(taskDateValue);
  if (taskDateValue == null || taskDateValue == ''){
    setErrorFor(taskDate , 'Task must have a due date');
    $('#submit').attr('disabled',true);
 }
 else if(taskDateValue < todayDate){
  setErrorFor(taskDate , 'Task cannot be created in past date');
   $('#submit').attr('disabled',true);
}
 
else{
  setSuccessFor(taskDate);
  
}
}

function setErrorFor(input, message){
  const formgroup = input.parentElement;
  const small = formgroup.querySelector('small');
  small.innerText = message;
  small.style.color = "red";
  formgroup.className = 'form-group error';

}

function setSuccessFor(input){
  const formgroup = input.parentElement;
  const small = formgroup.querySelector('small');
  small.innerText = 'Looks good!';
  small.style.color = "green";
  formgroup.className = 'form-group success';
}
//Validation code ends here//