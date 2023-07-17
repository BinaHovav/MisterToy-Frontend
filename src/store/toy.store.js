import { toyService } from '../services/toy.service.local.js'

export const toyStore = {
  state: {
    toys: null,
    currToy: null
  },
  getters: {
    toysToDisplay({ toys }) { return toys }
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    },
    setCurrToy(state, { toy }) {
      state.currToy = toy
    },
    addToy(state, { toy }) {
      state.toys.unshift(toy)
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex(currToy => currToy._id === toy._id)
      state.toys.splice(idx, 1, toy)
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex(toy => toy._id === toyId)
      state.toys.splice(idx, 1)
    },
  },
  actions: {
    loadToys(context) {
      toyService
        .query()
        .then((toys) => {
          context.commit({ type: 'setToys', toys })
        })
        .catch((err) => {
          throw err
        })
    },
    saveToy({ commit, dispatch }, { toy }) {
      const actionType = toy._id ? 'updateToy' : 'addToy'
      return toyService.save(toy).then((savedToy) => {
        commit({ type: actionType, toy: savedToy })
        // let txt = actionType === 'addToy' ? 'Added a toy' : 'Updated toy'
        // txt += `: ${savedToy.txt}`
        // const activity = { txt, at: Date.now() }
        // dispatch({ type: 'addActivity', activity })
        return savedToy
      })
    },
    removeToy({ commit, dispatch, state }, payload) {
      console.log('🚀 ~ file: toy.store.js:101 ~ payload:', payload)
      return toyService.remove(payload.toyId).then(() => {
        const toyTxt = state.toys.find(
          (toy) => toy._id === payload.toyId
        ).txt
        commit(payload) // {type: 'removeToy', toyId}
        const activity = { txt: `Removed the toy ${toyTxt}`, at: Date.now() }
        dispatch({ type: 'addActivity', activity })
      })
    },
    getById({ commit }, { toyId }) {
      return toyService.getById(toyId).then((toy) => {
        commit({ type: 'setCurrToy', toy })
        return toy
      })
    },
  }
}