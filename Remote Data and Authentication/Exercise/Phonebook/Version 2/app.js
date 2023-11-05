function attachEvents() {
  const url = `http://localhost:3030/jsonstore/phonebook`;
  const ulElement = document.getElementById("phonebook");
  const person = document.getElementById("person");
  const phone = document.getElementById("phone");

  document.getElementById("btnLoad").addEventListener("click", responseEntries);
  document.getElementById("btnCreate").addEventListener("click", postEntries);

  function responseEntries() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => loadEntries(data));
  }

  function loadEntries(data) {
    ulElement.innerHTML = "";
    Object.values(data).forEach((x) => {
      const liElement = document.createElement("li");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      liElement.textContent = `${x.person}: ${x.phone}`;
      liElement.id = x._id;
      liElement.appendChild(deleteBtn);
      ulElement.appendChild(liElement);
      deleteBtn.addEventListener('click', deleteEntry);
    });
  }

  function postEntries() {
    if (person.value == '' && phone.value == '') {
      return;
    }
    const data = {
      person: person.value,
      phone: phone.value,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(data),
    });

    person.value = "";
    phone.value = "";
    document.getElementById("btnLoad").click();
  }

  function deleteEntry(e) {
    const key = e.target.parentNode.id
    const url = `http://localhost:3030/jsonstore/phonebook/${key}`;
    e.target.parentNode.remove();
    fetch(url, {
      method: 'DELETE'
    })
  }
}
attachEvents();
