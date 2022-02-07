<template>
    <div class="upcoming-matches">
        <div class="upcoming-list">
            <h3>Upcoming Matches</h3>
            <div
                class="upcoming-match"
                v-for="match in upcomingMatches"
                :key="match.id"
            >
                <span class="date">
                    {{
                        ("0" + new Date(match.date).getDate()).slice(-2) +
                        "/" +
                        ("0" + (new Date(match.date).getMonth() + 1)).slice(-2)
                    }}
                </span>
                <img
                    :src="getImgUrl(match.home_team.id)"
                    width="30"
                    height="30"
                    :alt="match.home_team.abbreviation"
                />
                <h3 class="name">{{ match.home_team.full_name }}</h3>
                <div class="versus">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        viewBox="0 0 224.88 375"
                        height="50"
                        version="1.0"
                    >
                        <defs>
                            <clipPath id="a">
                                <path
                                    d="M 0 0.101562 L 224 0.101562 L 224 374.898438 L 0 374.898438 Z M 0 0.101562"
                                />
                            </clipPath>
                        </defs>
                        <g clip-path="url(#a)">
                            <path
                                class="svg-line"
                                d="M 205.320312 0.101562 L 0.144531 374.898438 L 18.773438 374.898438 L 223.949219 0.101562 L 205.320312 0.101562"
                            />
                        </g>
                        <path
                            class="svg-line"
                            d="M 193.011719 187.5 C 193.011719 232.269531 156.761719 268.566406 112.046875 268.566406 C 67.332031 268.566406 31.082031 232.269531 31.082031 187.5 C 31.082031 142.730469 67.332031 106.433594 112.046875 106.433594 C 156.761719 106.433594 193.011719 142.730469 193.011719 187.5"
                        />
                        <path
                            class="svg-text"
                            d="M 68.148438 218.839844 L 58.730469 158.316406 L 74.875 158.316406 L 78.015625 181.664062 C 78.910156 188.578125 80.835938 200.996094 80.835938 200.996094 C 84.28125 193.953125 87.25 188.578125 90.480469 182.113281 L 102.140625 158.316406 L 120.074219 158.316406 L 87.25 218.839844 L 68.148438 218.839844"
                        />
                        <path
                            class="svg-text"
                            d="M 119.53125 200.789062 C 123.746094 203.214844 129.847656 205.1875 136.574219 205.1875 C 140.785156 205.1875 144.734375 203.753906 144.734375 200.339844 C 144.734375 197.554688 141.863281 195.941406 136.210938 193.515625 C 130.023438 190.914062 121.59375 186.242188 121.59375 176.722656 C 121.59375 163.613281 133.792969 156.160156 148.320312 156.160156 C 157.289062 156.160156 162.042969 157.867188 165.359375 159.394531 L 160.25 172.683594 C 158.1875 171.605469 152.804688 169.632812 146.976562 169.808594 C 141.144531 169.808594 138.726562 171.875 138.726562 173.941406 C 138.726562 177.082031 143.835938 179.058594 148.230469 181.035156 C 156.210938 184.535156 162.042969 189.386719 162.042969 197.46875 C 162.042969 212.734375 148.5 218.839844 134.507812 218.839844 C 124.195312 218.839844 117.378906 216.144531 113.882812 213.71875 L 119.53125 200.789062"
                        />
                    </svg>
                </div>
                <img
                    :src="getImgUrl(match.visitor_team.id)"
                    width="30"
                    height="30"
                    :alt="match.visitor_team.abbreviation"
                />
                <h3 class="name">{{ match.visitor_team.full_name }}</h3>
                <span class="status">{{ match.status }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UpcomingMatches',
    props: ['upcomingMatches'],
    methods: {
        getImgUrl(id: number): any {
            return require("@/assets/teamLogos/team_" + id + ".png");
        }
    },
})

</script>
<style lang="less" scoped>
.upcoming-list {
    overflow: hidden;
    margin: 35px auto;
    color: #006db4;
    .upcoming-match {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-evenly;
        align-items: stretch;
        width: 75%;
        min-width: 475px;
        margin: 0 auto;
        border: 1px solid #fff;
        border-radius: 25px;
        background: #006db4;
        color: #fff;
        span,
        h3 {
            flex-grow: 0;
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            text-align: left;
        }
        span {
            padding: 20px;
            word-break: keep-all;
        }
        .status {
            flex-basis: 10%;
        }
        .date {
            flex-basis: 5%;
        }
        div,
        h3 {
            flex-basis: 20%;
        }
        .date {
            border-right: 1px solid #fff;
        }
        .status {
            border-left: 1px solid #fff;
            text-align: right;
        }
        img {
            margin: auto 0;
        }
        .versus {
            svg {
                height: 100%;
            }
            .svg- {
                &line {
                    fill: #fff;
                }
                &text {
                    fill: #006db4;
                }
            }
        }
    }
}
</style>
