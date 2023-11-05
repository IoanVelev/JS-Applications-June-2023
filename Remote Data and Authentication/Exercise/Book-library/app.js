function attachEvents() {
  const baseUrl = `http://localhost:3030/jsonstore/collections/books`;
  const tbody = document.querySelector("tbody");
  const loadBtn = document.getElementById("loadBooks");
  loadBtn.addEventListener("click", loadBooks);
  const form = document.querySelector("form");
  form.addEventListener("submit", createBook);

  function displayBooks(data) {
    tbody.innerHTML = "";

    Object.values(data).forEach((book) => {
        console.log(book);
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
      return;
    }

    const trElement = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdAuthor = document.createElement("td");
    const tdButtons = document.createElement("td");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    editBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";
    tdButtons.appendChild(editBtn);
    tdButtons.appendChild(deleteBtn);
    tdTitle.textContent = title;
    tdAuthor.textContent = author;

    trElement.appendChild(tdTitle);
    trElement.appendChild(tdAuthor);
    trElement.appendChild(tdButtons);
    tbody.appendChild(trElement);

    const info = {
      author,
      title,
    };
    form.reset();
    postBooks("POST", info);
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

  function loadBooks(){
    fetch(baseUrl)
    .then(res => res.json())
    .then(data => displayBooks(data));
  }

  function editBooks(e) {
    console.log(e.target);
  }
  function deleteBooks(e) {
    console.log(e.target);
  }
}
attachEvents();
