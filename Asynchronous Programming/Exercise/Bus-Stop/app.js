async function getInfo() {
    const stopId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const busesList = document.getElementById('buses');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`
    try {
        busesList.replaceChildren();
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error()
        }
        const data = await response.json();
        stopName.textContent = data.name;
        Object.entries(data.buses).forEach(element => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${element[0]} arrives in ${element[1]} minutes`;
            busesList.appendChild(liElement)
        });
    } catch (error) {
        stopName.textContent = 'Error';
    }
}