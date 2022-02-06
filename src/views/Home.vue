<template>
  <div class="home">
    <HomeCarousel :lastWeekMatches="lastWeekMatches"/>
    <LiveMatches :liveMatches="liveMatches"/>
    <UpcomingMatches :upcomingMatches="upcomingMatches"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HomeCarousel from '@/components/Home/HomeCarousel.vue';
import UpcomingMatches from '@/components/Home/UpcomingMatches.vue';
import LiveMatches from '@/components/Home/LiveMatches.vue';
import { useStore } from "vuex";

@Options({
  data() {
    return {
      lastWeekMatches: [],
      upcomingMatches: [],
      liveMatches: [],
    }
  },
  components: {
    HomeCarousel,
    UpcomingMatches,
    LiveMatches,
  },
})
export default class Home extends Vue {
  private store = useStore();
  public lastWeekMatches = [];
  public upcomingMatches = [];
  public liveMatches = [];
  async beforeMount() {
    await this.store.dispatch('getLastWeekMatches').then(() => {
      this.lastWeekMatches = this.store.getters.lastWeekMatches.data.filter((match:any) => match.status === 'Final').sort((match1:any, match2:any) => match2.id - match1.id).slice(0,35)
      this.upcomingMatches = this.store.getters.lastWeekMatches.data.filter((match:any) => match.status !== 'Final' && match.status.includes('ET')).sort((match1:any, match2:any) => match1.id - match2.id)
      this.liveMatches = this.store.getters.lastWeekMatches.data.filter((match:any) => match.status !== 'Final' && !match.status.includes('ET')).sort((match1:any, match2:any) => match1.id - match2.id)
    })
  }
}
</script>
