<template>
    <section class="toy-preview">
        <ul>{{ toy.name }}</ul>
        <ul>{{ toy.price }}</ul>
        <ul>
            <li v-for="label in toy.labels" :key="label">{{ label }}</li>
        </ul>
            <div class="tools">
            <button @click="$emit('removed')" class="btn">
                <span>x</span>
            </button>
            <RouterLink :to="'/toy/edit/' + toy._id" class="btn">
                <span>Edit</span>
            </RouterLink>
            <RouterLink :to="'/toy/' + toy._id" class="btn">
                <span>Details</span>
            </RouterLink>
        </div>
    </section>
</template>

<script>
export default {
    name: 'toyPreview',
    props: {toy: {type: Object, required:true}
    },
    emits: ['removed'],
}
</script>