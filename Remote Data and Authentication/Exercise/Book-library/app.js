function attachEvents() {
  const baseUrl = `http://localhost:3030/jsonstore/collections/books/`;
  const tbody = document.querySelector("tbody");
  const loadBtn = document.getElementById("loadBooks");
  const editBtns = document.querySelectorAll('td button');

  const form = document.querySelector("form");
  form.addEventListener("submit", createBook);
  loadBtn.addEventListener("click", loadBooks);

  function loadBooks(){
    fetch(baseUrl)
    .then(res => res.json())
    .then(data => displayBooks(data));
  
  }

  function postBooks(method, info) {
    fetch(baseUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
}

  function displayBooks(data) {
    tbody.innerHTML = "";

    Object.values(data).forEach((book) => {
      const trElement = document.createElement("tr");
      const tdTitle = document.createElement("td");
      const tdAuthor = document.createElement("td");
      const tdButtons = document.createElement("td");
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");

      editBtn.textContent = "Edit";
      deleteBtn.textContent = "Delete";
      editBtn.addEventListener("click", editBooks);
      deleteBtn.addEventListener("click", deleteBooks);
      tdButtons.appendChild(editBtn);
      tdButtons.appendChild(deleteBtn);
      tdTitle.textContent = book.title;
      tdAuthor.textContent = book.author;

      trElement.id = book._id;
      trElement.appendChild(tdTitle);
      trElement.appendChild(tdAuthor);
      trElement.appendChild(tdButtons);
      tbody.appendChild(trElement);
      
      
    });
  }

  function createBook(ev) {
    ev.preventDefault();
    const data = new FormData(ev.target);

    let title = data.get("title");
    let author = data.get("author");

    if (author == "" && title == "") {
      return alert('Invalid input, please try again.');
    }


    const info = {
      author,
      title,
    };

    form.reset();
    postBooks("POST", info);
    loadBtn.click();
  }

  

  function editBooks(e) {
    const id = e.target.parentNode.parentNode.id;
    const title = e.target.parentNode.parentNode.firstChild.textContent;
    const author = e.target.parentNode.parentNode.children[1].textContent;
    
    document.getElementsByName('title')[0].value = title;
    document.getElementsByName('author')[0].value = author;
    document.querySelector('h3').textContent = 'Edit form';

    const info = {
      title,
      author
    }

    fetch(baseUrl + id , {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
  }
  
  function deleteBooks(e) {

    const id = e.target.parentNode.parentNode.id;
    document.getElementsByName('title')[0].value = '';
    document.getElementsByName('author')[0].value = '';

    fetch(baseUrl + id, {
      method: 'DELETE'
    });
    
    e.target.parentNode.parentNode.remove();
  }
}
attachEvents();
