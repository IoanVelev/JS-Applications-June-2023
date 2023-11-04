const url = `http://localhost:3030/jsonstore/messenger`;
const textArea = document.getElementById('messages');

function attachEvents() {
    document.getElementById('refresh').addEventListener('click', loadMessages)
    document.getElementById('submit').addEventListener('click', onSubmit);
}
function loadMessages() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        textArea.value = Object.values(data).map(({ author, content }) => `${author}: ${content}`).join('\n');
    });
}

function onSubmit() {
    let author = document.getElementsByName('author')[0].value;
    let content = document.getElementsByName('content')[0].value;
    
    if (author !== '' && content !== '') {
        const info = { author, content };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });

        document.getElementsByName('author')[0].value = '';
        document.getElementsByName('content')[0].value = '';

    } else {
        alert('Fields are empty');
    }
}
attachEvents();