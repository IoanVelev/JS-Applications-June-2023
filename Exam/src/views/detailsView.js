import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as carsService from '../services/carsService.js';


const detailsTemplate = (car, isOwner) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${car.imageUrl}" alt="example1" />
            <p id="details-title">${car.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="price">Price: ${car.price}</p>
                <p class="weight">Weight: ${car.weight} kg</p>
                <p class="top-speed">Top Speed: ${car.speed} kph</p>
                <p id="car-description">
                 ${car.about}</p>
              </div>
              <!--Edit and Delete are only for creator-->
              ${isOwner ?
                
                html`<div id="action-buttons">
                <a href="/cars/${car._id}/edit" id="edit-btn">Edit</a>
                <a href="/cars/${car._id}/delete" id="delete-btn">Delete</a>
              </div>` : nothing}
              
            </div>
          </div>
        </section>
`;


export const detailsView = (ctx) => {
    carsService.getOne(ctx.params.carId)
    .then(car => {
      if (ctx.user) {
        let isOwner = ctx.user._id == car._ownerId;
        ctx.render(detailsTemplate(car, isOwner))
      } else {
        ctx.render(detailsTemplate(car, false))
      }
        

        
    })
}