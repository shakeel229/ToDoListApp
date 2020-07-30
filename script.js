
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

let taskTitle = document.querySelector("#TitleField");
let validmsg = document.querySelector("#errorMsg");


var paragraph = document.createElement('p');
validmsg.append(paragraph);


console.log(taskTitle);


taskTitle.addEventListener("input" , titleValidation);

function titleValidation () {
  let taskTitleval = document.querySelector("#TitleField").value;
  let msg = document.querySelector("#msg");
  console.log(msg);
  console.log(taskTitleval);
   if( taskTitleval==""){
       taskTitle.classList.add("is-invalid");
       validmsg.classList.add("invalid-feedback");
       console.log(taskTitleval);
       msg.innerHTML = "Invalid-input it can't be blank";

   }
   else if( taskTitleval.length < 4 ) {
    taskTitle.classList.add("is-invalid");
    validmsg.classList.add("invalid-feedback");
    console.log("going to else if");
    msg.innerHTML = "Invalid-input it can't be short";
   }
   else if(taskTitleval.length > 4){
    taskTitle.classList.remove("is-invalid");
    validmsg.classList.remove("invalid-feedback");
    taskTitle.classList.add("is-valid");
    validmsg.classList.add("valid-feedback");
    console.log("going to else");
    msg.innerHTML = "All good!";
    

   }
}

function titleValidation () {
  let taskTitleval = document.querySelector("#TitleField").value;
  let msg = document.querySelector("#msg");
  console.log(msg);
  console.log(taskTitleval);
   if( taskTitleval==""){
       taskTitle.classList.add("is-invalid");
       validmsg.classList.add("invalid-feedback");
       console.log(taskTitleval);
       msg.innerHTML = "Invalid-input it can't be blank";

   }
   else if( taskTitleval.length < 4 ) {
    taskTitle.classList.add("is-invalid");
    validmsg.classList.add("invalid-feedback");
    console.log("going to else if");
    msg.innerHTML = "Invalid-input it can't be short";
   }
   else if(taskTitleval.length > 4){
    taskTitle.classList.remove("is-invalid");
    validmsg.classList.remove("invalid-feedback");
    taskTitle.classList.add("is-valid");
    validmsg.classList.add("valid-feedback");
    console.log("going to else");
    msg.innerHTML = "All good!";
    

   }
}








