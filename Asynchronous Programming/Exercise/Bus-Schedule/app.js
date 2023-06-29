function solve() {
    let infoBox = document.querySelector('#info > span');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');
    let stop = {
        next: 'depot'
    }
    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const response = await fetch(url);
        if (response.status !== 200) {
            infoBox.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
        stop = await response.json();
        infoBox.textContent = `Next stop ${stop.name}`;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        infoBox.textContent = `Arriving at ${stop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();