<template>
  <div>
      <Header />
      <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue";

@Options({
    components: {
        Header,
    },
})
export default class App extends Vue {}
</script>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap");

html,
body {
    font-family: "Rubik", sans-serif;
    padding: 0;
    margin: 0;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
