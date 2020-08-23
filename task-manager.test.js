import path from "path";
import { TaskManager } from "./task-manager";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
describe("Test Cases of Task Manager Class", function () {
  beforeAll(function () {
    document.body.innerHTML = html.toString();
  });
  test("Adding New Task to Array of tasks", function () {
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

  test("html to string () ", () => {
    const task = new Task(
      "task1",
      "grocery shopping",
      "visit coles",
      "shakeel",
      "pending",
      "08/08/20",
      "12:30 Pm"
    );

    const htmlToString = task.htmlTemplate();
    expect(htmlToString).toContain("task1");
    expect(htmlToString).toContain("shakeel");
    expect(htmlToString).toContain("08/08/20");
    expect(htmlToString).toContain("visit coles");
    expect(htmlToString).toContain("grocery shopping");
    expect(htmlToString).toContain("pending");
    expect(htmlToString).toContain("12:30 Pm");
  });
});
