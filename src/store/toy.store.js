import { toyService } from '../services/toy.service.local.js'

export const toyStore = {
  state: {
    toys: [],
    currToy: null,
    filterBy: {
      txt: '',
      minPrice: 0,
      labels: [],
      inStock: false,
    },
  },
  getters: {
    toysToDisplay({ filterBy, toys }) {
      if (!toys) return null

      const { txt, minPrice, labels, inStock } = filterBy
      let filteredToys = toys

      const regex = new RegExp(txt, 'i')
      filteredToys = filteredToys.filter((toy) => regex.test(toy.name))

      filteredToys = filteredToys.filter((toy) => toy.price >= minPrice)

      if (labels) {
        filteredToys = filteredToys.filter((toy) => labels.every((label) => toy.labels.includes(label)))
      }
      if (inStock) {
        filteredToys = filteredToys.filter((toy) => toy.inStock)
      }
      // const startIdx = pageIdx * pageSize
      // filteredToys = filteredToys.slice(startIdx, startIdx + pageSize)

      return filteredToys
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    },
    setCurrToy(state, { toy }) {
      state.currToy = toy
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
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
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
        const toyTxt = state.toys.find((toy) => toy._id === payload.toyId).txt
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
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    },
  },
}
