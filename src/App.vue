<template>
  <div id="app">

    <navigatorBar @Logout="Logout" />
    <router-view />

  <!-- <br /> -->
  </div>
</template>

<script>
import NavigatorBar from "./components/NavigatorBar";
import LoadingIcon from "./components/loading.vue"


export default {
  name: "App",
    components: {
    NavigatorBar,
    
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
  },
  mounted(){


  },


};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  min-height: 100vh;
  background-image: url("./assets/AdobeStock_68164130.jpeg");
  background-size: cover;
  background-color: #ffffff;
  overflow: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav em {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #3cb981;
}
</style>
