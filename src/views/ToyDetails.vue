<script>
export default {
    name: 'toyDetails',
    data() {
        return {
            toy: null
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
        }
    },
    computed: {

    }
}
</script>

<template>
    <section class="toy-details">
        <pre>{{ this.toy }}</pre>
    </section>
</template>