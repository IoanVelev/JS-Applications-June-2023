function solve() {
  const url = `http://localhost:3030/jsonstore/collections/students`;
  const formElement = document.querySelector("#form");
  const tbody = document.querySelector("tbody");
  formElement.addEventListener("submit", getFormData);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (const key in data) {
        const trElement = document.createElement("tr");
        for (const x in data[key]) {
          if (x == "_id") {
            continue;
          }

          const tdElement = document.createElement("td");
          tdElement.textContent = data[key][x];
          trElement.appendChild(tdElement);
        }
        tbody.appendChild(trElement);
      }
    });

  function getFormData(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const facultyNumber = form.get("facultyNumber");
    const grade = form.get("grade");

    if (
      (firstName !== '' && lastName !== '') ||
      (!isNaN(facultyNumber) && !isNaN(grade))
    ) {
      const info = {
        firstName,
        lastName,
        facultyNumber,
        grade,
      };
      postData(info);
      formElement.reset();
    } else {
      return alert("Please enter valid info");
    }
  }

  function postData(info) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const trElement = document.createElement("tr");
    for (const key in info) {
      const tdElement = document.createElement("td");
      tdElement.textContent = info[key];
      trElement.appendChild(tdElement);
    }
    tbody.appendChild(trElement);
  }
}
solve();
