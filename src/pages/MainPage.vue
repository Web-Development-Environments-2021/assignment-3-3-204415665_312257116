<template>
  <div class="main">
    
     <!-- <div class="body">
      <section class="wrapper">
        <div class="container" > -->
            <b-form>
            <div v-if="!$root.store.username">
              <login-page /> 
            </div>  
            <favorite-matches :display="'main'" v-else></favorite-matches>
            </b-form>  
            <league-info class="LInfo"></league-info>
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
// .login-box {
//     width: 100%;
//     height: 100%;
//     position: absolute;
// }

// .login-snip {
//     width:100%;
//     height: 100%;
//     position: absolute;
//     padding: 30px 80px 0px 80px;
//     background: #293241e0;
//     margin: auto;
// }
// .login-card {
//     width: 400px;
//     min-height:674px;
//     left: 0px;
//     position: absolute;
// }
.LInfo{
      position: absolute;
      top: 0px;
      right:0px;
      margin: auto;
}
</style>
