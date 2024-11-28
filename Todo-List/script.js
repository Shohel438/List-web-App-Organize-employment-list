const todoData = JSON.parse(localStorage.getItem('todo')) || [];

let editInfo = null;

// user Todo Input to add user function

function userTodoInput() {
  const inputElement = document.querySelector('.js-todo-input');
  const { value } = inputElement;

  if (editInfo != null) {
    todoData.splice(editInfo, 1, {
      name: value
    });

    editInfo = null;
  } else {
    todoData.push({
      name: value
    });
  }

  inputElement.value = '';
}

// Display the todo names on the page
function dataDisplay() {
  let htmlShow = '';

  todoData.forEach((item, i) => {
    const html = `
      <tr>
        <th class="" scope="row">${i + 1}</th>
        <td>
        <span class="js-${item.id}-name">${item.name}</span>
        </td>
        <td>
          <i class="btn text-white fa fa-edit btn-info mx-2 js-edit-button" data-user-id="${item.id}"></i>
          <i class="btn btn-danger text-white fa fa-trash js-delete-button"></i>
        </td>
      </tr>
    `;

    htmlShow += html;
  });

  localStorage.setItem('todo', JSON.stringify(todoData));

  document.querySelector('.js-todo-container')
    .innerHTML = htmlShow;

  document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
      todoData.splice(index, 1);
      dataDisplay();
    });
  });

  document.querySelectorAll('.js-edit-button')
    .forEach((editButton, i) => {
      editButton.addEventListener('click', () => {
        const inputElement = document.querySelector('.js-todo-input');
        inputElement.value = todoData[i].name;
        editInfo = i;
        document.querySelector('.js-add-user-button')
          .innerText = 'Save Changes';
      });
    });
}

document.querySelector('.js-todo-input')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      userTodoInput();
      dataDisplay();
      document.querySelector('.js-add-user-button')
        .innerText = 'Add User';
    }
  });

document.querySelector('.js-add-user-button').addEventListener('click', () => {
  document.querySelector('.js-add-user-button')
    .innerText = 'Add User';
  userTodoInput();
  dataDisplay();
});

dataDisplay();