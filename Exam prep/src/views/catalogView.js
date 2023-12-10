import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as albumService from "../services/albumService.js";
import { albumTemplate } from "./templates/albumTemplate.js";


const catalogTemplate = (user, albums) => html`
  <section id="catalogPage">
    <h1>All Albums</h1>

    ${albums.length == 0
      ? html`<p>No Albums in Catalog!</p>`
      : albums.map((x) => albumTemplate(x, Boolean(user)))}
  </section>
`;

export const catalogView = (ctx) => {
  albumService.getAll().then((albums) => {
    ctx.render(catalogTemplate(ctx.user, albums));
  });
};
