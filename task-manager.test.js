import path from "path";
import Task from "./task.js";

import { TaskManager } from "./task-manager";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
let taskContainer;
let taskMgr;
describe("Test Cases of Task Manager Class", function () {
  beforeAll(function () {
    document.body.innerHTML = html.toString();
    taskContainer = document.getElementById("task");
    const upcomingCards = document.querySelector(".upcomingSection");
    const form = document.querySelector("form");
    taskMgr = new TaskManager(taskContainer, upcomingCards, form);
  });
  test("Adding New Task to Array of tasks and DOM", function () {
    taskMgr.addTask(
      "task1",
      "Grocery Shopping",
      "go to coles",
      "shakeel anjum",
      "2020-10-05",
      "pending",
      "21:32"
    );
    //task added to tasks list
    expect(taskMgr.tasksList.length).toBe(1);
    //today tasks DIV is empty because date is future one
    expect(taskMgr.todayTasksContainer.innerHTML).toBe("");
    //upcoming tasks DIV have two elements 1 is the task and 1 is the heading of DIV 'Upcoming Tasks'
    expect(taskMgr.upcomingTasksContainer.childElementCount).toBe(2);
    expect(taskMgr.upcomingTasksContainer.innerHTML).toContain("shakeel anjum");
  });
  test("Update Task from tasks List and DOM as well", function () {
    //const deleteButton = document.querySelector("button.removeBtn");
    //deleteButton.click();
    taskMgr.editTasks(taskMgr.tasksList, "task0");
    //expect(taskMgr.tasksList.length).toBe(0);
    //today tasks DIV is empty because date is future one
    expect(taskMgr.todayTasksContainer.innerHTML).toBe("");
    //upcoming tasks DIV have no tasks 1 is the heading of DIV 'Upcoming Tasks'
    expect(taskMgr.upcomingTasksContainer.childElementCount).toBe(2);
  });
  test("Delete Task from Tasks List and DOM as well", function () {
    //const deleteButton = document.querySelector("button.removeBtn");
    //deleteButton.click();
    taskMgr.deleteTask(taskMgr.tasksList, "task0");
    expect(taskMgr.tasksList.length).toBe(0);
    //today tasks DIV is empty because date is future one
    expect(taskMgr.todayTasksContainer.innerHTML).toBe("");
    //upcoming tasks DIV have no tasks 1 is the heading of DIV 'Upcoming Tasks'
    expect(taskMgr.upcomingTasksContainer.childElementCount).toBe(1);
  });
});
/**taskMgr.addTask(
      "task1",
      "grocery shopping",
      "visit coles",
      "shakeel",
      "pending",
      "2020-09-05",
      "20:34"
    ); */
