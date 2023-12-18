import { html } from "../../node_modules/lit-html/lit-html.js";
import * as carsService from '../services/carsService.js';
import { fieldIsInvalid } from "../utils/validators.js";

const editTemplate = (car, submitHandler) => html`
<section id="edit">
          <div class="form form-auto">
            <h2>Edit Your Car</h2>
            <form class="edit-form" @submit=${submitHandler}>
              <input type="text" name="model" id="model" value = ${car.model} placeholder="Model" />
              <input
                type="text"
                name="imageUrl"
                value = ${car.imageUrl}
                id="car-image"
                placeholder="Your Car Image URL"
              />
              <input
                type="text"
                name="price"
                value = ${car.price}
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="number"
                name="weight"
                value = ${car.weight}
                id="weight"
                placeholder="Weight in Kg"
              />
              <input
                type="text"
                name="speed"
                value = ${car.speed}
                id="speed"
                placeholder="Top Speed in Kmh"
              />
              <textarea
                id="about"
                name="about"
                .value = ${car.about}
                placeholder="More About The Car"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;


export const editView = (ctx) => {
    

const submitHandler = (e) => {
    e.preventDefault();
    const carData = Object.fromEntries(new FormData(e.currentTarget));

    if (fieldIsInvalid(carData)) {
    return;
    }

    carsService.edit(ctx.params.carId, carData)
    .then(() => {
        ctx.page.redirect(`/cars/${ctx.params.carId}`)
    })
    
}


carsService.getOne(ctx.params.carId)
    .then(car => {
        ctx.render(editTemplate(car, submitHandler))
    })
}