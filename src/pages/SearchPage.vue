
<template class = "search">
    <div>
      <div  class = "search">
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

          <!-- if searchType is Teams -->
          <div class="row">
            <b-input-group prepend=" Sort Teams:" v-if="form.searchType == 'Teams'" style="width: 209px;" v-slot="{ ariaDescribedby }">
              <b-input-group-append>
              <b-form-radio-group
                  :button-variant="buttonColor"
                  id="input-group-sortTeamsAlphabetical"
                  v-model="form.sortTeamsAlphabetical"
                  :options="form.sortTeamsAlphabeticalOptions"
                  :aria-describedby="ariaDescribedby"
                  name="radios-btn-default"
                  buttons
              ></b-form-radio-group>
              </b-input-group-append>
            </b-input-group>
          </div>

          <!-- if searchType is Players -->
          <b-form-group class="my-div" v-if="form.searchType == 'Players'" v-slot="{ ariaDescribedby }">
          <div class="row ">
            <div>
              <b-input-group  prepend=" Sort Players By:" style="width: 346px; " @click="sortOn()">
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

           <div>
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
          </div>
          </b-form-group>

          <!-- buttons - submit and reset-->
          <b-button id="submit-b" type="submit" variant="success">Search</b-button>
          <b-button id="reset-b" type="reset" variant="danger">Reset</b-button> 
        </b-form>
      </div>

        <div >
          <div v-if="form.searchType == 'Players' && flag==true" class="container my-container-css">
              <div class="row align-items-start my-row-css">
                  <PlayersInformation v-for="res in this.results" v-bind:key="res.playerID" :player="res"/>
             </div>
          </div>
          <div  v-else-if="form.searchType == 'Teams'">
                  <div v-for="res in this.results" v-bind:key="res.teamName">
                      <a>search Query:</a>
                  </div>
          </div>
          <div v-else-if="flag==false" class="container my-container-css">
                  <LoadingIcon/>
          </div>
        </div>
    </div>
</template>

<script>
import {
  required,
  minLength
} from "vuelidate/lib/validators";
import PlayersInformation from "../components/PlayersSearchPreview"
import LoadingIcon from "../components/loading"

export default {
  
  components:{
    PlayersInformation,
    LoadingIcon
    
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
        buttonColor:"success",
        flag:Boolean
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
      // this.form.searchQuery = sessionStorage.getItem("lastSearchQuery");
      // this.res = JSON.parse(sessionStorage.getItem("lastSearchResults"));
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
        this.flag=true;
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
      this.flag=false;
      await this.Search();
    },
    async onReset() {
      
      this.form = {
        searchQuery:"",
        searchType: "Players",
        sortTeamsAlphabetical: "",
        sortPlayers: "",
        sortPlayersBy: "",
        filter_Players: "",
      };
      this.flag=Boolean;
      this.results=[],
      location.reload(),
      this.$nextTick(() => {
        this.$v.$reset();
        
      });

      
;
    }
  }
}
</script>

<style scoped>
.title{
  margin: auto;
  color: #fff !important;
  width: 50%;
  padding: 10px;
  text-align: center;
  /* background: rgba(120, 122, 120, 0.3); */

}
.form{
    height: auto;
    
}
.search{
  width: 1000px;
  text-align: center;
  background: rgba(109, 109, 109, 0.507);
  border-radius: 30px;
  padding-top: 10px;
  margin-top: 15px;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(190, 186, 186, 0.671);
  border-radius: 10px;
}
.container {
    margin: auto;
}
.my-container-css {
  overflow: scroll;
  width: 1000px;
  background-color: rgba(109, 109, 109, 0.507); 
  max-height:54vmin;

}


div {
  margin: auto;
}

#submit-b {
  margin: 20px;
  display: inline-block;
  padding: 10px 35px;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 10px;
  position: relative;
  top: 0px;
  left: -50px;

}
#submit-b:hover {background-color: #008604}
#submit-b:active {
  background-color: #008604;
  transform: translateY(1px);
}

#reset-b {
  margin: 20px;
  display: inline-block;
  padding: 10px 35px;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 10px;
  position: relative;
  top: 0px;
  left: 50px;

}
#reset-b:hover {background-color: #c40000}
#reset-b:active {
  background-color: #c40000;
  transform: translateY(1px);
}

#search-input {
  /* margin-left: 20px;  */
  width: 710px; 
}
#input-group-filter_Players {
  /* margin-left:px;  */
  width: 350px; 
}
.b.form-radio-group{
    background-color: #ee6c4d!important;
}
.my-div{
    margin: 0 auto;
    padding-inline: 140px;
    position: relative;
}




</style>