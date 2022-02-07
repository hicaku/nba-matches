<template>
    <div class="home">
        <HomeCarousel :lastWeekMatches="lastWeekMatches" />
        <LiveMatches :liveMatches="liveMatches" />
        <UpcomingMatches :upcomingMatches="upcomingMatches" />
    </div>
</template>

<script lang="ts">
import HomeCarousel from '@/components/Home/HomeCarousel.vue';
import UpcomingMatches from '@/components/Home/UpcomingMatches.vue';
import LiveMatches from '@/components/Home/LiveMatches.vue';
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
    name: 'Home',
    components: {
        HomeCarousel,
        UpcomingMatches,
        LiveMatches,
    },
    data() {
        return {
            lastWeekMatches: [],
            upcomingMatches: [],
            liveMatches: [],
        }
    },
    async beforeMount() {
        await store.dispatch('getLastWeekMatches').then(() => {
            this.lastWeekMatches = store.getters.lastWeekMatches.data.filter((match: any) => match.status === 'Final').sort((match1: any, match2: any) => match2.id - match1.id).slice(0, 35)
            this.upcomingMatches = store.getters.lastWeekMatches.data.filter((match: any) => match.status !== 'Final' && match.status.includes('ET')).sort((match1: any, match2: any) => match1.id - match2.id)
            this.liveMatches = store.getters.lastWeekMatches.data.filter((match: any) => match.status !== 'Final' && !match.status.includes('ET')).sort((match1: any, match2: any) => match1.id - match2.id)
        })
    }
})

</script>
