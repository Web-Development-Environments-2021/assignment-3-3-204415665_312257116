<template>
  <div>
    <h1 class="title">Search Page</h1>
    <b-input-group 
      prepend="Search Query:" 
      id="search-input"
      label-cols-sm="3"
      label="searchQuery:"
      label-for="searchQuery"
      >
      <b-form-input
      type="text"
      v-model="form.searchQuery"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="success">Search</b-button>
      </b-input-group-append>
    </b-input-group>
      <br/>
      Your search Query: {{ form.searchQuery }}
  </div>
</template>

<script>
export default {
  name: "SearchPage",
  data() {
      return {
        form: {
        searchQuery:"",
        searchType: "",
        sortTeamsAlphabetical: "",
        sortPlayers: "",
        sortPlayersBy: "",
        filter_Players: "",
        submitError: undefined
        }
      };
    // },
  //   validations: {
  //   form: {
  //     searchQuery: {
  //       required 
  //     },
  //     searchType: {
  //       required
  //     }
  //   }
  // },
  // methods: {
  //   validateState(param) {
  //     const { $dirty, $error } = this.$v.form[param];
  //     return $dirty ? !$error : null;
  //   },
  //   async onLogin() {
  //     // console.log("login method called");
  //     this.form.submitError = undefined;
  //     this.$v.form.$touch();
  //     if (this.$v.form.$anyError) {
  //       return;
  //     }
  //     // console.log("login method go");

  //     await this.Login();
  //   }

  }
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>