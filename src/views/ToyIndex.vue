<template>
  <section class="toy-index">
    <ToyFilter @filtered="debounceHandler" />
    <img class="index-img" :src="imageUrl" />

    <ToyList v-if="toys" :toys="toys" @removed="removeToy" />
    <!-- <h1 v-if="!toys">No Toys To Display</h1>  -->

    <!-- <div class="flex space-between">
            <button class="btn" @click="setPage(-1)">Prev</button>
            <button class="btn" @click="setPage(1)">Next</button>
        </div> -->
    <RouterView />
  </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service.js'
import { utilService } from '@/services/util.service.js'
import ToyList from '@/cmps/ToyList.vue'
import ToyFilter from '@/cmps/ToyFilter.vue'

export default {
  name: 'toyIndex',
  emits: ['removed'],
  data() {
    return {
      imageUrl: 'https://res.cloudinary.com/dyu8jwe4o/image/upload/v1689790313/toys_yhc739.png',
    }
  },
  created() {
    this.debounceHandler = utilService.debounce(this.setFilterBy, 500)
  },
  methods: {
    removeToy(toyId) {
      this.$store
        .dispatch({ type: 'removeToy', toyId })
        .then(showSuccessMsg('Toy Removed'))
        .catch((err) => showErrorMsg('Toy Failed to remove'))
    },
    setFilterBy(filterBy) {
      this.$store
        .dispatch({ type: 'loadToys', filterBy })
        .then(showSuccessMsg('Toys rendered'))
        .catch((err) => showErrorMsg('Toys Failed to render'))
    },
  },
  computed: {
    toys() {
      return this.$store.getters.toysToDisplay
    },
  },
  components: {
    ToyList,
    ToyFilter,
  },
}
</script>
