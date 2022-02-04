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
                <div class="card" v-for="match in lastWeek" :key="match.id">
                    <div class="scores">
                        <table>
                            <tr>
                                <td colspan="2">
                                    {{
                                        (
                                            "0" + new Date(match.date).getDate()
                                        ).slice(-2) +
                                        "-" +
                                        (
                                            "0" +
                                            (new Date(match.date).getMonth() +
                                                1)
                                        ).slice(-2) +
                                        "-" +
                                        new Date(match.date).getFullYear()
                                    }}
                                </td>
                            </tr>
                            <tr>
                                <td><b>{{ match.home_team.full_name }}</b></td>
                                <td>{{ match.home_team_score }}</td>
                            </tr>
                            <tr>
                                <td><b>{{ match.visitor_team.full_name }}</b></td>
                                <td>{{ match.visitor_team_score }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <button
                class="nav-button next-button"
                v-show="transformAmount !== 7500"
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
            lastWeek: this.lastWeekMatches,
            upcoming: this.upcomingMatches,
            transformCarousel: "translateX(0)",
            transformAmount: 0,
        };
    },
    computed: {
        computedTransform() {
            return this.transformCarousel;
        },
    },
    methods: {
        nextCarousel() {
            if (this.transformAmount === 9000) return;
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
            flex-basis: 250px;
            flex-grow: 0;
            flex-shrink: 0;
            h5 {
                margin: 0;
            }
            .scores {
                table {
                  width: 100%;
                  tr{
                    width: 100%;
                    td:first-child {
                        float: left;
                    }
                    td:nth-child(2) {
                        float: right;
                    }
                  }
                }
            }
        }
    }
}
</style>
