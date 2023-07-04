function attachEvents() {
    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    const nameInput = document.getElementsByName('author')[0];
    const messageInput = document.getElementsByName('content')[0];
    const textArea = document.getElementById('messages');
    const url =  `http://localhost:3030/jsonstore/messenger`

    sendBtn.addEventListener('click', onClickAdd);
    refreshBtn.addEventListener('click', onClickRefresh);

    async function onClickRefresh(){
        const res = await fetch(url);
        const data = await res.json();
        textArea.textContent = Object.values(data).map(m => `${m.author}: ${m.content}`).join('\n')
    }

    async function onClickAdd(){
        const name = nameInput.value;
        const message = messageInput.value;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author: name, content: message })
        });
        nameInput.value = '';
        messageInput.value = '';
    }

}

attachEvents();