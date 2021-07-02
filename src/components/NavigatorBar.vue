<template>
  <div id="navigatorbar">
    <div class="upper"></div>

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
          <div class="div-dropdown">
            <b-dropdown-item class="nav-dropdown-item" href="#" :to="{ name:'favoriteMatches'}"><em><b-icon class="nav-icon" icon="hand-thumbs-up" aria-hidden="true"></b-icon>Favorites Matches</em></b-dropdown-item>
            <b-dropdown-item class="nav-dropdown-item" href="#" @click="Logout()"><em><b-icon class="nav-icon" icon="power" aria-hidden="true"></b-icon>Log Out</em></b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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

  .navbar {
    padding: 0px!important;
  }

  nav a {
    font-weight: bold;
    color: #696969;
    padding: 10px;
  }

  em {
    font-weight: bold;
    padding: 7.5px;
    color: #E0FBFC;
  }
  .navbar.navbar-dark.bg-dark{
      background-color: #293241!important;

  }
  nav a.router-link-exact-active {
    color: #e7b4a5!important;
  }
  .upper{
    margin: auto;
    padding: 3px;
    text-align: center;
    background: #ee6c4d;
  }
  .nav-dropdown-item{
    text-align: center!important;
    width: 200px;
    background-color: #293241!important;
    font-weight: bold!important;
    padding: 10px;
  }
  .nav-dropdown-item:hover{
    text-align: center!important;
    width: 200px;
    background-color: #293241!important;
    font-weight: bold!important;
    padding: 10px;
  }

  .nav-icon{
    position: absolute!important;
    left: 10px!important;
    width: 20px!important;
    
  }
</style>