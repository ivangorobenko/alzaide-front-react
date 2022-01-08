import axios from "axios";

const baseHttpClient = axios.create({baseURL: process.env.REACT_APP_BASE_URL, withCredentials: true});
export const axiosHttpClient = {
    get: (endpoint, headers = {}) =>
        baseHttpClient
            .get(endpoint, {
                headers: {
                    ...headers,
                    Accept: "application/json; charset=utf-8",
                },
            })
            .then(({data}) => data),
    put: (endpoint, data, headers = {}) =>
        baseHttpClient.put(endpoint, data, {
            headers,
        }),
    post: (endpoint, data, headers = {}) => baseHttpClient.post(endpoint, data, {headers}),
    delete: (endpoint, headers = {}) =>
        baseHttpClient.delete(endpoint, {
            headers: {
                ...headers,
                Accept: "application/json; charset=utf-8",
            },
        }),
};
