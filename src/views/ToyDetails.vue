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
    </section>
    <form @submit.prevent="addMsg">
        <textarea type="text" v-model="msg" placeholder="Enter msg..." />
        <button>save</button>
    </form>
    <h2> Msgs:</h2>
    <section class="toy-msg">
        <article class="toy-msgs" v-for="msg in toy.msgs">
            <p>{{ msg.txt }}</p>
            <button @click="removeMsg(msg.id)">X</button>
        </article>
    </section>
    <section class="toy-reviews">
        <form @submit.prevent="addReview">
            <textarea type="text" v-model="review.body" placeholder="Enter review..." />
            <button>Save</button>
        </form>
        <article class="review" v-for="review in reviews">
            <p>{{ review.body }}</p>
        </article>
    </section>
</template>


<script>
export default {
    name: 'toyDetails',
    data() {
        return {
            toy: {},
            msg: '',
            newReview: '',

        }
    },
    created() {
        this.loadToy()
        this.loadReviews()
    },
    methods: {
        loadToy() {
            const { toyId } = this.$route.params
            this.$store.dispatch({ type: 'getById', toyId })
                .then(currToy => this.toy = currToy)
                .catch(err => console.log('cant get toy'))
        },
        async loadReviews() {
            const { toyId } = this.$route.params
            const filterBy = {
                toyId,
            }
            try {
                await this.$store.dispatch({ type: 'loadReviews', filterBy })
            }
            catch {
                console.log('cant get reviews')
            }
        },
        formatTimestamp(timestamp) {
            const date = new Date(timestamp)
            return date.toLocaleString()
        },
        removeMsg(msgId) {
            console.log(msgId);
        },
        addMsg() {
            this.$store.dispatch({ type: "addToyMsg", toyId: this.toy._id, msg: this.msg })
            this.msg = ''
        },
        addReview() {
            this.$store.dispatch({ type: "addToyreview", toyId: this.toy._id, review: this.review })
            this.review = ''
        }
    },
    computed: {
        formattedCreatedAt() {
            if (this.toy && this.toy.createdAt) {
                return this.formatTimestamp(this.toy.createdAt)
            }
            return ''
        },
        currToyMsgs() {
            return this.$store.getters.currToyMsgs
        },
        reviews() { return this.$store.getters.reviews }
    }
}
</script>

