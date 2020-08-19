import path from "path";
import Task from "./task.js";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
//import taskManager from "./script.js";
describe("Test Task Planner Actions", function () {
  beforeAll(function () {
    document.body.innerHTML = html.toString();
  });
  test("It should Create New Task Object", function () {
    const task = new Task(
      "task1",
      "grocery shopping",
      "visit coles",
      "shakeel",
      "pending",
      "08/08/20",
      "12:30 Pm"
    );

    expect(task.id).toBe("task1");
    expect(task.assignee).toBe("shakeel");
    expect(task.date).toBe("08/08/20");
    expect(task.description).toBe("visit coles");
    expect(task.name).toBe("grocery shopping");
    expect(task.status).toBe("pending");
    expect(task.time).toBe("12:30 Pm");

    //expect(task).toContain(obn);
    //expect(document.body.innerHTML).toBe(html);
  });
});
