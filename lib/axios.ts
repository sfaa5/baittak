import axios from 'axios'
const BaseURL = process.env.NEXT_PUBLIC_URL_SERVER

export default axios.create({
    baseURL: BaseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const axiosAuth = axios.create({
baseURL: BaseURL,
headers:{"Content-Type":"application/json"}
})