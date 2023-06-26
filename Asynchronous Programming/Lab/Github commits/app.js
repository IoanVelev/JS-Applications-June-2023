async function loadCommits() {
  let userName = document.getElementById("username");
  let repo = document.getElementById("repo");
  let ulElement = document.getElementById("commits");
  try {
    const res = await fetch(`https://api.github.com/repos/${userName.value}/${repo.value}/commits`);
    if (res.ok == false) {
      throw new Error(`${res.status}${res.statusText}`);
    }
    const data = await res.json();
    ulElement.innerHTML = ''
    data.forEach((element) => {
      let liElement = document.createElement("li");
      liElement.textContent = `${element.commit.author.name}: ${element.commit.message}`;
      ulElement.appendChild(liElement);
    });
  } catch (error) {
    let liItem = document.createElement("li");
    liItem.textContent = `Erorr: ${error.message} (Not Found)`;
    ulElement.appendChild(liItem);
  }
}
