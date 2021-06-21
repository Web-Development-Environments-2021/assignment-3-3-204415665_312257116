<template>
  <div class="future-match-preview">
    <div :title="matchID" class="future-match-title">
      <b>Match Id:</b> {{ matchID }}
    </div>
    <ul class="future-match-content">
      <li> Match date: {{ matchDate }}</li>
      <li> Local team: {{ localTeamName }}</li>
      <li> Visitor team: {{ visitorTeamName }}</li>
      <li> Venue: {{ venueName }}</li>
      <li> Referee Information:
        <RefereeInformation v-if="hasRefereeInfo"
          :refereeID="refereeInformation.refereeID"
          :firstname="refereeInformation.firstname"
          :lastname="refereeInformation.lastname"
          :course="refereeInformation.course">
        </RefereeInformation>
      </li>
    </ul>
  </div>
</template>

<script>

import RefereeInformation from "../RefereeInformation";

export default {
  name: "futureMatchPreview",
  components: {
    RefereeInformation
  },
  props: {
      matchID: {
        type: Number,
        required: true
      },
      matchDate: {
        type: String,  //TODO: Match change type to dateTime
        required: true
      },
      localTeamName: {
        type: String,
        required: true
      },
      visitorTeamName: {
        type: String,
        required: true
      },
      venueName: {
        type: String,
        required: true
      },
      refereeInformation: {
        type: Object,
        required: true
      }
  }, 
  computed: {
      hasRefereeInfo(){
        return Object.keys(this.refereeInformation).length
      }
  },
  mounted(){
    console.log("future match preview mounted")
  } 
};
</script>

<style>
.future-match-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.future-match-preview .future-match-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.future-match-preview .future-match-content {
  width: 100%;
  overflow: hidden;
}
</style>
