<template>
    <div class="player-details">
        <div class="player-card">
            <img :src="getImgUrl(playerInfo.team?.id)" alt="Team Logo" />
            <div class="basic-info">
                <h3>
                    {{
                        playerInfo.team?.full_name + " | " + playerInfo.position
                    }}
                </h3>
                <h1>{{ playerInfo.first_name }}</h1>
                <h1>{{ playerInfo.last_name }}</h1>
            </div>
            <div class="body-info">
                <h4>HEIGHT:</h4>
                <h2>
                    {{
                        playerInfo.height_feet +
                        '" ' +
                        playerInfo.height_inches +
                        "'"
                    }}
                </h2>
                <h4>WEIGHT:</h4>
                <h2>{{ playerInfo.weight_pounds + " lbs" }}</h2>
            </div>
        </div>
        <div class="seasons">
            <h3>SEASON</h3>
            <select v-model="season" @change="getPlayerDetails()">
                <option
                    v-for="year in Array.from(
                        { length: new Date().getFullYear() - 1980 },
                        (value, index) => 2021 - index
                    )"
                    :value="year"
                    :key="year"
                >
                    {{ year }}
                </option>
            </select>
        </div>
        <div class="table-div">
            <div style="overflow: auto; border-radius: 20px;">
                <table v-if="playerDetail.length">
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>VERSUS</th>
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
                        <tr class="avg-row">
                            <td>AVERAGE</td>
                            <td colspan="2">
                                {{ playerDetail.length + " MATCHES" }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.pts;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.ast;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.reb;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.dreb;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.oreb;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.blk;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.stl;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fgm;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fga;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fg_pct;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fg3m;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fg3a;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fg3_pct;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.ftm;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fta;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.ft_pct;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.turnover;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.pf;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                        </tr>
                        <tr
                            class="match-row"
                            v-for="(match, index) in playerDetail"
                            :key="index"
                            @click="matchDetail(match.game.id)"
                        >
                            <td>
                                {{
                                    (
                                        "0" +
                                        new Date(match.game.date).getDate()
                                    ).slice(-2) +
                                    "/" +
                                    (
                                        "0" +
                                        (new Date(match.game.date).getMonth() +
                                            1)
                                    ).slice(-2)
                                }}
                            </td>
                            <td>
                                <div class="versus-text">
                                    {{
                                        match.game.visitor_team_id ===
                                        match.team.id
                                            ? "@"
                                            : "vs"
                                    }}
                                </div>
                                <img
                                    :src="
                                        getImgUrl(
                                            match.game.visitor_team_id ===
                                                match.team.id
                                                ? match.game.home_team_id
                                                : match.game.visitor_team_id
                                        )
                                    "
                                    width="40"
                                    height="30"
                                    :alt="
                                        match.game.visitor_team_id ===
                                        match.team.id
                                            ? match.game.home_team_id
                                            : match.game.visitor_team_id
                                    "
                                />
                            </td>
                            <td>{{ match.min }}</td>
                            <td>{{ match.pts }}</td>
                            <td>{{ match.ast }}</td>
                            <td>{{ match.reb }}</td>
                            <td>{{ match.dreb }}</td>
                            <td>{{ match.oreb }}</td>
                            <td>{{ match.blk }}</td>
                            <td>{{ match.stl }}</td>
                            <td>{{ match.fgm }}</td>
                            <td>{{ match.fga }}</td>
                            <td>{{ match.fg_pct }}</td>
                            <td>{{ match.fg3m }}</td>
                            <td>{{ match.fg3a }}</td>
                            <td>{{ match.fg3_pct }}</td>
                            <td>{{ match.ftm }}</td>
                            <td>{{ match.fta }}</td>
                            <td>{{ match.ft_pct }}</td>
                            <td>{{ match.turnover }}</td>
                            <td>{{ match.pf }}</td>
                        </tr>
                        <tr class="avg-row">
                            <td>AVERAGE</td>
                            <td></td>
                            <td></td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.pts;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.ast;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.reb;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.dreb;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.oreb;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.blk;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.stl;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fgm;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fga;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fg_pct;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fg3m;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fg3a;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fg3_pct;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.ftm;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.fta;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.ft_pct;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.turnover;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        playerDetail.reduce(function (
                                            sum,
                                            player
                                        ) {
                                            return sum + player.pf;
                                        },
                                        0) / playerDetail.length
                                    ).toFixed(1)
                                }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 v-if="!playerDetail.length">
                PLAYER HAS NO MATCHES IN THIS SEASON!
            </h3>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
    name: 'PlayerDetail',
    data() {
        return {
            playerDetailsPlayoffs: [],
            playerDetails: [],
            playerInfos: [],
            season: '2021',
        }
    },
    computed: {
        playerDetail(): any {
            return this.playerDetails;
        },
        playerDetailsPlayoff() {
            return this.playerDetailsPlayoffs;
        },
        playerInfo() {
            return this.playerInfos;
        },
    },
    methods: {
        getImgUrl(id: number): any {
            if (id) {
                return require('@/assets/teamLogos/team_' + id + '.png');
            }
        },
        matchDetail(id: number): void {
            store.commit("setMatchId", id);
            this.$router.push('/match-detail');
        },
        async getPlayerInfo() {
            await store.dispatch('getPlayerInfo').then((response: any) => {
                this.playerInfos = response;
            });
        },
        async getPlayerDetails() {
            await store.dispatch('getPlayerDetails', this.season).then(() => {
                this.playerDetails = store.getters.playerDetails;
                this.playerDetailsPlayoffs = store.getters.playerDetailsPlayoffs;
            });
        }
    },
    async beforeMount() {
        this.getPlayerDetails();
        this.getPlayerInfo();
    }
});
</script>
<style lang="less" scoped>
.player-details {
    .player-card {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-evenly;
        background: #002a46;
        color: #fff;
        padding: 50px 0;
        font-size: 20px;
        border-bottom-left-radius: 35%;
        border-bottom-right-radius: 35%;
        img {
            margin: 0 auto;
            max-width: 300px;
            max-height: 250px;
            min-width: 200px;
            min-height: 150px;
            flex-basis: 500px;
        }
        div {
            width: 300px;
            margin: 0 auto;
            text-align: left;
        }
    }
    .seasons {
        margin: 30px 0;
        h3 {
            display: inline;
        }
        select {
            outline: none;
            border: none;
            width: 70px;
            font-size: 20px;
            cursor: pointer;
        }
    }
    .versus-text {
        float: left;
        margin: 5px auto;
    }
    .table-div {
        width: 75%;
        margin: 25px auto;
        padding: 30px;
        border-radius: 20px;
        overflow: auto;
        background: #002a46;
        color: #fff;
        border-radius: 20px;
    }
    table {
        width: 100%;
        line-height: 20px;
        text-align: right;
        border-collapse: collapse;
        span {
            flex-grow: 0;
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            text-align: left;
        }
        thead {
            background: #006db4;
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
        }
        .avg-row {
            background: #006db4;
            &:nth-child(1) {
                text-align: center;
            }
        }
        .match-row {
            transition: all 0.7s;
            &:hover {
                cursor: pointer;
                background: #006db4;
                color: #fff;
            }
        }
    }
    @media screen and (max-width: 772px) {
        .player-card {
            flex-direction: column;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            div {
                text-align: center;
            }
        }
    }
}
</style>
