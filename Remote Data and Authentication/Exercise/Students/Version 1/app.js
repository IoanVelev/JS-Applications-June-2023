async function solve() {
    const url = `http://localhost:3030/jsonstore/collections/students`;
    const sumbitBtn = document.getElementById('submit');

    const tbody= document.querySelector('#results > tbody')
    const firstNameInput = document.getElementsByName('firstName')[0];
    const lastNameInput = document.getElementsByName('lastName')[0];
    const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
    const gradeInput = document.getElementsByName('grade')[0];

    const res = await fetch(url);
    const data = await res.json();
    Object.values(data).forEach(el => {
        const tr = document.createElement('tr');
        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = el.firstName;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = el.lastName;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = el.facultyNumber;

        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = el.grade;
        tbody.appendChild(tr);
    });
    sumbitBtn.addEventListener('click', onSumbit);

    async function onSumbit(ev) {
        ev.preventDefault();
        if (firstNameInput.value == '' || lastNameInput.value == '' || isNaN(facultyNumberInput.value) || isNaN(gradeInput.value)) {
            return alert('Wront input data!')
        }

        const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    facultyNumber: facultyNumberInput.value,
                    grade: gradeInput.value
                 })
        });

        const tr = document.createElement('tr');
        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstNameInput.value;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastNameInput.value;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = facultyNumberInput.value;

        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = gradeInput.value;
        tbody.appendChild(tr);

        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';
    }
}
solve()