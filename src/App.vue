<template>
	<header>
		<!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

		<div class="app-header">
			<!-- <HelloWorld msg="You did it!" /> -->

			<nav>
     			<RouterLink to="/" class="nav-link home-link">Home</RouterLink>
    			<RouterLink to="/toy" class="nav-link toy-link">Toys</RouterLink>
    			<RouterLink to="/about" class="nav-link about-link">About</RouterLink>
   			 </nav>		
		</div>
	</header>

	<main class="main" >
		<RouterView />
		<!-- <UserMessage /> -->
	</main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import UserMessage from './components/UserMessage.js'


export default {
	created() {
		this.$store.dispatch({ type: 'loadToys' })
	},
	components: {
		// AppHeader,
		// UserMessage,
	},
	computed: {
		// appStyles() {
		//     return {
		//         backgroundColor: this.prefs.bgColor,
		//         color: this.prefs.color,
		//     }
		// },
		// prefs() {
		//     return this.$store.getters.user.prefs
		// },
	},
}
</script>