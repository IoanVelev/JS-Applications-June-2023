import { html } from "../../node_modules/lit-html/lit-html.js";



const guestView = html`
<div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
`;

const userView = html`
<div class="user">
            <a href="/create">Add Your Car</a>
            <a href="/logout">Logout</a>
          </div>
`;

const navigationTemplate = (isLogged) => html`
<a id="logo" href="/"><img id="logo-car" src="./images/car-logo.png" alt="img"/></a>
        <nav>
          <div>
            <a href="/catalog">Our Cars</a>
            <a href="/cars/search">Search</a>
          </div>
          ${isLogged ? userView : guestView}
        </nav>
`;

export const navigationView = (ctx) => {
return navigationTemplate(ctx.user);
}