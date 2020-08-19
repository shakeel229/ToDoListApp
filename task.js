// Task class that has the metadata of the card //
export default class Task {
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
      <div class="card-header"  id="head${element.id}">
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
