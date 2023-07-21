<template>
  <header>
    <div class="app-header">
      <nav>
        <RouterLink to="/" class="nav-link home-link">Home</RouterLink>
        <RouterLink to="/toy" class="nav-link toy-link">Toys</RouterLink>
        <RouterLink to="/about" class="nav-link about-link">About</RouterLink>
        <RouterLink to="/toy/dashboard" class="nav-link dashboard-link">Dashboard</RouterLink>
        <RouterLink v-if="this.logedUser?.isAdmin" to="/toy/edit" class="btn-add">Add Toy</RouterLink>
        <section>
          <span v-if="this.logedUser">Welcome {{ this.logedUser.fullname }}</span>
          <a v-if="!this.logedUser" href="#" class="nav-link login" @click="toggleLogin">Login</a>
          <a v-if="this.logedUser" href="#" class="nav-link login" @click="logOut">Logout</a>
        </section>
      </nav>
    </div>
    <section :class="show">
      <!-- login -->
      <div class="login-dropdown" :class="{ shown: isShown }">
        <h1>Let's log in!</h1>
        <img :src="imgUrl" />
        <form @submit.prevent="login">
          <label for="username">username</label>
          <input type="text" name="username" required v-model="userData.username">
          <label for="password">password</label>
          <input type="text" name="password" required v-model="userData.password">
          <button>Login</button>
        </form>
        <h3>Don't have an account yet? click <span @click="isShown = !isShown">here</span></h3>
      </div>

      <!-- signup -->
      <div class="login-dropdown" :class="{ shown: !isShown }">
        <h1>Let's sign up!</h1>
        <img :src="imgUrl" />
        <form @submit.prevent="signup">
          <label for="fullname">fullname</label>
          <input type="text" name="fullname" required v-model="newUser.fullname">
          <label for="username">username</label>
          <input type="text" name="username" required v-model="newUser.username">
          <label for="password">password</label>
          <input type="text" name="password" required v-model="newUser.password">
          <button>Sign up</button>
        </form>
        <h3>Already have a user? click <span @click="isShown = !isShown">here</span></h3>
      </div>
    </section>
  </header>
</template>

<script>

export default {
  name: 'AppHeader',
  data() {
    return {
      imgUrl: './src/assets/img/robot.jpg',
      show: '',
      isShown: true,
      userData: {
        username: null,
        password: null
      },
      newUser: {
        fullname: null,
        username: null,
        password: null
      }
    }
  },
  methods: {
    toggleLogin() {
      this.show = this.show === '' ? 'show' : ''
    },
    login() {
      this.$store.dispatch({ type: 'login', credentials: this.userData })
        .then(() => {
          this.toggleLogin()
          this.$router.push('/toy')
        })
    },
    signup() {
      this.$store.dispatch({ type: 'signUp', signupInfo: this.newUser })
        .then(() => {
          this.toggleLogin()
          this.$router.push('/toy')
        })
    },
    logOut() {
      this.$store.dispatch({ type: 'logOut' })
        .then(() => this.$router.push('/toy'))
    }
  },
  computed: {
    logedUser() {
      return this.$store.getters.user
    }
  }
}
</script>
