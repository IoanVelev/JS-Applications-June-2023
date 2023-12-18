import * as authService from './authService.js';

const request = (method, url, data) => {
let options = {};
let token = authService.getToken();




if (method != 'GET') {
    options.method = method;

    options.headers = {
        'content-type': 'application/json',
    };

    if (token) {
        options.headers['X-Authorization'] = token;
    }
    
    options.body = JSON.stringify(data);
}


try {
    return fetch(url, options).then(res => {
        if (res.status != 204 && res.ok != true) {
            throw new Error(res.message);
        } 

        return res.json();
    });
} catch (err) {
    return err.message
}
}


export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const put = request.bind({}, 'PUT');
export const patch = request.bind({}, 'PATCH');
export const del = request.bind({}, 'DELETE');

