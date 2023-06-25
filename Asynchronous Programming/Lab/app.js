function loadRepos() {
   let url = 'https://api.github.com/users/testnakov/repos';
   let httpRequest = new XMLHttpRequest();
   let res = document.getElementById('res');
   httpRequest.addEventListener('readystatechange', () => {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
         res.textContent = httpRequest.responseText;
      }
   })
   httpRequest.open('GET', url);
   httpRequest.send();
}