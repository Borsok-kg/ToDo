'use strict'

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [];



let jsonStringify = function() {
    let jsonRecord = JSON.stringify(todoData);
    localStorage.toDo = jsonRecord;
};

let jsonParse = function() {
    let jsonParse = localStorage.toDo;
    todoData = JSON.parse(jsonParse);
    return todoData;
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
            jsonStringify();
        });
        // Удаляем элемент
        const btnRemove = li.querySelector('.todo-remove');
        btnRemove.addEventListener('click', function() {
            todoData.splice(i, 1);
            jsonStringify();
            jsonParse();
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
        jsonStringify();
        render();
    }
});

jsonParse();
render();