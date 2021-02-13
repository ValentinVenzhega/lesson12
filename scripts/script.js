'use strict';

const headerInput = document.querySelector('.header-input'),
   headerButton = document.querySelector('.header-button'),
   todoControl = document.querySelector('.todo-control'),
   todoList = document.querySelector('.todo-list'),
   todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function() {
   todoList.textContent = '';
   todoCompleted.textContent = '';
   todoData.forEach(function(item, i) {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.innerHTML = `
         <span class="text-todo">${item.value}</span>
         <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
         </div>
      `;
      headerInput.value = '';

      if (item.completed) {
         todoCompleted.append(li);
      } else {
         todoList.append(li);
      }

      const btnTodoComplete = li.querySelector('.todo-complete'); // делаем важным
      btnTodoComplete.addEventListener('click', function() {
         item.completed = !item.completed;
         render();
         localStorage.setItem('todo', JSON.stringify(todoData));
      });

      const btnRemove = li.querySelector('.todo-remove'); // удаляем
      btnRemove.addEventListener('click', function() {
         todoData.splice(i, 1);
         li.remove();
         render();
         localStorage.setItem('todo', JSON.stringify(todoData));
         
      });

      headerButton.disabled = true;
      headerInput.addEventListener('input', function() {
         if (headerInput.value !== '') {
            headerButton.disabled = false;
         } else {
            headerButton.disabled = true;
         }
      });
   });
};

if(localStorage.getItem('todo')) {
   todoData = JSON.parse(localStorage.getItem('todo'));
   render();
}

todoControl.addEventListener('submit', function(event) {
   event.preventDefault();
   const newTodo = {
      value: headerInput.value,
      completed: false  
   };
   todoData.push(newTodo);
   
   render();

   localStorage.setItem('todo', JSON.stringify(todoData));
});



render();