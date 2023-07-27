import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";
console.log(document.querySelector('#allCats'));
const section = document.querySelector('#allCats');
section.addEventListener('click', toggle);
const cardTemplate = (data) => html`
<ul>
${data.map(cat => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn">Show status code</button>
                    <div class="status" style="display: none" id="${cat.id}">
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
    </li>
`)} 
</ul>
`
update();

function update() {
    const result = cardTemplate(cats);
    render(result, section);
    console.log(cats);
}

function toggle(ev) {
    const button = ev.target.parentNode.querySelector('.showBtn');
    const clickedElement = ev.target.parentNode.querySelector('.status')
    if (button.textContent == 'Show status code') {
        clickedElement.style.display = 'block';
        button.textContent = 'Hide status code';
    } else {
        clickedElement.style.display = 'none';
        button.textContent = 'Show status code';
    }
    console.log(button.textContent);
}

