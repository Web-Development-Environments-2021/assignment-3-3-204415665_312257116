<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">

    </b-navbar>
    <NavigatorBar @Logout="Logout" />
    <router-view />

  <!-- <br /> -->
  </div>
</template>

<script>
import NavigatorBar from "./components/NavigatorBar.vue";

export default {
  name: "App",
    components: {
    NavigatorBar
  },
  methods: {
    // ------------------------ Logout ------------------------ //
    async Logout() {
      try{
        this.axios.defaults.withCredentials = true; //{ withCredentials: true }
        const res = await this.axios.post(this.$root.store.serverUrl + "Logout");
        console.log(res);
        this.$root.store.logout();
        this.axios.defaults.withCredentials = false;
        this.$root.toast("Logout", "User logged out successfully", "success");
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
      catch(error){
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
