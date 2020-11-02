import axios from 'axios'

export const setToken = async (token) => {
    if (token) axios.defaults.headers.common['x-auth-token'] = token;
    else delete axios.defaults.headers.common['x-auth-token']

}