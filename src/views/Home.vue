<template>
  <div class="home">
    <HomeData :lastWeekMatches="lastWeekMatches" :upcomingMatches="upcomingMatches"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HomeData from '@/components/HomeData.vue'; // @ is an alias to/src

@Options({
  computed: {
    lastWeekMatches(){
      return this.$store.getters.lastWeekMatches.data.filter((match:any) => match.status === 'Final').sort((match1:any, match2:any) => match2.id - match1.id).slice(0,34)
    },
    upcomingMatches(){
      return this.$store.getters.lastWeekMatches.data.filter((match:any) => match.status !== 'Final')
    },    
  },
  components: {
    HomeData,
  },
  beforeMount() {
    this.$store.dispatch('getLastWeekMatches');
  },
  mounted() {
    // console.log(this.lastWeekMatches);
  }
})
export default class Home extends Vue {
}
</script>
