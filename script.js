let edibtn1 = document.querySelector("#Ebtn1");
let modelt = document.querySelector(".modal-title");
let title = document.querySelector("#TitleField");
let crdtitle1 = document.querySelector("#crdtitle1");

let adnewbtn = document.querySelector(".AddNewBtn");

console.log(modelt);
console.log(title);
edibtn1.onclick = function() {
    modelt.textContent = "Edit Task";
    title.placeholder =  crdtitle1.textContent;
    
}

adnewbtn.onclick = function(){
    modelt.textContent =  "New Task";
    title.placeholder = "Add a Title";

}
    

