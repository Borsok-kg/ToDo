'use strict'

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [];



let jsonSave = function() {
    let a = JSON.stringify(todoData);
    localStorage.toDo = a;
};

let jsonDisplay = function() {
    if (todoData === []) {
        let b = localStorage.toDo;
        console.log(b);
        todoData = JSON.parse(b);
    }
};

const render = function() {
    // Очищаем элементы
    todoList.textContent = '';
    todoCompleted.textContent = '';
    // Перебираем и добавляем элементы
    todoData.forEach(function(item, i) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';
        // Проверка элемента на - выполнил или нет
        if (item.complete) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        // Перекидываем элемент в выполненые
        const btnComplete = li.querySelector('.todo-complete');
        btnComplete.addEventListener('click', function() {
            item.complete = !item.complete;
            render();
            jsonSave();
        });
        // Удаляем элемент
        const btnRemove = li.querySelector('.todo-remove');
        btnRemove.addEventListener('click', function() {
            todoData.splice(i, 1);
            jsonSave();
            jsonDisplay();
            render();
        });
    });
    // Очищаем инпут
    headerInput.value = '';
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();
    if (headerInput.value.trim() === '') {
    } else {
        const newTodo = {
            value: headerInput.value,
            complete: false
        };
        todoData.push(newTodo);
        jsonSave();
        render();
    }
});

jsonDisplay();

render();