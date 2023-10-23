import axios from 'axios'

const finnhub='https://finnhub.io/api/v1/'

export const finnhubApi = axios.create({baseURL:finnhub})