import { toyService } from '../services/toy.service.js'

export const toyStore = {
  state: {
    toys: [],
    currToy: null,
    toyMsgs: []
  },
  getters: {
    toysToDisplay({ toys }) {
      return toys || null
    },
    currToyMsgs({ toyMsgs }) {
      return toyMsgs || []
    }
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    },
    setCurrToy(state, { toy }) {
      state.currToy = toy
      state.toyMsgs = toy.msgs
    },
    addToy({ toys }, { toy }) {
      toys.unshift(toy)
    },
    updateToy({ toys }, { toy }) {
      const idx = toys.findIndex((currToy) => currToy._id === toy._id)
      toys.splice(idx, 1, toy)
    },
    removeToy({ toys }, { toyId }) {
      const idx = toys.findIndex((toy) => toy._id === toyId)
      toys.splice(idx, 1)
    },
    updateToyMsg(state, { toyId, msg }) {
      state.toyMsgs.push(msg)
    }
  },
  actions: {
    loadToys({ commit }, { filterBy }) {
      toyService
        .query(filterBy)
        .then((toys) => {
          commit({ type: 'setToys', toys })
        })
        .catch((err) => {
          throw err
        })
    },
    getAllToys() {
      return toyService
        .query()
        .then()
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
        const toyTxt = state.toys.find((toy) => toy._id === payload.toyId).txt
        commit(payload) // {type: 'removeToy', toyId}
        // const activity = { txt: `Removed the toy ${toyTxt}`, at: Date.now() }
        // dispatch({ type: 'addActivity', activity })
      })
    },
    getById({ commit }, { toyId }) {
      return toyService.getById(toyId).then((toy) => {
        commit({ type: 'setCurrToy', toy })
        return toy
      })
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    },
    addToyMsg({ commit }, { toyId, msg }) {
      return toyService.addToyMsg(toyId, msg)
        .then(msg => commit({ type: 'updateToyMsg', toyId, msg }))
    },


  },
}
