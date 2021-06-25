<template>
  <div id="navigatorbar">
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
          <em>Hello guest</em>
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
  </div>
</template>

<script>
export default {
  name: "NavigatorBar",
  components:{
  
  },
  methods: {
    Logout(){
      this.$emit("Logout");
    }
  }
};
</script>

<style lang="scss">
@import "../scss/form-style.scss";
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