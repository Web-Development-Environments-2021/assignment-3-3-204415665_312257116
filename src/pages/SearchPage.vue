
<template class = "search">
  <div>
      <div v-if="loadingSearchInfo">
        <div  class = "search">
          <b-form @submit.prevent="onSearch" @reset.prevent="onReset" @select="playerSortOn" @input="playerSortOn"> 
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
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-select
                        :button-variant="buttonColor"
                        id="input-group-searchType"
                        v-model="form.searchType"
                        :options="form.searchTypeOptions"
                        :aria-describedby="ariaDescribedby"
                        name="radios-btn-default"
                        buttons   
                    ></b-form-select>  
                  </b-form-group>
              </b-input-group>

            <!-- if searchType is Teams -->
            <div class="row">
              <b-input-group prepend=" Sort Teams:" v-if="form.searchType == 'Teams'" style="width: 209px;" v-slot="{ ariaDescribedby }">
                <b-form-select
                    :button-variant="buttonColor"
                    id="input-group-sortTeamsAlphabetical"
                    v-model="form.sortTeamsAlphabetical"
                    :options="form.sortTeamsAlphabeticalOptions"
                    :aria-describedby="ariaDescribedby"
                    name="radios-btn-default"
                    buttons
                ></b-form-select>
              </b-input-group>
            </div>

            <!-- if searchType is Players -->
            <b-form-group class="my-div" v-if="form.searchType == 'Players'" v-slot="{ ariaDescribedby }">
              
            <div class="row ">
              <div>
                <b-input-group  prepend=" Sort Players By:" style="width: 300px;" v-on:click="playerSortOn()">
                    <b-form-select
                        :button-variant="buttonColor"
                        id="input-group-sortPlayersBy"
                        
                        v-model="form.sortPlayersBy"
                        :options="form.sortPlayersByOptions"
                        :aria-describedby="ariaDescribedby"
                        name="radios-btn-default"
                        buttons
                        
                    ></b-form-select>
                </b-input-group>
              </div>

            <div>
              <b-input-group
              id="input-group-filter_Players"
              label-for="filter_Players"
              prepend=" Filter players by:" 
              style="width: 400px;"
              >
              <b-form-select
                :variant="buttonColor"
                id="input-group-sortPlayersBy"
                v-model="form.filterPlayersByTeam"
                :options="form.filterPlayersTeamsOptions"
                :aria-describedby="ariaDescribedby"
                aria-placeholder="select team"
                name="radios-btn-default"
                buttons
                style="width: 100px;"

            ></b-form-select>

              <b-form-input
                  id="filterPlayersByPosition"
                  v-model="form.filterPlayersByPosition" 
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
              </b-popover>
            </div>
            </b-form-group>

            <!-- buttons - submit and reset-->
            <b-button id="submit-b" type="submit" variant="success">Search</b-button>
            <b-button id="reset-b" type="reset" variant="danger">Reset</b-button> 
          </b-form>
        </div>

          <div >
            <div v-if="form.searchType == 'Players' && flag==true && noResult==false" class="container my-container-css my-row-css row align-items-start">
                <div class="row align-items-start my-row-css">
                    <players-information :v-if="form.searchType == 'Players'" v-for="res in this.results" :key="res.playerID" :player="res"/>
              </div>
            </div>
            <div  v-if="form.searchType == 'Teams' && flag==true && noResult==false" class="container my-container-css row align-items-start my-row-css">
              <div class="row align-items-start my-row-css">
                      <teams-Information :v-if="form.searchType == 'Teams'" v-for="res in this.results" :key="res.teamName" :team="res"/>
              </div>
            </div>
            <div v-else-if="flag==false" class="container my-container-css">
                    <loading-icon/>
            </div>
            <div v-else-if="noResult==true" class="container my-container-css">
                <div class="row align-items-start my-row-css">
                    <h1 class="title">no result</h1>
                </div>
            </div>
          </div>
      </div>
      <div v-else-if="!loadingSearchInfo">
          <loading-icon/>
      </div>
  </div>
</template>

