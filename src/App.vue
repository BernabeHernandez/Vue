<template>
  <div id="app">
    <AppHeader @navigate="navigate" />
    <main>
      <router-view></router-view> 
    </main>
    <AppFooter /> 
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'; 
import AppFooter from './components/AppFooter.vue'; 

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  methods: {
    navigate(page) {
      this.$router.push(`/${page.toLowerCase().replace(' ', '-')}`); 
    },
  },
};
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}

main {
  flex: 1; 
  padding: 60px 20px 100px; 
}

</style>
