<template>
    <section class="toy-edit">
        <pre>{{ toyToEdit }}</pre>
        <form v-if="toyToEdit" @submit.prevent="saveToy">
            <input type="text" v-model="toyToEdit.name" required placeholder="Enter toy name">
            <input type="number" v-model="toyToEdit.price" placeholder="Enter price">
            <br>
            <label> labels
                <br>
                <label v-for="label in labels"> {{ label }}
                    <input type="checkbox" :value="label" v-model="toyToEdit.labels"><br>
                </label>
            </label>
            <button>save</button>
        </form>
    </section>
</template>
<script>
import { toyService } from '@/services/toy.service.local.js'
import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service.js'
export default {
    name: 'toyEdit',
    data() {
        return {
            toyToEdit: null,
            labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
                'Outdoor', 'Battery Powered'],
        }
    },
    created() {
        this.loadToy()
    },
    methods: {
        loadToy() {
            const { toyId } = this.$route.params
            if (toyId) {
                this.$store.dispatch({ type: 'getById', toyId })
                    .then(currToy => this.toyToEdit = {...currToy})
                    .catch(err => showErrorMsg('cant get toy'))
            } else {
                this.toyToEdit = toyService.getEmptyToy()
            }
        },
        saveToy() {
            this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit })
                .then(updatedToy => {
                    showSuccessMsg(updatedToy.name, 'has been saved')
                    this.$router.push('/toy')
                })
                .catch(err => showErrorMsg('save failed'))
        }
    },
    computed: {
    }
}
</script>





















