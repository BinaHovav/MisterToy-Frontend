import { userService } from '../services/user-service.js';
export const userStore = {
    strict: true,
    state() {
        return {
            user: userService.getLoggedInUser(),
            products: null,
        }
    },
    mutations: {
        logUser(state, { user }) {
            state.user = user
        },
        logout(state) {
            state.user = userService.getLoggedInUser()
        },
        checkout(state, { updatedUser }) {
            state.user = updatedUser
            state.cart = []
        },
        toggleOrderStatus({ user }, { orderId }) {
            const order = user.orders.find(order => order._id === orderId)
            order.status = order.status === 'Pending' ? 'Approved' : 'Pending'
        },
        addFunds({ user }, { amount }) {
            user.balance = amount
        }
    },
    getters: {
        user({ user }) { return user },
    },
    actions: {
        login({ commit }, { credentials }) {
            return userService.login(credentials)
                .then(user => {
                    commit({ type: 'logUser', user })
                })
        },
        signUp({ commit }, { signupInfo }) {
            return userService.signup(signupInfo)
                .then(user => {
                    commit({ type: 'logUser', user })
                })
        },
        logOut({ commit }) {
            return userService.logout()
                .then(() => commit({ type: 'logout' }))
        },
        addOrder(context) {
            return userService.addOrder(context.state.cart, context.getters.cartTotal)
                .then(updatedUser => {
                    context.commit({ type: 'checkout', updatedUser })
                })
                .catch(err => {
                    console.log(err)
                    return Promise.reject()
                })
        },
        toggleOrderStatus({ commit }, { orderId }) {
            return userService.toggleOrderStatus(orderId)
                .then(() => {
                    commit({ type: 'toggleOrderStatus', orderId })
                })
                .catch(err => {
                    console.log(err)
                    return Promise.reject()
                })
        },
        addFunds({ commit }, { amount }) {
            return userService.addFunds(amount)
                .then(newBalance => {
                    commit({ type: 'addFunds', amount: newBalance })
                })
                .catch(err => {
                    console.log(err)
                    return Promise.reject()
                })
        }
    }
}
