import { html, render } from "../node_modules/lit-html/lit-html.js";

const loadBtn = document.querySelector('#btnLoadTowns');
loadBtn.addEventListener('click', getTowns);


const listTemplate = (data) => html`
<ul>
${data.map(town => html`<li>${town}</li>`)}
</ul>
`

function getTowns(ev) {
    ev.preventDefault();
    if (document.querySelector('#towns').value !== '') {
        const rootElement = document.querySelector('#root');
        const towns = document.querySelector('#towns').value.split(', ');
        
        const result = listTemplate(towns);

        render(result, rootElement);
        document.querySelector('#towns').value = '';
    }
}