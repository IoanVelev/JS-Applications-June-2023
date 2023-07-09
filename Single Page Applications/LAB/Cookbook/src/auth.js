const guestNav = document.querySelector('#guest');
const userNav = document.querySelector('#user');
export function updateAuth() {
    let serializedUser = localStorage.getItem('user');
    
    if (serializedUser) {
        let user = JSON.parse(serializedUser);
        userNav.style.display = 'inline';
        guestNav.style.display = 'none';
    } else {
        guestNav.style.display = 'inline';
        userNav.style.display = 'none';

    }

}
export function logout() {
    localStorage.removeItem('user');
    updateAuth();
}

export function getToken() {
    let serializedUser = localStorage.getItem('user');

    if (serializedUser) {
        let user = JSON.parse(serializedUser);

        return user.accessToken;
    }
}