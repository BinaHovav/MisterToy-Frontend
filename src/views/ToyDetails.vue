<template>
    <section class="toy-details">
        <h2>{{ toy.name }}</h2>
        <h5>{{ toy._id }}</h5>
        <p>Price: ${{ toy.price }}</p>
        <ul>Categories:
            <li class="category-item" v-for="label in toy.labels" :key="label">
                 {{ label }}
            </li>
        </ul>
        <p>In store since: {{ formattedCreatedAt }}</p>
        <p>In stock: {{ toy.status }}</p>
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

