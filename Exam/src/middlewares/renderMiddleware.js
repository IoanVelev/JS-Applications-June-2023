import { render } from "../../node_modules/lit-html/lit-html.js";
import { navigationView } from "../views/navigationView.js";

const header = document.querySelector('.header-nav');
const main = document.querySelector('#main-element');

const renderContent = (templateResult) => {
    render(templateResult, main)
}

export const renderNavigationMiddleware = (ctx, next) => {
render(navigationView(ctx), header);

    next();
}

export const renderContentMiddleware = (ctx, next) => {
ctx.render = renderContent;

next();
}