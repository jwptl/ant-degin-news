import api from '../index'
import axios from '@/utils/request'

export function getUserListCms(data) {
    return axios.post(api + 'users/getUserList', data)
}
export function getUserInfoListCms(data) {
    return axios.post(api + 'users/getUserInfoList', data)
}

export function addUserItemCms(data) {
    return axios.post(api + 'users/addUserItem', data)
}

export function deleUserItemCms(data) {
    return axios.post(api + 'users/deleUserItem', data)
}

export function editUserStateCms(data) {
    return axios.post(api + 'users/editUserState', data)
}