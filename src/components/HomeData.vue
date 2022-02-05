<template>
    <div class="homeData">
        <div class="matches-carousel" ref="matchesCarousel">
            <button
                class="nav-button prev-button"
                v-show="transformAmount !== 0"
                @click="previousCarousel()"
            >
                <svg
                    role="presentation"
                    dir="left"
                    class="Icon_icon__2NnUo mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    height="14"
                    width="8"
                    viewBox="0 0 8 14"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        d="M6.5 1.6L1.5 7l5 5.4"
                    ></path>
                </svg>
            </button>
            <div class="card-wrapper" :style="{ transform: computedTransform }">
                <div
                    class="card"
                    v-for="match in lastWeek"
                    :key="match.id"
                    @click="matchDetail(match.id)"
                >
                    <div class="match-date">
                        {{
                            ("0" + new Date(match.date).getDate()).slice(-2) +
                            "-" +
                            ("0" + (new Date(match.date).getMonth() + 1)).slice(
                                -2
                            ) +
                            "-" +
                            new Date(match.date).getFullYear()
                        }}
                    </div>
                    <div class="scores">
                        <div class="row">
                            <div class="logo">
                                <img
                                    :src="getImgUrl(match.home_team.id)"
                                    width="20"
                                    height="20"
                                    :alt="match.home_team.abbreviation"
                                />
                            </div>
                            <div class="abbr">
                                {{ match.home_team.abbreviation }}
                            </div>
                            <div class="score">
                                {{ match.home_team_score }}
                            </div>
                        </div>
                        <div class="row">
                            <div class="logo">
                                <img
                                    :src="getImgUrl(match.visitor_team.id)"
                                    width="20"
                                    height="20"
                                    v-bind:alt="match.visitor_team.abbreviation"
                                />
                            </div>
                            <div class="abbr">
                                {{ match.visitor_team.abbreviation }}
                            </div>
                            <div class="score">
                                {{ match.visitor_team_score }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                class="nav-button next-button"
                v-show="transformAmount !== 4500"
                @click="nextCarousel()"
            >
                <svg
                    role="presentation"
                    dir="right"
                    class="Icon_icon__2NnUo mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    height="14"
                    width="8"
                    viewBox="0 0 8 14"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        d="M6.5 1.6L1.5 7l5 5.4"
                    ></path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: ["lastWeekMatches", "upcomingMatches"],
    data() {
        return {
            transformCarousel: "translateX(0)",
            transformAmount: 0,
        };
    },
    computed: {
        computedTransform() {
            return this.transformCarousel;
        },
        lastWeek() {
            return this.lastWeekMatches;
        },
        upcoming() {
            return this.upcomingMatches;
        },
    },
    methods: {
        nextCarousel() {
            if (this.transformAmount === 4500) return;
            this.transformAmount = this.transformAmount + 1500;
            this.transformCarousel =
                "translateX(-" + this.transformAmount + "px)";
        },
        previousCarousel() {
            if (this.transformAmount === 0) return;
            this.transformAmount = this.transformAmount - 1500;
            this.transformCarousel =
                "translateX(-" + this.transformAmount + "px)";
        },
        getImgUrl(id: number) {
            return require("@/assets/teamLogos/team_" + id + ".png");
        },
        matchDetail(id: number) {
            this.$store.commit("setMatchId", id);
            this.$router.push({ name: "MatchDetail" });
        },
    },
    mounted() {
        // this.maxWidth = (this.$refs['matchesCarousel'] as any).clientWidth;
    },
})
export default class HomeData extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.matches-carousel {
    position: relative;
    border-top: 2px solid rgb(184, 184, 184);
    border-bottom: 2px solid rgb(184, 184, 184);
    margin-top: 10px;
    .nav-button {
        position: absolute;
        top: 50%;
        text-align: center;
        border: none;
        border-radius: 50%;
        outline: none;
        color: #0268d6;
        background: rgba(255, 255, 255, 0.7);
        height: 40px;
        width: 40px;
        transform: translateY(-50%);
        z-index: 90;
        cursor: pointer;
        &:hover {
            color: #fff;
            background: #0268d6;
        }
        &.prev-button {
            left: 10px;
        }
        &.next-button {
            right: 10px;
            .Icon_icon__2NnUo[dir="right"] {
                transform: rotate(180deg);
            }
        }
    }
    .card-wrapper {
        transform: translateX(0px);
        display: flex;
        width: 100%;
        flex-direction: row;
        flex-wrap: nowrap;
        transition: all 0.4s;
        transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
        height: 100px;
        .card {
            margin: 10px 0;
            border-right: 1px solid rgb(184, 184, 184);
            padding: 10px;
            flex-basis: 160px;
            flex-grow: 0;
            flex-shrink: 0;
            cursor: pointer;
            .match-date {
                text-align: left;
            }
            .scores {
                margin-top: 10px;
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
                .row {
                    display: flex;
                    flex: 1;
                    .abbr {
                        padding-left: 5px;
                        flex: 1 1;
                        text-align: left;
                        font-weight: 700;
                        margin-top: 3px;
                    }
                }
            }
        }
    }
}
</style>
