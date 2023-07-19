<template>
  <section class="toy-filter">
    <input class="input" v-model="filterBy.txt" type="text" placeholder="Search toy name..." />
    Minimum Price: <input class="input" v-model="filterBy.minPrice" type="number" />
    <select v-model="filterBy.status">
      <option value="all">All</option>
      <option value="inStock">inStock</option>
      <option value="outStock">out of Stock</option>
    </select>
    <div class="select-container">
      <el-select-v2 v-model="filterBy.labels" :options="options" placeholder="Please select" style="width: 240px"
        multiple />
    </div>
    <select v-model="filterBy.sortBy">
      <option value="nameAsc">Name: A-Z</option>
      <option value="nameDes">Name: Z-A</option>
      <option value="priceLow">Price: low-high</option>
      <option value="priceHigh">Price: high-low</option>
      <option value="createdNew">Created: new-old</option>
      <option value="createdOld">Created: old-new</option>
    </select>
  </section>
</template>

<script>
export default {
  name: 'toyFilter',

  data() {
    return {
      labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'],
      filterBy: {
        txt: '',
        minPrice: 0,
        labels: [],
        status: 'all',
        sortBy: '',
      },
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
      ],
    }
  },
  watch: {
    filterBy: {
      handler() {
        this.$emit('filtered', this.filterBy)
      },
      deep: true,
    },
  },
}
</script>
