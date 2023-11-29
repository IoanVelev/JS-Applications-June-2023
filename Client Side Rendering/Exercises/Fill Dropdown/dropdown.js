import { html, render } from "../node_modules/lit-html/lit-html.js";
const url = ` http://localhost:3030/jsonstore/advanced/dropdown`;
const main = document.querySelector("div");

async function loadData() {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

const selectTemplate = (data) => html`
  <select id="menu">
${data.map(el => html`<option value = ${el._id}>${el.text}</option>`)}
  </select>
`;

const options = Object.values(await loadData());
update(options);

function update(options) {
  const result = selectTemplate(options);
  render(result, main);
}

const form = document.querySelector('form');
form.addEventListener('submit', addItem);

async function addItem(e) {
    e.preventDefault();
    const text = document.getElementById('itemText').value;

    if (text != '') {
       
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text})
        })

        options.push(await res.json());
        update(options);
        form.reset();
    }
    
}
