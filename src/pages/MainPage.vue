<template>
  <div class="container">
    <b-form>
    <!-- <h1 class="title">Main Page</h1> -->
    <div class="login-css">
    <login-page class="login-css" v-if="!$root.store.username"></login-page>
    <favorite-matches v-else></favorite-matches>
    </div>

    <!-- <league-info></league-info> -->
    </b-form>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteMatches from "../components/FavoriteMatches";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    // LeagueInfo, 
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
form{
  margin: auto;
  width: 100%;
  // text-align: center;
  // background: rgba(71, 68, 68, 0.76);
  // border-radius: 30px;

  /* margin-top: 20px;  */
}
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.login-css{
  top: 0px;
  right:250px; 
  bottom: 0;
  position:absolute;

}
</style>
