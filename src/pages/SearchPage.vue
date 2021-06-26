
<template>
  <div>
    <div>
      <h1 class="title">Search Page</h1>
      <b-form @submit.prevent="onSearch" @reset.prevent="onReset">   
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
          </b-input-group>
          <b-button type="submit"
          variant="success"
          class="ml-5 w-7"
          >Search</b-button>
          <b-button type="reset" variant="danger">Reset</b-button> 
    <div>
        <b-form-group label="Search by" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
            id="input-group-searchType"
            v-model="form.searchType"
            :options="form.searchTypeOptions"
            :aria-describedby="ariaDescribedby"
            name="radios-btn-default"
            buttons
        ></b-form-radio-group>
        </b-form-group>
    </div>

    <div>
        <b-form-group v-if="form.searchType == 'Teams'" v-slot="{ ariaDescribedby }">
        Sort teams:
        <br>
        <b-form-radio-group
            id="input-group-sortTeamsAlphabetical"
            v-model="form.sortTeamsAlphabetical"
            :options="form.sortTeamsAlphabeticalOptions"
            :aria-describedby="ariaDescribedby"
            name="radios-btn-default"
            buttons
        ></b-form-radio-group>
        </b-form-group>
    </div>

    <div>
        <b-form-group v-if="form.searchType == 'Players'" v-slot="{ ariaDescribedby }">
        Sort players :
        <br>
        <b-form-radio-group
            id="input-group-sortPlayers"
            v-model="form.sortPlayers"
            :options="form.sortPlayersOptions"
            :aria-describedby="ariaDescribedby"
            name="radios-btn-default"
            buttons
        ></b-form-radio-group>
        <br>
        Sort players by:
        <br>
        <b-form-radio-group
            id="input-group-sortPlayersBy"
            v-model="form.sortPlayersBy"
            :options="form.sortPlayersByOptions"
            :aria-describedby="ariaDescribedby"
            name="radios-btn-default"
            buttons
        ></b-form-radio-group>
        <br>
        Filter players by:
        <b-form-group
        id="input-group-filter_Players"
        label-cols-sm="3"
        label-for="filter_Players"

      >
        <b-form-input
          id="filter_Players"
          v-model="form.filter_Players"
          
          type="text"
        ></b-form-input>
        </b-form-group>

        </b-form-group>
    </div>
      <div class="mt-3">search Query: <strong>{{ form.searchQuery }}</strong></div>
      <div class="mt-3">searchType: <strong>{{ form.searchType }}</strong></div>
      <div class="mt-3">sortTeamsAlphabetical: <strong>{{ form.sortTeamsAlphabetical }}</strong></div>
      <div class="mt-3">sortPlayers: <strong>{{ form.sortPlayers }}</strong></div>
      <div class="mt-3">sortPlayersBy: <strong>{{ form.sortPlayersBy }}</strong></div>
      <div class="mt-3">filter_Players: <strong>{{ form.filter_Players }}</strong></div>
      


          <br><br>
      </b-form>
    </div>
      

  </div>
</template>

<script>
import {
  required,
  minLength
} from "vuelidate/lib/validators";

export default {
  name: "SearchPage",
  data() {
      return {
        form: {
        searchQuery:"",
        searchType: 'Players',
        searchTypeOptions: [
          { text: 'Teams', value: 'Teams' },
          { text: 'Players', value: 'Players' },
        ],
        sortTeamsAlphabetical: '',
        sortTeamsAlphabeticalOptions: [
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
        ],
        sortPlayers: '',
        sortPlayersOptions: [
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
        ],
        sortPlayersBy: '',
        sortPlayersByOptions: [
          { text: 'own name', value: 'own name' },
          { text: 'team name', value: 'team name' },
        ],
        filter_Players:"",
        res: [],
        submitError: undefined
        }
      };
    },
    validations: {
    form: {
      searchQuery: {
        required,
        length: (q) => minLength(1)(q), 
      },
      searchType: {
        required
      },
      sortTeamsAlphabetical: {
        
      },
      sortPlayers: {
        
      },
      sortPlayersBy: {
        
      },
      filter_Players: {
        
      }
    
    }
  },
  // mounted() {
  //   console.log("sessionStorage is : ", sessionStorage.getItem("lastQuery"));
  //   console.log("sessionStorage is : ", sessionStorage.getItem("lastResults"));
  //   if (sessionStorage.getItem("lastQuery") != null) {
  //     console.log("got inside the load previous search");
  //     this.form.searchQuery = sessionStorage.getItem("lastQuery");
  //     this.res = JSON.parse(sessionStorage.getItem("lastResults"));
  //   }
  // },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      try {
        let response;
        // let queryParams ={};
        let query = "";
        query = this.form.searchQuery+ `?Search_Type=${this.form.searchType}`;
        
        if(this.form.sortTeamsAlphabetical!=""){
          query+=`&Sort_Teams_Alphabetical=${this.form.sortTeamsAlphabetical}`;
        }
        if(this.form.sortPlayers!=""){
          query+=`&Sort_Players=${this.form.sortPlayers}`;
        }
        if(this.form.sortPlayersBy!=""){
          query+=`&Sort_Players_By=${this.form.sortPlayersBy}`;
        }
        if(this.form.filter_Players!=""){
          query+=`&Filter_Players=${this.form.filter_Players}`;
        }
        this.axios.defaults.withCredentials = true;
        response = await this.axios.get(
          this.$root.store.serverUrl + "league/search/" +query,
          {
           
            searchQuery:this.form.searchQuery,
            searchType: this.form.searchType,
            sortTeamsAlphabetical: this.form.sortTeamsAlphabetical,
            sortPlayers: this.form.sortPlayers,
            sortPlayersBy: this.form.sortPlayersBy,
            filter_Players: this.form.filter_Players,
          }
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        if(response.status!=200) this.$router.push("*");
        else this.res.push(...response.data);
        // console.log("save to lastQuery this value: ", this.form.query);
        // sessionStorage.setItem("lastQuery", this.form.query);
        // console.log("save to lastResults this value: ", this.results);
        // sessionStorage.setItem("lastResults", JSON.stringify(this.results));

        // console.log(response.data);
        // this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    async onSearch() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      await this.Search();
    },
    onReset() {
      this.form = {
        searchQuery:"",
        searchType: "Players",
        sortTeamsAlphabetical: "",
        sortPlayers: "",
        sortPlayersBy: "",
        filter_Players: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
}
</script>

<style scoped>
form,.title, .input-group {
  margin: auto;
  width: 60%;
  padding: 10px;
  text-align: center;
  /* border: 3px solid #73AD21; */
}
div {
margin: auto;
}

button {
  margin: 20px;
  width:200px; 
}

#search-input {
  /* margin-left: 20px;  */
  width: 700px; 
}
#input-group-filter_Players {
  /* margin-left: 20px;  */
  width: 300px; 
}
</style>