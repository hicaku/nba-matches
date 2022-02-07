<template>
    <div class="match-details">
        <div class="score-card">
            <div class="home">
                <img
                    :src="getImgUrl(matchDetail.home_team?.id)"
                    width="225"
                    height="150"
                    :alt="matchDetail.home_team?.abbreviation"
                /><br /><br />
                <h2 class="name">{{ matchDetail.home_team?.name }}</h2>
            </div>
            <h1 class="score">{{ matchDetail.home_team_score }}</h1>
            <h3 class="divider">FINAL</h3>
            <h1 class="score">{{ matchDetail.visitor_team_score }}</h1>
            <div class="away">
                <img
                    :src="getImgUrl(matchDetail.visitor_team?.id)"
                    width="225"
                    height="150"
                    :alt="matchDetail.visitor_team?.abbreviation"
                /><br /><br />
                <h2 class="name">{{ matchDetail.visitor_team?.name }}</h2>
            </div>
        </div>
        <div class="box-score-card">
            <div class="filteringFields">
                <input
                    type="radio"
                    name="teamSide"
                    id="allLabel"
                    :value="-1"
                    v-model="teamOnBoxScore"
                />
                <label for="allLabel"> All </label>
                <input
                    type="radio"
                    name="teamSide"
                    id="homeLabel"
                    :value="matchDetail.home_team?.id"
                    v-model="teamOnBoxScore"
                />
                <label for="homeLabel">{{
                    matchDetail.home_team?.full_name
                }}</label>
                <input
                    type="radio"
                    name="teamSide"
                    id="visitorLabel"
                    :value="matchDetail.visitor_team?.id"
                    v-model="teamOnBoxScore"
                />
                <label for="visitorLabel">{{
                    matchDetail.visitor_team?.full_name
                }}</label>
            </div>
            <div style="overflow: auto">
                <table>
                    <thead>
                        <tr>
                            <th>PLAYER</th>
                            <th>MIN</th>
                            <th>PTS</th>
                            <th>AST</th>
                            <th>REB</th>
                            <th>DREB</th>
                            <th>OREB</th>
                            <th>BLK</th>
                            <th>STL</th>
                            <th>FGM</th>
                            <th>FGA</th>
                            <th>FG%</th>
                            <th>3PM</th>
                            <th>3PA</th>
                            <th>3PT%</th>
                            <th>FTM</th>
                            <th>FTA</th>
                            <th>FT%</th>
                            <th>TUR</th>
                            <th>PF</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(player, index) in boxScoreFiltered.sort(
                                (player1, player2) =>
                                    player2.min
                                        ?.split(':')
                                        .reduce((s, t) => s * 60 + +t, 0) -
                                    player1.min
                                        ?.split(':')
                                        .reduce((s, t) => s * 60 + +t, 0)
                            )"
                            :key="index"
                        >
                            <td @click="playerDetail(player.player.id)">
                                <div class="player-name">
                                    {{
                                        player.player.first_name +
                                        " " +
                                        player.player.last_name
                                    }}
                                    <span class="position">{{
                                        player.player.position
                                    }}</span>
                                </div>
                            </td>
                            <td>
                                {{
                                    player.min === "" || player.min === "0:00"
                                        ? "DNP"
                                        : player.min
                                }}
                            </td>
                            <td>{{ player.pts }}</td>
                            <td>{{ player.ast }}</td>
                            <td>{{ player.reb }}</td>
                            <td>{{ player.dreb }}</td>
                            <td>{{ player.oreb }}</td>
                            <td>{{ player.blk }}</td>
                            <td>{{ player.stl }}</td>
                            <td>{{ player.fgm }}</td>
                            <td>{{ player.fga }}</td>
                            <td>{{ player.fg_pct }}</td>
                            <td>{{ player.fg3m }}</td>
                            <td>{{ player.fg3a }}</td>
                            <td>{{ player.fg3_pct }}</td>
                            <td>{{ player.ftm }}</td>
                            <td>{{ player.fta }}</td>
                            <td>{{ player.ft_pct }}</td>
                            <td>{{ player.turnover }}</td>
                            <td>{{ player.pf }}</td>
                        </tr>
                        <tr>
                            <th>TOTALS</th>
                            <th></th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.pts;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.ast;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.reb;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.dreb;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.oreb;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.blk;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.stl;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.fgm;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.fga;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    (
                                        boxScoreFiltered.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fg_pct;
                                        },
                                        0) / boxScoreFiltered.length
                                    ).toFixed(1)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.fg3m;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.fg3a;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    (
                                        boxScoreFiltered.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fg3_pct;
                                        },
                                        0) / boxScoreFiltered.length
                                    ).toFixed(1)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.ftm;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.fta;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    (
                                        boxScoreFiltered.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.ft_pct;
                                        },
                                        0) / boxScoreFiltered.length
                                    ).toFixed(1)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.turnover;
                                    },
                                    0)
                                }}
                            </th>
                            <th>
                                {{
                                    boxScoreFiltered.reduce(function (
                                        sum,
                                        player
                                    ) {
                                        return sum + player.pf;
                                    },
                                    0)
                                }}
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
    name: 'MatchDetail',
    data() {
        return {
            boxScore: [],
            matchDetails: [],
            teamOnBoxScore: -1,
        }
    },
    computed: {
        boxScoreFiltered(): any {
            if (this.teamOnBoxScore === -1) return this.boxScore;
            return this.boxScore.filter(
                (player: any) => player.player.team_id === this.teamOnBoxScore
            );
        },
        matchDetail() {
            return this.matchDetails;
        },
        playerInfo() {
            return this.playerInfos;
        },
    },
    methods: {
        playerDetail(id: number): void {
            store.commit("setPlayerId", id);
            this.$router.push('/player-detail');
        },
        getImgUrl(id: number): any {
            if (id) {
                return require('@/assets/teamLogos/team_' + id + '.png');
            }
        },
        async getBoxScore() {
            await store.dispatch("getBoxScore").then(() => {
                this.boxScore = store.getters.boxScore;
            });
        },
        async getMatchDetails() {
            await store.dispatch("getMatchDetails").then(() => {
                this.matchDetails = store.getters.matchDetails;
            });
        },
    },
    async beforeMount() {
        this.getBoxScore();
        this.getMatchDetails();
    }
})
</script>
<style lang="less" scoped>
.score-card {
    width: 75%;
    background: #006db4;
    color: #fff;
    border-radius: 20px;
    margin: 30px auto;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    text-align: center;
    div {
        flex: 1 1;
    }
    h1,
    h3 {
        display: inline-flex;
        align-items: center;
        margin: 0 auto;
    }
    .divider {
        padding: 50px;
    }
}
.box-score-card {
    width: 75%;
    background: #006db4;
    color: #fff;
    border-radius: 20px;
    margin: 25px auto;
    padding: 30px;
    font-size: 20px;
    .filteringFields {
        text-align: left;
        margin-bottom: 20px;
        input {
            display: none;
        }
        input + label {
            display: inline-block;
            margin-top: 10px;
            margin-right: 30px;
            cursor: pointer;
            transition: all .7s linear;
            padding: 10px;
            border-top: 1px solid #006db4;
            border-bottom: 1px solid #006db4;
            border-radius: 7px;
        }
        input:checked + label {
            background: rgb(153, 194, 255);
        }
    }
    table {
        width: 100%;
        line-height: 20px;
        text-align: right;
        border-collapse: collapse;
        .player-name {
            display: inline-block;
            width: auto;
            min-width: 0;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            transition: all .7s;
            &:hover {
                color: rgb(170, 170, 170);
            }
        }
        thead {
            background: rgb(170, 170, 170);
        }
        thead,
        tbody {
            tr {
                border-bottom: 2px solid #fff;
                th:first-child,
                td:first-child {
                    text-align: left;
                    width: 100%;
                }
                th:last-child,
                td:last-child {
                    padding-right: 10px;
                }
                th,
                td {
                    padding: 15px 0 15px 30px;
                }
            }
            .position {
                color: rgb(170, 170, 170);
                margin-left: 7px;
            }
        }
    }
}
@media screen and (max-width: 972px) {
    .score-card {
        flex-direction: column;
        .name {
            display: none;
        }
    }
}
</style>
