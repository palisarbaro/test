<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Page from './components/TestPage.vue'
</script>

<template>
  <Page/>
</template>

<style lang="scss">
@import './vars.scss';
body {
  margin: 0px;
}
#app,body,html {
  height: 100%;
}
select{
  background: $light
}
</style>
