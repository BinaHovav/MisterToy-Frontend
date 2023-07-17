<template>
    <section class="toy-list">
        <ToyPreview v-for="toy in toys" :key="toy._id" :toy="toy" @removed="$emit('removed', toy._id)" />
    </section>
</template>

<script>
import ToyPreview from './ToyPreview.vue'
export default {
    name: 'toyList',
    emits: ['removed'],
    props: ['toys'],
    components: {
        ToyPreview
    }
}
</script>