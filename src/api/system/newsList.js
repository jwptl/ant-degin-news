import api from '../index'
import axios from '@/utils/request'

export function getNewsListCms(data) {
    return axios.post(api + 'getNewsList', data)
}

export function addNewsItemCms(data) {
    return axios.post(api + 'saveNewsList', data)
}

export function deleNewsItemCms(data) {
    return axios.post(api + 'deleNewsMod', data)
}

export function editNewsItemCms(data) {
    return axios.post(api + 'editNewsMsg', data)
}

export function queryNewsItemCms(data) {
    return axios.post(api + 'queryNewsMsg', data)
}

export function editNewStatusCms(data) {
    return axios.post(api + 'editNewsStatus', data)
}

export function getClassListCms(data) {
    return axios.post(api + 'getClassList', data)
}

export function saveClassListCms(data) {
    return axios.post(api + 'saveClassList', data)
}

export function deleClassItemCms(data) {
    return axios.post(api + 'deleClassItem', data)
}

export function getNewsIdListCms(data) {
    return axios.post(api + 'getNewsIdList', data)
}
