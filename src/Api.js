import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://listaGaragem.herokuapp.com/'
})

export default Api;