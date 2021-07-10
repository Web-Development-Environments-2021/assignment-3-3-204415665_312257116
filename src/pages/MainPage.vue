<template>
  <div class="main">
    
     <!-- <div class="body">
      <section class="wrapper">
        <div class="container" > -->
            <league-info class="LInfo"></league-info>
            <b-form>
            <div class="login-div" v-if="!$root.store.username">
              <login-page /> 
            </div>  
            <div v-else class="favorite">
            <favorite-matches :display="'main'"></favorite-matches>
            </div>
            </b-form>  
            <!-- </div></section></div> -->

  </div>
</template>
    <!-- <h1 class="title">Main Page</h1> -->

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteMatches from "../components/FavoriteMatches";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteMatches
  }
};
</script>

<style lang="scss" scoped>

.title{
  margin: auto;
  color: #fff !important;
  width: 50%;
  padding: 10px;
  text-align: center;
  /* background: rgba(120, 122, 120, 0.3); */

}
.main{
  margin: auto;
  position: relative;
}
.login-div{
  position: relative;
  right: 0px;
}
.favorite{
  position: absolute;
  left: 500px;
  min-width: 1000px;
}

.LInfo{
      position: absolute;
      top: 0px;
      left:0px;
      margin: auto;
      height: 80%;
}
</style>
