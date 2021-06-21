<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <LoginPage v-if="!$root.store.username"></LoginPage>
    <FavoriteMatches v-else></FavoriteMatches>
    <LeagueInfo></LeagueInfo>
  </div>
</template>

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
</style>
