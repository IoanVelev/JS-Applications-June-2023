import { detailsPage } from "./details.js";
import { showView, spinner } from "./util.js";

const section = document.querySelector('#home-page');
const catalog = section.querySelector('#movie .card-deck.d-flex.justify-content-center');
catalog.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.tagName == 'BUTTON') {
        const id = event.target.dataset.id;
        detailsPage(id);
    }
})
export function homePage() {
    showView(section);
    displayMovies();
}

async function displayMovies() {
    catalog.replaceChildren(spinner())
    const movies = await getMovies();
    catalog.replaceChildren(...movies.map(movieCard));
}

function movieCard(movie) {
    const liEl = document.createElement('li');
    liEl.className = 'card-mb-4';
    liEl.innerHTML = `
    <img class ="card-img-top" src = "${movie.img}" alt = "Card image cap" width = "400">
    <div class = "card-body">
    <h4 class = "card-title">${movie.title}</h4>
    <a href = "/details/${movie._id}">
    <button data-id = "${movie._id}" type="button" class = "btn btn-info">Details</button>
    </a>
    </div>
    <div class = "card-footer">
    </div>
    `;
    return liEl;
}
async function getMovies() {
    const res = await fetch('http://localhost:3030/data/movies');
    const data = await res.json();
    return data
}

window.getMovies = getMovies;