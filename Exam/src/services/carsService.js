import * as request from './requester.js';

const baseUrl = 'http://localhost:3030/data/cars';

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc`);

export const getOne = (carId) => request.get(`${baseUrl}/${carId}`);

export const create = (carData) => request.post(baseUrl, carData);

export const edit = (carId, carData) => request.put(`${baseUrl}/${carId}`, carData);

export const remove = (carId) => request.del(`${baseUrl}/${carId}`);

export const search = (searchText) => {
    const query = encodeURIComponent(`model LIKE "${searchText}"`);
    return request.get(`${baseUrl}?where=${query}`)
}