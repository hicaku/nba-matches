<template>
  <div class="home">
    <HomeData :lastWeekMatches="lastWeekMatches" :upcomingMatches="upcomingMatches"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HomeData from '@/components/HomeData.vue'; // @ is an alias to/src

@Options({
  // computed: {
  //   lastWeekMatches(){
  //     console.log('gg');
  //     if(!this.$store.getters.lastWeekMatches.data) return [];
  //     return this.$store.getters.lastWeekMatches.data.filter((match:any) => match.status === 'Final').sort((match1:any, match2:any) => match2.id - match1.id).slice(0,34)
  //   },
  //   upcomingMatches(){
  //     if(!this.$store.getters.lastWeekMatches.data) return [];
  //     return this.$store.getters.lastWeekMatches.data.filter((match:any) => match.status !== 'Final')
  //   },    
  // },
  data() {
    return {
      lastWeekMatches: [],
      upcomingMatches: [],
    }
  },
  components: {
    HomeData,
  },
  async beforeMount() {
    await this.$store.dispatch('getLastWeekMatches').then(() => {
      this.lastWeekMatches = this.$store.getters.lastWeekMatches.data.filter((match:any) => match.status === 'Final').sort((match1:any, match2:any) => match2.id - match1.id).slice(0,34)
      this.upcomingMatches = this.$store.getters.lastWeekMatches.data.filter((match:any) => match.status !== 'Final')
    })
  },
  mounted() {
    // console.log(this.lastWeekMatches);
  }
})
export default class Home extends Vue {
}
</script>
