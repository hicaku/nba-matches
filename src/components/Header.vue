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
    background: rgb(184, 184, 184);
    height: 50px;
    text-align: right;
    font-size: 24px;
    padding-right: 20px;
    color: #fff;
    width: 100%;
    border-bottom: 2px solid #b8b8b8;
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
        color: #fff;
        border-right: 1px solid #fff;
        &:hover {
          color: #006DB4
        }
    }
}
</style>
