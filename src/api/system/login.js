import api from '../index'
import axios from '@/utils/request'

export function signCms(data) {
    return axios.post(api + 'users/signUser', data)
}

export function getCodeCms(data) {
    return axios.post(api + 'users/sendCode', data)
}

export function loginCms(data) {
    return axios.post(api + 'users/login', data)
}

export function forgetCms(data) {
    return axios.post(api + 'users/forgetPasswd', data)
}