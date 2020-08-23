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

    taskMgr = new TaskManager(taskContainer, upcomingCards);
  });
  test("Adding New Task to Array of tasks", function () {
    console.log(taskContainer);
    taskMgr.addTask(
      "task1",
      "grocery shopping",
      "visit coles",
      "shakeel",
      "pending",
      "2020-09-05",
      "20:34"
    );

    expect(taskMgr.tasksList.length).toBe(1);
  });
});
