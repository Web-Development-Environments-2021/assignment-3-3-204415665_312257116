
<template class = "search">
    <div>
      <div style="padding-top: 10px;">
        <b-form @submit.prevent="onSearch" @reset.prevent="onReset" > 
            <h1 class="title">Search Page</h1>
            <b-input-group 
              id="search-input"
              label-cols-sm="3"
              label="searchQuery:"
              label-for="searchQuery"
              class="mt-3"
              >
              <b-form-input
              type="text"
              v-model="form.searchQuery"
              >  
              </b-form-input>
              <b-input-group-append>
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                      :button-variant="buttonColor"
                      id="input-group-searchType"
                      v-model="form.searchType"
                      :options="form.searchTypeOptions"
                      :aria-describedby="ariaDescribedby"
                      name="radios-btn-default"
                      buttons
                  ></b-form-radio-group>
                  
                </b-form-group>

              </b-input-group-append>
            </b-input-group>

          <b-form-group v-if="form.searchType == 'Teams'" v-slot="{ ariaDescribedby }">
            <b-form-radio-group
                :button-variant="buttonColor"
                id="input-group-sortTeamsAlphabetical"
                v-model="form.sortTeamsAlphabetical"
                :options="form.sortTeamsAlphabeticalOptions"
                :aria-describedby="ariaDescribedby"
                name="radios-btn-default"
                buttons
            ></b-form-radio-group>
          </b-form-group>

          <!-- if searchType is Players -->
          <div class="my-buttons">
              <b-form-group v-if="form.searchType == 'Players'" v-slot="{ ariaDescribedby }">


            <div style="padding: 10px;">
              <b-input-group  prepend=" Sort Players By:" style="width: 346px;" @click="sortOn()">
              <b-input-group-append>
                  <b-form-radio-group
                      :button-variant="buttonColor"
                      id="input-group-sortPlayersBy"
                      v-model="form.sortPlayersBy"
                      :options="form.sortPlayersByOptions"
                      :aria-describedby="ariaDescribedby"
                      name="radios-btn-default"
                      buttons
                  ></b-form-radio-group>
                </b-input-group-append >
              </b-input-group>
            </div>
            <p>hi {{form.sortPlayers}}</p>
<!-- 
            <div style="padding: 10px;">
              <b-input-group prepend=" Sort Players:" style="width: 216px;">
                <b-input-group-append>
                  <b-form-radio-group
                      :button-variant="buttonColor"
                      id="input-group-sortPlayers"
                      v-model="form.sortPlayers"
                      :options="form.sortPlayersOptions"
                      :aria-describedby="ariaDescribedby"
                      name="radios-btn-default"
                      buttons>
                  </b-form-radio-group>
                </b-input-group-append>
              </b-input-group>
            </div> -->

           <div style="padding: 10px;">
            <b-input-group
            id="input-group-filter_Players"
            label-for="filter_Players"
            prepend=" Filter players by:" 
            >
            <b-form-input
                id="filter_Players"
                v-model="form.filter_Players" 
                type="text"
            ></b-form-input>
              <b-input-group-append>
                <b-button  id="popover-target-i">
                  <b-icon id="popover-target-i" icon="question-circle-fill" aria-label="Help"></b-icon>
                </b-button>     
              </b-input-group-append>
            </b-input-group>
           </div>
            <b-popover target="popover-target-i" triggers="hover" placement="top">
              <template #title>information</template>
              Enter a number to filter by player position
              or enter a player team name
            </b-popover>
          </b-form-group>
          </div>
          <!-- buttons - submit and reset-->
          <b-button id="submit-b" type="submit" variant="success">Search</b-button>
          <b-button id="reset-b" type="reset" variant="danger">Reset</b-button> 
          </b-form>

        </div>

        <div>
          <div v-if="form.searchType == 'Players'" class="container">
              <div class="row">
                <PlayersInformation v-for="res in this.results" v-bind:key="res.playerID" :player="res"/>
              </div>
          </div>

          <div v-else-if="form.searchType == 'Teams'">
                  <div v-for="res in this.results" v-bind:key="res.teamName">
                      <a>search Query:</a>
                  </div>
          </div>
        </div>
  </div>
</template>

<script>
import {
  required,
  minLength
} from "vuelidate/lib/validators";
import PlayersInformation from "../components/PlayersSearchPreview.vue"

export default {
  
  components:{
    PlayersInformation
    
  },
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
        },
        results: [],
        submitError: undefined,
        buttonColor:"info"

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
  mounted() {
    console.log("sessionStorage is : ", sessionStorage.getItem("lastSearchQuery"));
    console.log("sessionStorage is : ", sessionStorage.getItem("lastSearchResults"));
    if (sessionStorage.getItem("lastSearchQuery") != null) {
      console.log("got inside the load previous search");
      this.form.searchQuery = sessionStorage.getItem("lastSearchQuery");
      this.res = JSON.parse(sessionStorage.getItem("lastSearchResults"));
    }
  },
  methods: {
    sortOn(){
      this.form.sortPlayers='yes';
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      try {
        let params ={};
        params.Search_Type= this.form.searchType;

        if(this.form.sortTeamsAlphabetical!=""){
          params.Sort_Teams_Alphabetical= this.form.sortTeamsAlphabetical;
        }
        if(this.form.sortPlayers!=""){
          params.Sort_Players= this.form.sortPlayers;
        }
        if(this.form.sortPlayersBy!=""){
          params.Sort_Players_By= this.form.sortPlayersBy;

        }
        if(this.form.filter_Players!=""){
          params.Filter_Players= this.form.filter_Players;
        }

        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          this.$root.store.serverUrl + "league/search/" + this.form.searchQuery, {params:params}
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        console.log(response.data);


        if(response.status==404){
          this.$router.push("*");
        } 
        else {
          this.results.push(...response.data.players);
        }
        console.log("save to lastSearchQuery");
        sessionStorage.setItem("lastSearchQuery", this.form.searchQuery);
        console.log("save to lastSearchResults");
        sessionStorage.setItem("lastSearchResults", JSON.stringify(this.results));

      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response?.data.message;
      }
    },
    async onSearch() {
      // console.log("login method called");
      this.results=[],
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
      this.results=[],
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
}
</script>

<style scoped>
.title{
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
  /* background: rgba(120, 122, 120, 0.3); */

}
form{
  margin: auto;
  width: 50%;
  text-align: center;
  background: rgba(255, 255, 255, 0.39);
  border-radius: 30px;

  /* margin-top: 20px;  */
}
.container {
  padding: 100px;
  margin: auto;
}

div {
margin: auto;
}


.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.myB span:before{
  color: #fff !important;
  background-color: #EE6C4D !important;
  border-color: #eb451c !important;
}

#submit-b {
  margin: 20px;
  display: inline-block;
  padding: 10px 25px;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 10px;
}
#submit-b:hover {background-color: #008604}
#submit-b:active {
  background-color: #008604;
  box-shadow: 0 5px rgb(0, 99, 16);
  transform: translateY(4px);
}

#reset-b {
  margin: 20px;
  display: inline-block;
  padding: 10px 25px;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 10px;
}
#reset-b:hover {background-color: #c40000}
#reset-b:active {
  background-color: #c40000;
  box-shadow: 0 5px rgb(190, 25, 25);
  transform: translateY(4px);
}

#search-input {
  /* margin-left: 20px;  */
  width: 700px; 
}
#input-group-filter_Players {
  /* margin-left:px;  */
  width: 400px; 
  padding: 20px;
}
.b.form-radio-group{
    background-color: #ee6c4d!important;
}

</style>