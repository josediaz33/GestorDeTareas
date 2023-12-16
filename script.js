document.addEventListener('DOMContentLoaded', function () {
  const addListButton = document.getElementById('add-list');
  const listForm = document.getElementById('list-form');
  const newListButton = document.getElementById('add-list-btn');
  const listsContainer = document.getElementById('lists-container');

  addListButton.addEventListener('click', function () {
    listForm.classList.toggle('hidden');
    listForm.style.display = 'block';
    document.getElementById('list-title').focus();
  });

  newListButton.addEventListener('click', function () {
    const titleInput = document.getElementById('list-title');
    const title = titleInput.value.trim();

    if (title !== '') {
      const newList = createList(title);
      listsContainer.appendChild(newList);
      titleInput.value = '';
      listForm.classList.add('hidden');
    }
  });

  function createList(title) {
    const list = document.createElement('div');
    list.className = 'list';

    const listTitle = document.createElement('div');
    listTitle.className = 'list-title';
    listTitle.textContent = title;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'list-buttons'; // Contenedor para los botones

    const addCardButton = document.createElement('button');
    addCardButton.className = 'add-card';
    addCardButton.textContent = '+ Agregar tarjeta';
    addCardButton.addEventListener('click', function () {
      const cardTitle = prompt('Ingrese el título de la tarjeta:');
      if (cardTitle !== null) {
        const card = createCard(cardTitle);
        cardsContainer.appendChild(card);
      }
    });

    const deleteListButton = document.createElement('button');
    deleteListButton.className = 'delete-list-btn';
    deleteListButton.textContent = 'Eliminar Lista';
    deleteListButton.addEventListener('click', function () {
      const confirmDelete = confirm('¿Estás seguro de eliminar esta lista y todas sus tarjetas?');
      if (confirmDelete) {
        const listsContainer = list.parentElement;
        listsContainer.removeChild(list);
      }
    });

    buttonsContainer.appendChild(addCardButton);
    buttonsContainer.appendChild(deleteListButton);

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    list.appendChild(listTitle);
    list.appendChild(cardsContainer);
    list.appendChild(buttonsContainer); // Agrega el contenedor de botones
    enableDragAndDrop(list);

    return list;
  }

  function createCard(title) {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.textContent = title;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-card-btn';
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', function () {
      const confirmDelete = confirm('¿Estás seguro de eliminar esta tarjeta?');
      if (confirmDelete) {
        const cardContainer = card.parentElement;
        cardContainer.removeChild(card);
      }
    });

    card.appendChild(deleteButton);

    card.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text/plain', card.textContent);
    });

    return card;
  }

  function enableDragAndDrop(element) {
    element.addEventListener('dragover', function (e) {
      e.preventDefault();
    });

    element.addEventListener('drop', function (e) {
      e.preventDefault();

      const cardTitle = e.dataTransfer.getData('text/plain');
      const draggedCard = findDraggedCard(cardTitle);

      // Mueve la tarjeta arrastrada a la lista
      if (draggedCard) {
        element.querySelector('.cards-container').appendChild(draggedCard);

        // Limpia la tarjeta que se arrastro de la lista original
        const originalList = document.querySelector('.dragged');
        if (originalList) {
          originalList.classList.remove('dragged');
        }
      }
    });

    // Eventos para el arrastrado
    element.addEventListener('dragstart', function () {
      element.classList.add('dragged');
    });

    element.addEventListener('dragend', function () {
      element.classList.remove('dragged');
    });
  }

  function findDraggedCard(cardTitle) {
    const lists = document.querySelectorAll('.list');
    for (const list of lists) {
      const cards = list.querySelectorAll('.card');
      for (const card of cards) {
        if (card.textContent.trim() === cardTitle) {
          return card;
        }
      }
    }
    return null;
  }
});
