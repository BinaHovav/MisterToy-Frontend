<template>
    <section class="toy-details">
        <section class="toy-show-details">
            <img :src="toy.img" />
            <h2>Name: <span> {{ toy.name }} </span></h2>
            <h2>Price: <span> ${{ toy.price }}</span></h2>
            <h2>Labels: <span class="labels" v-for="label in toy.labels"> {{ label }} | </span></h2>
            <h2>Added on: <span>{{ formattedCreatedAt }}</span></h2>
            <h2>Status: <span v-if="toy.status === 'outStock'">out of stock</span><span v-else>in Stock</span></h2>
        </section>
        <section class="toy-msg">
            <h2> Reviews:</h2>
            <section class="toy-reviews" v-for="msg in toy.msgs">
                <pre>{{ msg.txt }}</pre>
                <button @click= "removeMsg(msg.id)">remove review</button>
            </section>
            <form @submit.prevent="addMsg">
                <textarea type="text" v-model="msg" placeholder="Enter review..." />
                <button>save</button>
            </form>
        </section>
    </section>
</template>


<script>
export default {
    name: 'toyDetails',
    data() {
        return {
            toy: {},
            msg: '',
        }
    },
    created() {
        this.loadToy()
    },
    methods: {
        loadToy() {
            const { toyId } = this.$route.params
            this.$store.dispatch({ type: 'getById', toyId })
                .then(currToy => this.toy = currToy)
                .catch(err => console.log('cant get toy'))
        },
        formatTimestamp(timestamp) {
            const date = new Date(timestamp)
            return date.toLocaleString()
        },
        removeMsg(msgId){
            console.log(msgId);
        },
        addMsg(){
            this.$store.dispatch({type: "addToyMsg", toyId: this.toy._id, msg: this.msg})
            this.msg = ''
        }
    },
    computed: {
        formattedCreatedAt() {
            if (this.toy && this.toy.createdAt) {
                return this.formatTimestamp(this.toy.createdAt)
            }
            return ''
        },
        currToyMsgs(){
            return this.$store.getters.currToyMsgs
        }
    }
}
</script>

