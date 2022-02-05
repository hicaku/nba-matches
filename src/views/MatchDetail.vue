<template>
    <div class="match-detail">
        {{ matchId }}
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    computed: {
        matchId() {
            return this.$store.getters.matchId;
        }
    },
})
export default class Home extends Vue {}
</script>
