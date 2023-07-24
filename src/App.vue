<template>
	<main class="main-layout" >
	    <AppHeader/>
		<RouterView />
	</main>
</template>

<script>
import { RouterView } from 'vue-router'
import  AppHeader  from '@/cmps/AppHeader.vue'
import { socketService} from '@/services/socket.service.js'


export default {
	created() {
		this.$store.dispatch({ type: 'loadToys' })
		socketService.on('test', (msg)=>{
			console.log('msg',msg);
		})
	},
	components: {
		AppHeader,
	},
	computed: {
	},
}
</script>