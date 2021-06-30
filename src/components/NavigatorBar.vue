<template>
  <div id="navigatorbar">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand :to="{ name: 'main' }">Kroos Control</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!------- All User Pages ------->
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name:'currentStageMatches'}">Current Stage Matches</b-nav-item>
          <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
 

          <!------- union Agent Pages ------->
          <b-navbar-nav class="ml-auto" v-if="$root.store.username == 'daniMoshe'">
            <b-nav-item :to="{name: 'leagueManagement' }">League management</b-nav-item>
          </b-navbar-nav>
            
        </b-navbar-nav>

        <!------- Non User Pages ------->
        <b-navbar-nav class="ml-auto item" v-if="!$root.store.username">
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
          <template>
          <em>Hello guest</em>

          </template>
        </b-navbar-nav>

        <!------- login User Pages ------->
        <b-navbar-nav class="ml-auto" v-else>
          <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->
        <b-nav-item-dropdown right>
          <template #button-content>
            <em>Welcome {{ $root.store.username }}
            <b-avatar variant="success" :text="$root.store.username.slice(0, 2)"></b-avatar>
            </em>

          </template>
          <b-dropdown-item href="#" :to="{ name:'favoriteMatches' }">Favorites Matches</b-dropdown-item>
          <b-dropdown-item href="#" @click="Logout()">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavigatorBar",
  data(){
  },
  components:{
  
  },
  methods: {
    Logout(){
      this.$emit("Logout");
    }
  }
};
</script>

<style>
b nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #696969;
}

em {
  font-weight: bold;
  padding: 7.5px;
  color: #ffffff;
}
 .navbar.navbar-dark.bg-dark{
    background-color: #0070a3!important;
 }
nav a.router-link-exact-active {
  color: #000000!important;
}

</style>