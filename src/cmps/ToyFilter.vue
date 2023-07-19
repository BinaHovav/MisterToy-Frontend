<template>
  <section class="toy-filter">
    <div class="search-bar">
      <div class="menu-btn btn" @click="toggleMenueOpen()">More</div>
      <input class="input" v-model="filterBy.txt" type="text" placeholder="Search toy name..." @focusin="toggleMenueOpen()"/>
      <div class="menu" :class="show">
        <div>
          <label for="price">Minimum Price:</label>
          <input class="input price-input" name="price" v-model="filterBy.minPrice" type="number" />
        </div>
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
          <option value="">Sort</option>
          <option value="nameAsc">Name: A-Z</option>
          <option value="nameDes">Name: Z-A</option>
          <option value="priceLow">Price: low-high</option>
          <option value="priceHigh">Price: high-low</option>
          <option value="createdNew">Created: new-old</option>
          <option value="createdOld">Created: old-new</option>
        </select>
      </div>
    </div>
    
  </section>
</template>

<script>
export default {
  name: 'toyFilter',

  data() {
    return {
      show: 'hide',
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
  methods: {
    toggleMenueOpen() {
      this.show = this.show === 'show' ? '' : 'show'
    }
  },
}

</script>
