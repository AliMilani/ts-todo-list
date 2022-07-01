import { v4 as uuidV4 } from "uuid";
const list = document.querySelector<HTMLUListElement>("#list");
const form =
  (document.getElementById("new-task-form") as HTMLFormElement) || null;
const input =
  (document.querySelector("#new-task-title") as HTMLInputElement) || null;

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
};

let tasks: Task[] = loadTasks();
tasks.forEach((task) => {
  createTask(task);
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  let newTask: Task = {
    id: uuidV4(),
    title: input.value,
    isCompleted: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  createTask(newTask);
  saveTasks(tasks);
  input.value = "";
});

function createTask(task: Task): void {
  let item = document.createElement("li");
  let label = document.createElement("label");
  let checkbox = document.createElement("input");
  checkbox.checked = task.isCompleted;
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", (e) => {
    task.isCompleted = checkbox.checked;
    saveTasks(tasks);
  });
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks(tasks: Task[]): void {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  let tasksJson = localStorage.getItem("TASKS");
  if (tasksJson === null) return [];
  return JSON.parse(tasksJson);
}
