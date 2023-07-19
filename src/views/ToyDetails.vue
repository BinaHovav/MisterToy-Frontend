<template>
    <section class="toy-details">
        <img :src="toy.img" />
        <h2>Name: <span> {{ toy.name }} </span></h2>
        <h2>Price: <span> ${{ toy.price }}</span></h2>
        <h2>Labels: <span class="labels" v-for="label in toy.labels"> {{ label }} | </span></h2>
        <h2>Added on: <span>{{ formattedCreatedAt }}</span></h2>
        <h2>Status: <span v-if="toy.status === 'outStock'">out of stock</span><span v-else>in Stock</span></h2>
    </section>
</template>


<script>
export default {
    name: 'toyDetails',
    data() {
        return {
            toy: {}
        }
    },
    created() {
        this.loadToy()

    },
    methods: {
        loadToy() {
            const { toyId } = this.$route.params
            this.$store.dispatch({ type: 'getById', toyId })
                .then(currToy => this.toy = currToy)
                .catch(err => console.log('cant get toy'))
        },
        formatTimestamp(timestamp) {
            const date = new Date(timestamp)
            return date.toLocaleString()
        }
    },
    computed: {
        formattedCreatedAt() {
            if (this.toy && this.toy.createdAt) {
                return this.formatTimestamp(this.toy.createdAt)
            }
            return ''
        }

    }
}
</script>

