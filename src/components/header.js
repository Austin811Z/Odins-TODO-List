export default function header() {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");

  h1.textContent = "Task Manager";
  p.textContent = "Manage tasks by projects or dates";

  header.append(h1, p);

  return header;
}