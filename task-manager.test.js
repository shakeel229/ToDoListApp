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
    const form = document.getElementById("form");
    taskMgr = new TaskManager(taskContainer, upcomingCards, form);
  });
  test("Adding New Task to Array of tasks and DOM", function () {
    taskMgr.addTask(
      "shopping",
      "Grocery Shopping from coles",
      "shakeel anjum",
      "pending",
      "2020-10-05",
      "21:32"
    );
    //task added to tasks list
    expect(taskMgr.tasksList.length).toBe(1);
    //today tasks DIV is empty because date is future one
    expect(taskMgr.todayTasksContainer.innerHTML).toBe("");
    //upcoming tasks DIV have two elements 1 is the task and 1 is the heading of DIV 'Upcoming Tasks'
    expect(taskMgr.upcomingTasksContainer.childElementCount).toBe(2);
    expect(taskMgr.upcomingTasksContainer.innerHTML).toContain("shakeel anjum");
    expect(taskMgr.upcomingTasksContainer.innerHTML).toContain("2020-10-05");
  });
  test("Update Task from tasks List and DOM as well", function () {
    const form1 = document.getElementById("form");
    taskMgr.updateTask(
      "0",
      "Go for Walk",
      "go to park",
      "Ayushi karn",
      "review",
      "2025-12-06",
      "20:30"
    );
    expect(taskMgr.todayTasksContainer.innerHTML).toBe("");
    //upcoming tasks DIV have 2 elements 1 is task 1 is the heading of DIV 'Upcoming Tasks'
    expect(taskMgr.upcomingTasksContainer.childElementCount).toBe(2);
    expect(taskMgr.tasksList.length).toBe(1);
    expect(taskMgr.upcomingTasksContainer.innerHTML).toContain("Go for Walk");
    expect(taskMgr.upcomingTasksContainer.innerHTML).toContain("review");
  });
  test("Delete Task from Tasks List and DOM as well", function () {
    //const deleteButton = document.querySelector("button.removeBtn");

    taskMgr.deleteTask(taskMgr.tasksList, "task0");
    expect(taskMgr.tasksList.length).toBe(0);
    //today tasks DIV is empty because date is future one
    expect(taskMgr.todayTasksContainer.innerHTML).toBe("");
    //upcoming tasks DIV have no tasks 1 is the heading of DIV 'Upcoming Tasks'
    expect(taskMgr.upcomingTasksContainer.childElementCount).toBe(1);
  });
});
