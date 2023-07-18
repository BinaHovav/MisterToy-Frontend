

<template>
	<div class="home-view">
        <img :src="imageUrl" >
	</div>
</template>

<script>
	export default {
		data() {
        return {
            imageUrl: '@/assets/img/toys.png'
        }
    }
	}
</script>