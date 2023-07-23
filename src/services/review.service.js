import { httpService } from './http.service'

// import { store } from '../store/store'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'

// ;(() => {
//   setTimeout(()=>{
//     socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
//       console.log('GOT from socket', review)
//       store.commit({type: 'addReview', review})
//     })
//     socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
//       showSuccessMsg(`New review about me ${review.txt}`)
//     })
//   }, 0)

// })()

export const reviewService = {
  add,
  query,
  remove
}
// var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
// return httpService.get(`review${queryStr}`)

function query(filterBy) {
  return httpService.get('review',  filterBy )
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
}

function add({ txt, toyId }) {
  return httpService.post(`review`, { txt, toyId })
}