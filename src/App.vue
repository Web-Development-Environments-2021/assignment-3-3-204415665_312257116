<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Kroos Control</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!------- AllUserPages ------->
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
          
          <!------- unionAgentPages ------->
          <b-navbar-nav class="ml-auto" v-if="$root.store.username == 'daniMoshe'">
            <b-nav-item :to="{name: 'leagueManagement' }">League management</b-nav-item>
          </b-navbar-nav>
            
        </b-navbar-nav>

        <!------- NonUserPages ------->
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <template #button-content>
            <em>Welcome {{ $root.store.username }}</em>
          </template>
          <b-dropdown-item href="#">Favorites</b-dropdown-item>
          <b-dropdown-item href="#"  @click="Logout()">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  <!-- <UrlNavigator @Logout="Logout" /> -->
  <!-- <br /> -->
  </div>
</template>

<script>
// import UrlNavigator from "./components/UrlNavigator.vue";

export default {
  name: "App",
  //   components: {
  //   UrlNavigator,
  // },
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
