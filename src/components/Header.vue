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
    height: 50px;
    text-align: right;
    font-size: 24px;
    color: #006db4;
    width: 75%;
    margin: 0 auto;
    border-bottom: 2px solid #006db4;
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
        color: #006db4;
        border-right: 2px solid #006db4;
        transition: all .5s;
        &:hover {
            color: #fff;
            background: #006db4;
        }
    }
}
</style>
