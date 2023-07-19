<template v-if="toys">
  <BarChart :chartData="testData" />
</template> 

<script >
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default{
  name: 'Home',
  components: { BarChart },
  data(){
    return {
        toys:null,

        testData:{
                   labels: [],
                   datasets: [
        {
            data: [],
            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    }
    }
  },
created(){
    this.$store.dispatch({type: 'getAllToys'}).then((toys)=>{
    this.toys=toys
    this.calcAvgPricePerLabel()
}
    )
   
},

methods:{

    calcAvgPricePerLabel() {
  const pricesPerLabel = this.toys.reduce((acc, toy) => {
    toy.labels.forEach((label) => {
      acc[label] = acc[label] || { sum: 0, count: 0 }
      acc[label].sum += toy.price
      acc[label].count++
    })
    return acc
  }, {})

  let labels = []
  let avgPrice = []

    for (const label in pricesPerLabel) {
    const { sum, count } = pricesPerLabel[label]
    labels.push(label)
    avgPrice.push(sum / count)    
  }
 
  this.testData.labels = labels
  this.testData.datasets[0].data = avgPrice
}



}



}

</script>