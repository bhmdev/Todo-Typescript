import "@clr/core/input/register.js";
import "@clr/core/button/register.js";
import "@clr/core/modal/register.js";

const todoList = document.querySelector("section");
const modal = document.querySelector("cds-modal");
const saveTodoBtn = document.querySelector<any>("cds-modal cds-button");
const createTodoBtn = document.querySelector<HTMLButtonElement>("cds-button");
const todoInput = document.querySelector<HTMLInputElement>("cds-modal input");

let idCount = 0;
let todos = [{ value: "Learn about Clarity", id: idCount++ }];
renderTodoList();

createTodoBtn.addEventListener("click", () => openModal());

modal.addEventListener("closeChange", () => closeModal());

saveTodoBtn.addEventListener("click", () => saveTodo());

todoList.addEventListener("click", event => updateTodo(event));

function updateTodo(event) {
  if (event.target.tagName === "CDS-INLINE-BUTTON") {
    const button = event.target;
    if (button.name === "delete") {
      todos = todos.filter(t => t.id !== button.value);
      renderTodoList();
    }

    if (button.name === "edit") {
      const todo = todos.find(todo => todo.id === button.value);
      todoInput.value = todo.value;
      saveTodoBtn.value = todo.id;
      openModal();
    }
  }
}

function saveTodo() {
  const todoIndex = todos.findIndex(todo => todo.id === saveTodoBtn.value);
  if (todoIndex === -1) {
    todos.push({ value: todoInput.value, id: idCount++ });
  } else {
    todos[todoIndex].value = todoInput.value;
  }
  renderTodoList();
  closeModal();
}

function openModal() {
  modal.removeAttribute("hidden");
}

function closeModal() {
  todoInput.value = "";
  saveTodoBtn.value = "";
  modal.setAttribute("hidden", "");
}

function renderTodoList() {
  todoList.innerHTML = "";
  todos
    .map(todo => {
      const item = document
        .querySelector<any>("template")
        .content.cloneNode(true);
      item.querySelector("span").innerText = todo.value;
      item.querySelectorAll("cds-inline-button")[0].value = todo.id;
      item.querySelectorAll("cds-inline-button")[1].value = todo.id;
      return item;
    })
    .forEach(item => todoList.appendChild(item));
}