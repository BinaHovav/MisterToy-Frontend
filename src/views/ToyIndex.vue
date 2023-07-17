<template>
    <section class="toy-index">
        <!-- <ToyFilter @filteredTxt="debounceHandler" @filteredStatus="setFilterByStatus" /> -->
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
// import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service.js'

export default {
    name: 'toyIndex',
    data() {
        return {
            toys: null
        }
    },
    created() {

    },
    methods: {

    },
    computed: {
        toys() { return this.$store.getters.toysToDisplay }
    }
}
</script>