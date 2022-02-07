<template>
    <div>
        <Header />
        <router-view />
    </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
    components: {
        Header,
    },
});
</script>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap");

html,
body {
    font-family: "Rubik", sans-serif;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    background: #f6f6f6;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
