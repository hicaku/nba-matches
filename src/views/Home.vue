<template>
  <div class="home">
    <HomeData :lastWeekMatches="lastWeekMatches" :upcomingMatches="upcomingMatches"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HomeData from '@/components/HomeData.vue'; // @ is an alias to/src

@Options({
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
})
export default class Home extends Vue {
}
</script>
