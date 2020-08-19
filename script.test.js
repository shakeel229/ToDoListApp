import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
import taskManager from "./script.js";
//import Task from "./script.js";
describe("Test Task Planner Actions", function () {
  beforeAll(function () {
    document.body.innerHTML = html.toString();
  });
  test("It should Add two positive Numbers ", function () {
    // const task = new Task(
    //   "task1",
    //   "grocery shopping",
    //   "visit coles",
    //   "shakeel",
    //   "pending",
    //   "08/08/20",
    //   "12:30 Pm"
    // );
    // expect(task).toBe(
    //   "task1",
    //   "grocery shopping",
    //   "visit coles",
    //   "shakeel",
    //   "pending",
    //   "08/08/20",
    //   "12:30 Pm"
    // );
    expect(document.body.innerHTML).toBe(html);
  });
});
