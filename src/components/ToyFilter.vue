<template>
    <section class="toy-filter">
        <input class="input" v-model="filterBy.txt" @input="setFilter" type="text" placeholder="Search toy name...">
        Minimum Price:<input class="input" v-model="filterBy.minPrice" @input="setFilter" type="number">
        <label> labels
            <br>
            <label v-for="label in labels"> {{ label }}
                <input type="checkbox" :value="label" v-model="filterBy.labels" @input="setFilter"><br>
            </label>
        </label>
        Show Only in Stock<input type="checkbox" v-model="filterBy.inStock" @input="setFilter">

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
                inStock: false
            }
        }
    },
    methods: {
        setFilter() {
            console.log(this.filterBy);
            this.$emit('filtered', this.filterBy)
        },
    }
}
</script>