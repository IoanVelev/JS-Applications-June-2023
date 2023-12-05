import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";

const guestLinks = html`
<li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/register">Register</a>
              </li>
`;

const userLinks = html`
     <li class="nav-item">
        <a class="nav-link" href="/collection">My collection</a>
      </li>
    <li class="nav-item">
         <a class="nav-link" href="/logout">Logout</a>
    </li>`;


const welcomeMsg = (user) => html`
<div class="nav-item">
          <span class="nav-link disabled">Hello, ${user.username}</span>
        </div>
`;

const searchHandler = (e) => {
e.preventDefault();

let formData = new FormData(e.currentTarget);

let search = formData.get('search');
page.redirect(`/movies?search=${search}`)
}

export const navigationTemplate = ({user, isAuthenticated}) => html`
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Movies</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          ${isAuthenticated ? userLinks : guestLinks}
        </ul>
        ${isAuthenticated ? welcomeMsg(user) : nothing}
        <form class="d-flex" @submit = ${searchHandler}>
          <input class="form-control me-2" type="search" name = "search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
      </nav>`;
