const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; // 초반에 투두를 비어있는 행렬로 작성

function deletToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); // li의 id가 string이라 숫자로 바꿔준다.
  });
  toDos = cleanToDos;
  saveToDos(); // 이 함수는 toDos를 저장한다.따라서 위에서 투두스를 클린 투두로 고치고 그걸 다시 저장하는 것이다.
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li"); // html에 있는 것을 가져다 쓰는 것이 아닌, 직접 리스트를 생성함
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deletToDo);
  const span = document.createElement("span");
  const newId = toDos.length + 1; // 배열의 길이 즉 저장된 자료의 수를 알 수 있다
  span.innerText = text; // 이 text는 paintToDo 괄호의 text임
  li.appendChild(span); // 무언가를 father element 안에 넣는 것임
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text, // text라는 key에 text가 value로 옴
    id: newId,
  };
  toDos.push(toDoObj); // push를 써서 array 안에 element 하나를 넣어줄 수 있음
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
