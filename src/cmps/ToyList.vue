<template>
    <section class="toy-list">
        <RouterLink class="btn-add" to="/toy/edit">Add Toy</RouterLink>
        <ToyPreview v-for="toy in toys" :key="toy._id" :toy="toy" @removed="$emit('removed', toy._id)" />
    </section>
</template>

<script>
import ToyPreview from './ToyPreview.vue'
export default {
    name: 'toyList',
    emits: ['removed'],
    props: {toys: {type: Array, required:true}},
    components: {
        ToyPreview
    }
}
</script>