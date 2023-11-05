function attachEvents() {
    const url = `http://localhost:3030/jsonstore/phonebook`;
    const ulElement = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    loadBtn.addEventListener('click', onClickLoad);
    createBtn.addEventListener('click', onClickCreate);

    async function onClickLoad() {
        ulElement.innerHTML = '';
        const res = await fetch(url);
        const data = await res.json();
        const dataArr = Object.values(data)
        dataArr.forEach(element => {
            const liElement = document.createElement('li');
            const deleteBtn = document.createElement('button');
            deleteBtn.setAttribute('id', 'btnDelete');
            deleteBtn.textContent = 'Delete';
            liElement.textContent = `${element.person}: ${element.phone}`;
            liElement.setAttribute('id', element._id);
            liElement.appendChild(deleteBtn);
            ulElement.appendChild(liElement);

            deleteBtn.addEventListener('click', onClickDelete);
        });
    }
    async function onClickCreate() {
        if (person.value !== '' && phone.value !== '') {

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ person: person.value, phone: phone.value })
            });

            person.value = '';
            phone.value = '';
            loadBtn.click()
        }
    }

    async function onClickDelete(ev) {
        const removedElement = ev.target.parentNode;
        const id = ev.target.parentNode.id
        ulElement.removeChild(removedElement);
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
    }
}
attachEvents()