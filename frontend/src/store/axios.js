import axios from 'axios'
const API_URL = '/api'

function generateConfig(url){
    return {
        baseURL        : url,
        withCredentials: true,
        // /mode           : 'cors',
        headers        : {
            'Content-Type': 'application/json',
        },
    }
}
export const $api = axios.create(generateConfig(API_URL))

