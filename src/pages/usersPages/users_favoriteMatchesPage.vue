<template>
  <div>
    <div>
        <b-form-group label="Search by" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
            id="input-group-searchType"
            v-model="searchType"
            :options="searchTypeOptions"
            :aria-describedby="ariaDescribedby"
            name="radios-btn-default"
            buttons
        ></b-form-radio-group>
        </b-form-group>
    </div>

    <div>
        <b-form-group v-if="searchType == 'Teams'" v-slot="{ ariaDescribedby }">
        Sort teams:
        <br>
        <b-form-radio-group
            id="input-group-sortTeamsAlphabetical"
            v-model="sortTeamsAlphabetical"
            :options="sortTeamsAlphabeticalOptions"
            :aria-describedby="ariaDescribedby"
            name="radios-btn-default"
            buttons
        ></b-form-radio-group>
        </b-form-group>
    </div>

    <div>
        <b-form-group v-if="searchType == 'Players'" v-slot="{ ariaDescribedby }">
        Sort players :
        <br>
        <b-form-radio-group
            id="input-group-sortPlayers"
            v-model="sortPlayers"
            :options="sortPlayersOptions"
            :aria-describedby="ariaDescribedby"
            name="radios-btn-default"
            buttons
        ></b-form-radio-group>
        <br>
        Sort players by:
        <br>
        <b-form-radio-group
            id="input-group-sortPlayersBy"
            v-model="sortPlayersBy"
            :options="sortPlayersByOptions"
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
          v-model="filter_Players"
          
          type="text"
        ></b-form-input>
        </b-form-group>

        </b-form-group>
    </div>

      <div class="mt-3">searchType: <strong>{{ searchType }}</strong></div>
      <div class="mt-3">sortTeamsAlphabetical: <strong>{{ sortTeamsAlphabetical }}</strong></div>
      <div class="mt-3">sortPlayers: <strong>{{ sortPlayers }}</strong></div>
      <div class="mt-3">sortPlayersBy: <strong>{{ sortPlayersBy }}</strong></div>
      <div class="mt-3">filter_Players: <strong>{{ filter_Players }}</strong></div>

   </div> 
   
   
</template>

<script>
  export default {
    data() {
      return {
        searchType: 'Players',
        searchTypeOptions: [
          { text: 'Teams', value: 'Teams' },
          { text: 'Players', value: 'Players' },
        ],
        sortTeamsAlphabetical: 'no',
        sortTeamsAlphabeticalOptions: [
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
        ],
        sortPlayers: 'no',
        sortPlayersOptions: [
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
        ],
        sortPlayersBy: 'own name',
        sortPlayersByOptions: [
          { text: 'own name', value: 'own name' },
          { text: 'team name', value: 'team name' },
        ],
        filter_Players:""
      }
    }
  }
</script>

<style scoped>
div, form,.title, .input-group {
  margin: auto;
  width: 100%;
  padding: 10px;
  text-align: center;
  /* border: 3px solid #73AD21; */
}
div {
margin: auto;
}

button {
  margin: 20px;
  width:100px; 
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