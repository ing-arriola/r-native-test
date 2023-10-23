import axios from 'axios'

const productsURL='https://6222994f666291106a29f999.mockapi.io/api/v1'

export const productsApi = axios.create({baseURL:productsURL})