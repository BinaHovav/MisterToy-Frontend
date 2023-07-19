<template>
  <section class="toy-preview">
    <img class="img-preview" :src="toy.img" alt="Toy Image" />
    <h2 class="h2-preview-name">
      {{ toy.name }}
    </h2>
    <h2>Price: ${{ toy.price }}</h2>
    <h2 class="preview-labels">
      <li v-for="label in toy.labels" :key="label">{{ label }}</li>
    </h2>
    <div class="tools">
      <button @click="$emit('removed')" class="btn">Remove</button>
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
  props: { toy: { type: Object, required: true } },
  emits: ['removed'],
}
</script>
