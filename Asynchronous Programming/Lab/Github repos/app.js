function loadRepos() {
  let userName = document.getElementById("username").value;
  let ulElement = document.querySelector("#repos");
  let child = ulElement.querySelector("li");
  ulElement.removeChild(child);
  let url = `https://api.github.com/users/${userName}/repos`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        let liElement = document.createElement("li");
        let aElement = document.createElement("a");
        console.log(element);
        aElement.setAttribute("href", element.html_url);
        aElement.textContent = element.full_name;
        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
      });
    });
}
