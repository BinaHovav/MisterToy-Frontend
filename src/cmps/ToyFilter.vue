<template>
  <section class="toy-filter">
    <div class="search-bar">
      <div class="menu-btn btn" @click="toggleMenueOpen()">More</div>
      <input class="input" v-model="filterBy.txt" type="text" placeholder="Search toy name..."
        @focusin="toggleMenueOpen()" />
      <div class="menu" :class="show">
        <div>
          <label for="price">Minimum Price:</label>
          <input class="input price-input" name="price" v-model="filterBy.minPrice" type="number" />
        </div>
        <select v-model="filterBy.status">
          <option value="">All</option>
          <option value="inStock">inStock</option>
          <option value="outStock">out of Stock</option>
        </select>
        <div class="select-container">
          <el-select-v2 v-model="filterBy.labels" :options="options" placeholder="Please select" style="width: 240px"
            multiple />
        </div>
        <select @change="setSortBy">
          <option value="">Sort</option>
          <option value="name,1">Name: A-Z</option>
          <option value="name,-1">Name: Z-A</option>
          <option value="price,1">Price: low-high</option>
          <option value="price,-1">Price: high-low</option>
          <option value="createdAt,1">Created: new-old</option>
          <option value="createdAt,-1">Created: old-new</option>
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
        status: '',
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
    },
    setSortBy(el) {
      let sort = el.target.value
      if (sort) {
        sort = sort.split(',')
        sort[1] = +sort[1]
      }
      this.filterBy.sortBy = sort
    }
  },
}

</script>
