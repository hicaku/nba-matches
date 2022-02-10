<template>
    <div class="nav">
        <router-link to="/"
            ><img src="@/assets/logo.png" alt="NBA" width="100" height="50"
        /></router-link>
        <router-link to="/"><span>Home</span></router-link>
        <!-- <router-link to="/latest-matches"
            ><span>Latest Matches</span></router-link
        > -->
    </div>
</template>
<style lang="less" scoped>
.nav {
    text-align: right;
    font-size: 2.6em;
    color: #002a46;
    width: 75%;
    margin: 0 auto;
    img {
        float: left;
        margin-left: 20px;
    }
    span {
        height: 50px;
        display: inline-flex;
        align-items: center;
        margin: auto 20px;
    }
    a {
        text-decoration: none;
        color: #002a46;
        border-right: 2px solid #002a46;
        transition: all .5s;
        &:hover {
            color: #fff;
            background: #002a46;
        }
    }
}
</style>
