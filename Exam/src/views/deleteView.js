import * as carsService from '../services/carsService.js';


export const deleteView = async (ctx) => {

    try {
        const car = await carsService.getOne(ctx.params.carId);

        let confirmed = confirm(`Are you sure you want to remove this car?`);
        
        if (confirmed) {
            await carsService.remove(ctx.params.carId);
            
            ctx.page.redirect('/catalog');
        }
    } catch (err) {
        alert(err);
    }



}