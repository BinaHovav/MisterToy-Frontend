<template>
    <section class="toy-edit">
        <form v-if="toyToEdit" @submit.prevent="saveToy">
            <section class="toy-img">
                <img :src="toyToEdit.img" />
                <button @click.prevent="editToyImg">Edit Image</button>
            </section>
            <h2>Name: <input type="text" v-model="toyToEdit.name" required placeholder="Enter toy name"></h2>
            <h2>Price: <span>$</span><input type="number" v-model="toyToEdit.price" placeholder="Enter price"> </h2>
            <div class="select-container">
                <h2>Labels:</h2>
                <el-select-v2 v-model="toyToEdit.labels" :options="options" placeholder="Please select" style="width: 240px"
                    multiple />
            </div>
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
            options: [
                {
                    value: 'On wheels',
                    label: 'On wheels',
                },
                {
                    value: 'Box game',
                    label: 'Box game',
                },
                {
                    value: 'Art',
                    label: 'Art',
                },
                {
                    value: 'Baby',
                    label: 'Baby',
                },
                {
                    value: 'Doll',
                    label: 'Doll',
                },
                {
                    value: 'Puzzle',
                    label: 'Puzzle',
                },
                {
                    value: 'Outdoor',
                    label: 'Outdoor',
                },
                {
                    value: 'Battery Powered',
                    label: 'Battery Powered',
                },
            ]
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
                    .then(currToy => this.toyToEdit = { ...currToy })
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
                .catch(err => {
                    showErrorMsg('save failed')
                    this.$router.push('/toy')
                })
        },
        editToyImg() {
            // console.log('test');
        }
    },
    computed: {
    }
}
</script>





















