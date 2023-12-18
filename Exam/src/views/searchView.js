import { html } from "../../node_modules/lit-html/lit-html.js";
import * as carsService from '../services/carsService.js';
import { singleCarTemplate } from "./templates/carTemplate.js";

const searchTemplate = (submitHandler, cars) => html`
<section id="search">
          <div class="form">
            <h4>Search</h4>
            <form class="search-form" @submit=${submitHandler}>
              <input type="text" name="search" id="search-input" />
              <button class="button-list">Search</button>
            </form>
          </div>
          <div class="search-result">
            
            ${cars.length > 0  ?  cars.map(x => singleCarTemplate(x)) : html`<h2 class="no-avaliable">No result.</h2>`}
          </div>
        </section>
`;

export const searchView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();
        let searchElement = document.querySelector('#search-input');
        carsService.search(searchElement.value)
        .then(cars => {
            ctx.render(searchTemplate(submitHandler, cars));
        })
    }


    ctx.render(searchTemplate(submitHandler, []));
}