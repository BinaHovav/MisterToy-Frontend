<template>
    <section class="toy-filter">
        <input class="input" v-model="filterBy.txt" type="text" placeholder="Search toy name...">
        Minimum Price:<input class="input" v-model="filterBy.minPrice" type="number">
        <label> labels
            <br>
            <label v-for="label in labels"> {{ label }}
                <input type="checkbox" :value="label" v-model="filterBy.labels"><br>
            </label>
        </label>
        <select v-model="filterBy.status">
            <option value="all">All</option>
            <option value="inStock">inStock</option>
            <option value="outStock">out of Stock</option>
        </select>
        <select v-model="filterBy.sortBy">
            <option :value="JSON.stringify({name:'name',dir: 1})">Name: A-Z</option>
            <option value="{'name', -1}">Name: Z-A</option>
            <option value="{'price', 1}">Price: low to high</option>
            <option value="{'price', -1}">Price: high to low</option>
            <option value="{'created', 1}">Created: new to old</option>
            <option value="{'created', -1}">Created: old to new</option>
        </select>
    </section>
</template>

<script>
export default {
    name: 'toyFilter',
    data() {
        return {
            labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
                'Outdoor', 'Battery Powered'],
            filterBy: {
                txt: '',
                minPrice: 0,
                labels: [],
                status: 'all',
                sortBy: {}
            }
        }
    },
    methods: {
        setSortBy(sortBy, dir){

            this.filterBy.sortBy = {sortBy, dir}
        }
    },
    watch: {
        filterBy: {
            handler(){
                this.filterBy.sortBy = JSON.parse(this.filterBy.sortBy)
                console.log(this.filterBy.sortBy)
                // this.$emit('filtered', this.filterBy)
            },
            deep: true
        }
    }
}
</script>