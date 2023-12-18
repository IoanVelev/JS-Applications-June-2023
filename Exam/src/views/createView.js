import { html } from "../../node_modules/lit-html/lit-html.js";
import * as carsService from '../services/carsService.js';
import { fieldIsInvalid } from "../utils/validators.js";


const createTemplate = (submitHandler) => html`
<section id="create">
          <div class="form form-auto">
            <h2>Share Your Car</h2>
            <form class="create-form" @submit=${submitHandler}>
              <input type="text" name="model" id="model" placeholder="Model"/>
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                placeholder="Your Car Image URL"
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight in Kg"
              />
              <input
                type="text"
                name="speed"
                id="speed"
                placeholder="Top Speed in Kmh"
              />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`;




export const createView = (ctx) => {

    const submitHandler = (e) => {
        e.preventDefault();

        const carData = Object.fromEntries(new FormData(e.currentTarget));

        if (fieldIsInvalid(carData)) {
            return;
        }

        carsService.create(carData)
        .then(() => {
            ctx.page.redirect('/catalog')
        })
    }
    ctx.render(createTemplate(submitHandler));
}