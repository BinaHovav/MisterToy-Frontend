import { httpService } from './http.service.js'

export const userService = {
    query,
    login,
    logout,
    signup,
    remove,
    getById,
    getLoggedInUser,
}
const STORAGE_KEY = 'loggedinUser'
function query() {
    return httpService.get('toy', filterBy)
}
function login(credentials) {
    return httpService.post('auth/login', credentials)
}
function signup(signupInfo) {
    return httpService.post('auth/signup', signupInfo)
}
function remove(userId) {
    console.log(userId)
    return Axios.delete('/api/user/' + userId)
}
function logout() {
    return httpService.post('auth/logout')
}
function getById(userId) {
    return httpService.get(`toy/${toyId}`)
}
function getLoggedInUser() {
    return _getUserFromSession()
}
function _getUserFromSession() {
    const entity = sessionStorage.getItem(STORAGE_KEY)
    return JSON.parse(entity)
}