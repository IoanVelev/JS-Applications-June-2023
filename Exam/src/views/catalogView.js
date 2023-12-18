import { html } from "../../node_modules/lit-html/lit-html.js";
import * as carsService from '../services/carsService.js';
import { singleCarTemplate } from "./templates/carTemplate.js";

const catalogTemplate = (cars) => html`
<h3 class="heading">Our Cars</h3>
        <section id="dashboard">
          ${cars.length > 0 ?
        cars.map(x => singleCarTemplate(x)) :
        html`
        <h3 class="nothing">Nothing to see yet</h3>
        `
        }
        </section>
`;

export const catalogView = (ctx) => {
    carsService.getAll()
    .then(cars => {
        ctx.render(catalogTemplate(cars));
    })

    
}