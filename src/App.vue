<template>
	<main class="main" >
	    <AppHeader/>
		<RouterView />
	</main>
</template>

<script>
import { RouterView } from 'vue-router'
import  AppHeader  from '@/cmps/AppHeader.vue'


export default {
	created() {
		this.$store.dispatch({ type: 'loadToys' })
	},
	components: {
		AppHeader,
	},
	computed: {
	},
}
</script>