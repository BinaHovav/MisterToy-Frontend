import { httpService } from './http.service.js'

export const toyService = {
	query,
	getById,
	remove,
	save,
	getEmptyToy,
	addToyMsg
}

function query(filterBy) {
	return httpService.get('toy', filterBy)
}

function getById(toyId) {
	return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
	return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
	if (toy._id) {
		return httpService.put(`toy/${toy._id}`, toy)
	}
	return httpService.post('toy', toy)
}

function addToyMsg(toyId,txt){
	return httpService.post(`toy/${toyId}/msg`, {txt})
}

function getEmptyToy() {
	return {
		name: '',
		price: 0,
		labels: [],
		createdAt: Date.now(),
		status: 'inStock',
	}
}
