import { html } from "../../node_modules/lit-html/lit-html.js";

import * as userService from '../services/userService.js';


export const logoutView = (ctx) => {
userService.logout()
.then(() => {
    ctx.page.redirect('/');
})
}