<script>
import {
  required,
  minLength
} from "vuelidate/lib/validators";
import PlayersInformation from "../components/PlayersSearchPreview"
import TeamsInformation from "../components/TeamsSearchPreview"
import LoadingIcon from "../components/loading"

export default {
  
  components:{
    PlayersInformation,
    TeamsInformation,
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
          { text: 'player name', value: 'player name' },
          { text: 'team name', value: 'team name' },
        ],

        filterPlayersByTeam:"",
        filterPlayersTeamsOptions: [
        {text: "-----",value: ""},
        {text: "København",value: "København"},
        {text: "Silkeborg",value: "Silkeborg"},
        {text: "Brøndby",value: "Brøndby"},
        {text: "SønderjyskE",value: "SønderjyskE"},
        {text: "Midtjylland",value: "Midtjylland"},
        {text: "AaB",value: "AaB"},
        {text: "OB",value: "OB"},
        {text: "Randers",value: "Randers"},
        {text: "Nordsjælland",value: "Nordsjælland"},
        {text: "Viborg",value: "Viborg"},
        {text: "AGF",value: "AGF"},
        {text: "Vejle",value: "Vejle"}
        ],
        filterPlayersByPosition:0
        },
        results: [],
        submitError: undefined,
        buttonColor:"success",
        flag: Boolean,
        noResult:false,
        playersInfoList:[],
        teamsInfoList:[],

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

    this.playersInfoList.push(...JSON.parse(localStorage.getItem("playersInfo")));
    this.teamsInfoList.push(...JSON.parse(localStorage.getItem("teamsInfo")));

    if (sessionStorage.getItem("lastSearchQuery") != null) {
      console.log("got inside the load previous search");
      this.form.searchQuery = sessionStorage.getItem("lastSearchQuery");
      this.results = JSON.parse(sessionStorage.getItem("lastSearchResults"));
      this.flag=true;
    }

  },
  methods: {

    loadingSearchInfo(){
          if (!localStorage.getItem("playersInfo") && !localStorage.getItem("teamsInfo")){
            return true;
          }
          return false;
    },
    
    PlayersInfoInit()
    {
      this.playersInfoList.push(...JSON.parse(localStorage.getItem("playersInfo")));
      console.log("sessionStorage is : playersInfo");

    },
    
    TeamsInfoInit()
    {
      this.teamsInfoList.push(...JSON.parse(localStorage.getItem("teamsInfo")));
    },

    playerSortOn(){
      this.form.sortPlayers='yes';
      console.log("playerSortOn")
      this.onSort();
      this.onFilter();
    },

    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    async Search() {
      try {
        this.noResult=false;

        // let params ={};
        // params.Search_Type= this.form.searchType;

        // if(this.form.sortTeamsAlphabetical!=""){
        //   params.Sort_Teams_Alphabetical= this.form.sortTeamsAlphabetical;
        // }
        // if(this.form.sortPlayers!=""){
        //   params.Sort_Players= this.form.sortPlayers;
        // }
        // if(this.form.sortPlayersBy!=""){
        //   params.Sort_Players_By= this.form.sortPlayersBy;

        // }
        // if(this.form.filter_Players!=""){
        //   params.Filter_Players= this.form.filter_Players;
        // }

        // this.axios.defaults.withCredentials = true;
        // const response = await this.axios.get(
        //   this.$root.store.serverUrl + "league/search/" + this.form.searchQuery, {params:params}
        // );
        // this.axios.defaults.withCredentials = false;
        // console.log(response.data);

        // if(response.status!==200 && response.status!==204){
        //   this.$router.push("*");
        // }
        
        // const response = SQL_searchByQuery(this.form.Search_Type,  this.form.Sort_Teams_Alphabetical,  this.form.Sort_Players,  this.form.Sort_Players_By,  this.form.Filter_Players);
        let currentSearchInfo;
        let response=[];
        console.log(this.teamsInfoList);

        if(this.form.searchType=="Players"){
           currentSearchInfo =this.playersInfoList;
        }
        else{
           currentSearchInfo =this.teamsInfoList;
        }
        currentSearchInfo.forEach(element => {
          if(this.form.searchType=="Players"){
            if(element.playerShortInfo.name.toLowerCase().includes(this.form.searchQuery.toLowerCase()))
            {
                response.push(element.playerShortInfo);
            }
          }
          else{
            if(element.teamName.toLowerCase().includes(this.form.searchQuery.toLowerCase()))
            {
                response.push(element);
            }
          }
        });

        if(response.length==0){
              this.noResult=true;
        }
        else {
          this.results=response;
        }
        this.flag=true;

        console.log("save to lastSearchQuery");
        sessionStorage.setItem("lastSearchQuery", this.form.searchQuery);
        console.log("save to lastSearchResults");
        sessionStorage.setItem("lastSearchResults", JSON.stringify(this.results));
        this.onSort();
        this.onFilter();

      } catch (err) {
        console.log(err);
        this.form.submitError = err.response?.data.message;
      }
    },
    async onSearch() {

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
      
      this.form.searchQuery="";
      this.form.searchType= "Players";
      this.form.sortTeamsAlphabetical= "";
      this.form.sortPlayers= "";
      this.form.sortPlayersBy= "";
      this.form.filter_Players= "";
      this.flag=Boolean;
      this.noResult=false;
      this.results=[];
      // location.reload();
      this.$nextTick(() => {
        this.$v.$reset();

      });
    },
    onSort(){
      if(this.form.searchType=="Teams" ){
        if(this.form.sortTeamsAlphabetical=="yes"){
          //Sort the teams in alphabetical order by teamName
          this.results.sort((a, b) => 
          (('' + a["teamName"]).localeCompare(b["teamName"])));
        }
      }
      if(this.form.searchType =="Players"){
        if(this.form.sortPlayers=="yes"){

    
        // ------ Sort_Players_By players name ------ //
    
          if (this.form.sortPlayersBy=="player name"){
             this.results.sort((a, b) => {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
             }); 
            console.log(this.results);
          }
    
        // ------ Sort_Players_By team name ------ //
    
          else if (this.form.sortPlayersBy=="team name"){
             this.results.sort((a, b) => 
            ((''+a["team_name"]).localeCompare(b["team_name"])));
    
          }
        }
      }
    },
    onFilter(){
      // ------ Filter_Players - position ------ //
        if (this.form.filterPlayersByPosition!=0)
        {
          console.log(this.form.filterPlayersByPosition );
          console.log(this.results);
          let res = [];
          this.results.forEach(element =>{
            if(element.position==this.form.filterPlayersByPosition){
                res.push(element)
            }
          });
          this.results=res;
        }
      // ------ Filter_Players - teams name ------ //
        if (this.form.filterPlayersByTeam != ""){
          let res = [];
          this.results.forEach(element =>{
            if(element.team_name==this.form.filterPlayersByTeam){
                res.push(element)
            }
          });
          this.results=res;
        }     
    },
  },
}
</script>

<style scoped>
.title{
  margin: auto;
  color: #fff !important;
  width: 50%;
  text-align: center;
  /* background: rgba(120, 122, 120, 0.3); */

}
.form{
    height: auto;
    
}
.search{
  width: 1450px;
  height:fit-content;;
  text-align: center;
  border-radius: 30px;
  padding-top: 5px;
  margin-top: 5px;
  background: #293241c7;

}

.container {
    margin: auto;
}
.my-container-css {
  overflow-y: scroll;
  overflow-x: hidden;
  max-width: 1450px;
  background-color: #293241c7;
  max-height:56.4vh;
;

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
  width: 730px; 
}
#input-group-filter_Players {
  /* margin-left:px;  */
  width: 300px; 
}
.b.form-radio-group{
    background-color: #ee6c4d!important;
}
.my-div{
    margin: 0 auto;
    padding-inline: 340px;
    position: relative;
}
select{
    /* padding: .6rem .8rem calc(.6rem + 1px) .8rem !important; */
    border: none;
    /* padding: 15px 20px; */
    /* background: rgb(92, 92, 92); */
    color: rgb(0, 0, 0);
    /* border-radius: 20px; */
}



</style>