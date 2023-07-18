<template>
    <section class="toy-index">
        <ToyFilter @filtered="debounceHandler" />
        <img :src="imageUrl" >

        <ToyList v-if="toys" :toys="toys" @removed="removeToy" />
        <!-- <div class="flex space-between">
            <button class="btn" @click="setPage(-1)">Prev</button>
            <button class="btn" @click="setPage(1)">Next</button>
        </div> -->
        <RouterView />
    </section>
</template>


<script>
// import { toyService } from '@/services/toy.service.local.js'
import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service.js'
import { utilService } from '@/services/util.service.js'
import ToyList from '@/cmps/ToyList.vue'
import ToyFilter from '@/cmps/ToyFilter.vue'

export default {
    name: 'toyIndex',
    emits: ['removed'],
    data() {
        return {
            filterBy: {
                txt: '',
                minPrice: 0,
                labels: [],
                inStock: false
            },
            imageUrl: '../src/assets/img/toys.png'

        }
    },
    created() {
        this.debounceHandler = utilService.debounce(this.setFilterBy, 500)
    },
    methods: {
        filterToys() {
            const filterBy = { ...this.filterBy }
            this.$store.commit({ type: 'setFilterBy', filterBy })

            // If filtering in backend/service
            // this.isLoading = true
            // this.$store
            //   .dispatch({ type: 'loadToys', filterBy })
            //   .then(() => (this.isLoading = false))
        },
        removeToy(toyId) {
            this.$store.dispatch({ type: 'removeToy', toyId })
                .then(showSuccessMsg('Toy Removed'))
                .catch(err => showErrorMsg('Toy Failed to remove'))
        },
        setFilterBy(filtered) {
            this.filterBy = filtered
            this.filterToys()
        },
    },
    computed: {
        toys() { return this.$store.getters.toysToDisplay }
    },
    components: {
        ToyList,
        ToyFilter
    }
}
</script>