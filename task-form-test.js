//import React from 'react';
import path from "path";
import { TaskForm } from "./task-form";
import { TaskManager } from "./task-manager";
//import { TaskManager } from "./task-manager";
import fs from "fs";

const htmlDom = fs.readFileSync(
  path.resolve(__dirname, "./index.html"),
  "utf8"
);

describe("Unit test for TaskForm Class", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    document.body.innerHTML = htmlDom.toString();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("test the task subject validation ", () => {
    const taskform = document.getElementById("form");
    let taskfrm = new TaskForm(taskform);
    const input = document.getElementById("TitleField");
    document.getElementById("TitleField").value = "adaddsnvkbhijopk";
    taskfrm.checkValidation(input);
    const inputParent = document.getElementById("title");
    expect(inputParent.classList).toContain("success");
  });
  test("test the task subject validation ", () => {
    const taskform = document.getElementById("form");
    let taskfrm = new TaskForm(taskform);
    const input = document.getElementById("TitleField");
    document.getElementById("TitleField").value = "adaddsnvkbhijopk";
    taskfrm.checkValidation(input);
    const inputParent = document.getElementById("title");
    expect(inputParent.classList).toContain("success");
  });
  test("test the task Description validation", () => {
    const taskform = document.getElementById("form");
    let taskfrm = new TaskForm(taskform);
    const input = document.getElementById("DescriptionField");
    document.getElementById("DescriptionField").value = "";
    taskfrm.checkValidation(input);
    const inputParent = document.getElementById("desc");
    expect(inputParent.classList).toContain("error");
  });

  test("test the task Assignee validation", () => {
    const taskform = document.getElementById("form");
    let taskfrm = new TaskForm(taskform);
    const input = document.getElementById("AssigneeField");
    document.getElementById("AssigneeField").value = "Ayushi";
    taskfrm.checkValidation(input);
    const inputParent = document.getElementById("assignTo");
    expect(inputParent.classList).toContain("success");
  });

  test("test the task Due Date validation", () => {
    const taskform = document.getElementById("form");
    let taskfrm = new TaskForm(taskform);
    const input = document.getElementById("date");
    console.log(input);
    document.getElementById("date").value = "2020-08-25";
    taskfrm.checkValidation(input);
    const inputParent = document.getElementById("dueDate");
    expect(inputParent.classList).toContain("success");
  });
});
